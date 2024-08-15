import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { TabCardView } from 'app/components/TabCardView';
import ProfileSubscriptionCard from 'app/components/ProfileSubscriptionCard';
// import { CardElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CardSetupForm from './components/CardSetupForm';
// import UserPaymentDetailsPopup from './components/UserPaymentDetailsPopup';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChoosedPlan,
  selectCurrentUserSubscription,
  selectPaymentIntendData,
  selectPaymentIntendPayload,
  selectPaymentLoader,
  selectSubscriptionPlans,
  selectTriggerApi,
} from '../../slice/selectors';
import Payment from '../StripeComponents/Payment/index';
import { PaymentApiService } from 'services/openapi/services/PaymentApiService';
import useApi from 'services/mavapi/useApi';
import { useManageUserSlice } from '../../slice';
import Airpay from '../../assets/img/icon/airpay.svg';
import Hdfc from '../../assets/img/icon/hdfc.png';
// import HdfcSmallLogo from '../../assets/img/icon/hdfc-logo-image.png';
import StripeLogo from '../../assets/img/icon/stripeLogo.svg';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { MTextField } from 'app/components/MTextField';
import SimpleReactValidator from 'simple-react-validator';
// import QRcode from 'react-qr-code';
import { Button } from '@mui/material';
import { checkCustomerVpaResponseData } from 'services/openapi/models/checkCustomerVpaResponse';
import { useManageAppSlice } from 'app/pages/slice';
import PaymentStatusDialog from 'app/components/PaymentStatusDialog';
import FadeLoader from 'react-spinners/FadeLoader';
import { HdfcPaymentStatusResponse } from 'utils/enums';
import PulseLoader from 'react-spinners/PulseLoader';

//Make sure to call `loadStripe` outside of a component's render to avoid
//recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
// );

type Props = {};

const SubscripionsTab = (props: Props) => {
  const {
    getPaymentIntend,
    generateAirpayChecksum,
    verifyCustomerVpa,
    initiateUpiWebCollect,
    checkUpiTransactionStatus,
  } = PaymentApiService;

  const { error: apiError, isLoading, handleRequest } = useApi();
  //Redux
  const { actions } = useManageUserSlice();
  const { actions: AppActions } = useManageAppSlice();
  const dispatch = useDispatch();

  //Selectors
  const PaymentIntendPayload = useSelector(selectPaymentIntendPayload);
  const PaymentIntendData = useSelector(selectPaymentIntendData);
  const SubScriptionPlans = useSelector(selectSubscriptionPlans);
  const currentSubscription = useSelector(selectCurrentUserSubscription);
  const selectedPlan = useSelector(selectChoosedPlan);
  const selectPaymentLoading = useSelector(selectPaymentLoader);
  const selectedTriggerApi = useSelector(selectTriggerApi);
  //useStates
  const [showPaymentScreen, setShowPaymentScreen] = React.useState(false);

  const [showStripes, setShowStripes] = React.useState(false);
  const [showHdfc, setShowHdfc] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('upi-id');
  const [upiIdString, setUpiIdString] = React.useState('');
  const [upiIdIsAvailable, setUpiIdIsAvailable] =
    React.useState<boolean>(false);
  const [checkVpaResponse, setCheckVpaResponse] =
    React.useState<checkCustomerVpaResponseData | null>(null);
  const [timeRemaining, setTimeRemaining] = React.useState<number>(600); // 600 seconds = 10 minutes
  const [transactionStatusResponse, setTransactionStatusResponse] =
    React.useState<any>({});
  const [loadingUpiStatus, setLoadingUpiStatus] =
    React.useState<boolean>(false);
  const [openStatusDialog, setOpenStatusDialog] =
    React.useState<boolean>(false);
  const upiStringValidator = React.useRef(
    new SimpleReactValidator({
      validators: {
        upiId: {
          message: 'The value must be a valid UpiId.',
          rule: val => {
            return /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(val);
          },
          // required: "required",
        },
      },
      messages: { upiId: 'Invalid  UPI ID' },
    }),
  );

  const handleUpiIdChange = e => {
    setUpiIdString(e.target.value);
    upiStringValidator?.current?.showMessageFor('upiId');
    setUpiIdIsAvailable(false);
    setCheckVpaResponse(null);
  };

  console.log('upiStringValidator', upiStringValidator);
  console.log('upiStringValidator.current', upiStringValidator.current);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  const handleShowPaymentView = (e, id, item) => {
    if (currentSubscription?.active && ExpiryDate) {
      return;
    } else {
      dispatch(
        actions.setPaymentIntendPayload({
          ...PaymentIntendPayload!,
          subscription_plan_id: id,
        }),
      );
      dispatch(actions.setChoosedPlan(item));
      setShowPaymentScreen(true);
      // handleGetPaymentIntend({
      //   ...PaymentIntendPayload!,
      //   subscription_plan_id: id,
      // });
    }
  };

  //Get User Subscription0
  const handleGetPaymentIntend = payload => {
    handleRequest(getPaymentIntend(payload))
      .then(res => {
        if (res?.data) {
          dispatch(actions.setPaymentIntendData(res?.data));
          setShowPaymentScreen(true); //Toggle view from  subscription plan list to payment view
          console.log(res, 'handleGetPaymentIntend res');
        }
      })
      .catch(err => console.log(err, 'getPaymentIntend err'));
  };
  //expiry date
  const ExpiryDate: boolean =
    currentSubscription?.valid_till! > new Date().toISOString();
  const handleStripeClick = () => {
    setShowStripes(true);
    // handleGetPaymentIntend(PaymentIntendPayload);
  };
  const handleAirpayClick = () => {
    handleRequest(generateAirpayChecksum(selectedPlan?.id!))
      .then(res => {
        if (res?.data) {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = 'https://payments.airpay.co.in/pay/index.php';

          for (const key in res?.data) {
            if (Object.hasOwnProperty.call(res?.data, key)) {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.name = key;
              input.value = res?.data[key];
              form.appendChild(input);
            }
          }
          document.body.appendChild(form);
          form.submit();
          console.log(res, 'generateAirpayChecksum res');
        }
      })
      .catch(err => console.log(err, 'generateAirpayChecksum err'));
  };
  console.log(selectedPlan, 'SubScriptionPlans');

  function handleHdfcPaypayClick() {
    setShowHdfc(true);
  }

  const handleVerifyCustomerVpaClick = () => {
    setLoadingUpiStatus(true);
    verifyCustomerVpa({ customerVpa: upiIdString })
      .then(res => {
        if (res?.data) {
          console.log(res, 'verifyCustomerVpa');
          setLoadingUpiStatus(false);
          setCheckVpaResponse(res?.data ?? null);
          setUpiIdIsAvailable(res?.data?.status! === 'Available');
        }
      })
      .catch(err => console.log(err, 'verifyCustomerVpa error'));
  };

  const handleinitiateUpiWebCollectClick = () => {
    dispatch(actions.setPaymentLoader(true));
    initiateUpiWebCollect({
      orderId: checkVpaResponse?.orderId! ?? null,
      planId: selectedPlan?.id! ?? null,
      customerVpa: upiIdString ?? null,
    })
      .then(data => {
        console.log(data, 'initiateUpiWebCollect');
        // dispatch(AppActions.setPageLoader(false));
        const timer = setInterval(() => {
          setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        const intervalId = setInterval(() => {
          checkUpiTransactionStatus(checkVpaResponse?.orderId ?? '')
            .then(response => {
              console.log(response, 'Transaction Status');
              if (response?.data) {
                setTransactionStatusResponse(response?.data!);

                if (response?.data! && response?.data?.status === 'SUCCESS') {
                  clearInterval(intervalId);
                  clearInterval(timer);
                  setOpenStatusDialog(true);
                  dispatch(actions.setPaymentLoader(false));
                  console.log('Payment is SUCCESS!');
                } else if (
                  response?.data! &&
                  response?.data?.status === 'REJECTED'
                ) {
                  clearInterval(intervalId);
                  clearInterval(timer);
                  setOpenStatusDialog(true);
                  dispatch(actions.setPaymentLoader(false));
                  console.log('Payment is rejected!');
                } else if (
                  response?.data! &&
                  response?.data?.status === 'EXPIRED'
                  // &&
                  // timeRemaining === 0
                ) {
                  clearInterval(intervalId);
                  clearInterval(timer);
                  setOpenStatusDialog(true);
                  setTransactionStatusResponse(response?.data!);
                  dispatch(actions.setPaymentLoader(false));
                }
              }
            })
            .catch(error => console.error(error, 'Transaction Status Error'));
        }, 3000);
      })
      .catch(err => console.log(err, 'initiateUpiWebCollect error'));
  };

  //Set time format for checking  payment status
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const handleCloseStatusPopup = () => {
    setOpenStatusDialog(false);
    setTransactionStatusResponse(null);
    setShowHdfc(false);
    setShowPaymentScreen(false);
    setCheckVpaResponse(null);
    dispatch(actions.setTriggerApi(!selectedTriggerApi));
  };
  React.useEffect(() => {
    if (
      transactionStatusResponse?.status === HdfcPaymentStatusResponse.expired &&
      selectPaymentLoading &&
      timeRemaining === 0
    ) {
      dispatch(actions.setPaymentLoader(false));
      setOpenStatusDialog(true);
      setShowHdfc(false);
      setShowPaymentScreen(false);
    }
  }, [timeRemaining]);
  return (
    <Wrapper>
      {!showStripes && !showHdfc ? (
        !showPaymentScreen ? (
          <TabCardView className="tabcard-view">
            {SubScriptionPlans?.map((item, ind) => {
              return (
                <ProfileSubscriptionCard
                  isActive={
                    currentSubscription?.subscription_plan_id === item?.id &&
                    currentSubscription?.active
                      ? true
                      : false
                  }
                  planName={item?.name!}
                  // planDetails={item?.perks!}
                  planDetails="Watch All the Series. Click to Subscribe"
                  price={item?.cost}
                  validFrom={
                    currentSubscription?.active
                      ? currentSubscription?.valid_from
                      : ''
                  }
                  validTill={
                    currentSubscription?.active
                      ? currentSubscription?.valid_till
                      : ''
                  }
                  expireDate={'10/23'}
                  // onClick={e => handleShowPaymentView(e, item?.id, item)}
                />
              );
            })}
          </TabCardView>
        ) : (
          <StyledTabCardView className="StyledTabCardView">
            <div className="button-wrapper">
              <ButtonWrapper onClick={handleStripeClick}>
                Debit Card/Credit Card
                {/* <Image className="stripe-logo" src={StripeLogo} /> */}
              </ButtonWrapper>
              {/* <label className="or-label">or</label> */}
              {/* <ButtonWrapper onClick={handleHdfcPaypayClick}>
                UPI payment
                <Image className="hdfc-logo" src={Hdfc} />
              </ButtonWrapper> */}
              <label className="or-label">or</label>
              <ButtonWrapper onClick={handleAirpayClick}>
                Cards, UPI & More
                {/* <Image className="airpay-logo" src={Airpay} /> */}
              </ButtonWrapper>
            </div>
          </StyledTabCardView>
        )
      ) : showStripes ? (
        //view for stripe
        <StyledTabCardView className="StyledTabCardView">
          <Payment
            paymentIntendData={PaymentIntendData!}
            showStripes={showStripes}
            setShowStripes={setShowStripes}
          />
        </StyledTabCardView>
      ) : (
        showHdfc &&
        !showStripes && (
          <StyledTabCardView className="StyledTabCardView d-block">
            <ContentWrapper className="content-wrapper">
              <ImageWrapper>
                <Image className="hdfc-logo2" src={Hdfc} />
                {/* <h5> Payment Gateway</h5> */}
              </ImageWrapper>
              <RadioGroupWrapper className="radio-group-wrapper">
                <FormControl>
                  {/* <FormLabel
                    className="custom-payment-group-label"
                    id="payment-group-label"
                  >
                    Payment mode
                    <span className="secondarylabel">(upi id or Qr Code)</span>
                  </FormLabel> */}
                  <RadioGroup
                    row
                    aria-labelledby="payment-group-label"
                    name="payment-radio-buttons-group"
                    value={radioValue}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="upi-id"
                      control={<Radio />}
                      label="UPI ID"
                    />
                    {/* <FormControlLabel
                      value="qr-code"
                      control={<Radio />}
                      label="Qr Code"
                    /> */}
                  </RadioGroup>
                </FormControl>
              </RadioGroupWrapper>
              {/* {radioValue === 'upi-id' ? ( */}
              <PaymentOptionWrapper className="payment-option-wrapper">
                <FiedldMainWrapper>
                  <FiedldWrapper className="upi-fiedld-wrapper">
                    <MTextField
                      placeholder="Enter your Upi id"
                      onChange={handleUpiIdChange}
                    />
                    <VerifyButton
                      vpaVerifyStatus={checkVpaResponse?.status}
                      handleClick={handleVerifyCustomerVpaClick}
                    />
                  </FiedldWrapper>
                  {!loadingUpiStatus && (
                    <UpiIdResult
                      verifyStatus={checkVpaResponse?.status}
                      isAvailable={upiIdIsAvailable}
                      upiId={upiIdString}
                      validator={upiStringValidator}
                    />
                  )}
                  {loadingUpiStatus ? (
                    <UpiLoaderWrapper className="upi-loader-wrapper">
                      <span className="loading-text"> Verifying</span>
                      <PulseLoader
                        color="#f4793b"
                        size={8}
                        speedMultiplier={0.5}
                      />
                    </UpiLoaderWrapper>
                  ) : (
                    ''
                  )}
                </FiedldMainWrapper>
                <SumbitButtonWrapper>
                  <Button
                    disabled={checkVpaResponse?.status !== 'Available'}
                    onClick={handleinitiateUpiWebCollectClick}
                    variant="contained"
                  >
                    Proceed to payment
                  </Button>
                  {/* {transactionStatusResponse?.status} */}
                </SumbitButtonWrapper>
              </PaymentOptionWrapper>
              {/* ) : ( */}
              {/* <PaymentOptionWrapper className="payment-option-wrapper"> */}
              {/* Qr */}
              {/*
                  <div
                    style={{
                      height: 'auto',
                      margin: '0 auto',
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <QRcode
                      size={256}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                      }}
                      value={data}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </PaymentOptionWrapper>
                 */}
              {/* )} */}
            </ContentWrapper>
          </StyledTabCardView>
        )
      )}
      <PaymentStatusDialog
        open={openStatusDialog}
        setOpen={handleCloseStatusPopup}
        type={
          transactionStatusResponse?.status ===
          HdfcPaymentStatusResponse.rejected
            ? transactionStatusResponse?.status
            : transactionStatusResponse?.status ===
              HdfcPaymentStatusResponse.success
            ? transactionStatusResponse?.status
            : transactionStatusResponse?.status ===
              HdfcPaymentStatusResponse.expired
            ? transactionStatusResponse?.status
            : undefined
        }
      />
      {selectPaymentLoading ? (
        <StatusLoaderWrapper className="status-loader-wrapper">
          <StatusLoaderContentWrapper className="status-loader-content-wrapper">
            <p>
              Do not leave this page this may take upto 10 mins
              <br />
              <br />
              <p>Please check your Upi app for making payment</p>
              <br />
              Time remaining:{formatTime(timeRemaining)}
            </p>
            <br />

            <br />
            <FadeLoader color="#f4793b" />
            <h6>Checking Transaction status...</h6>
          </StatusLoaderContentWrapper>
        </StatusLoaderWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

type VerifyButtonProps = {
  vpaVerifyStatus?: string | null;
  handleClick: () => void;
};

const VerifyButton = (props: VerifyButtonProps) => {
  let button = <></>;
  if (props.vpaVerifyStatus !== 'Available')
    button = (
      <Button
        onClick={props.handleClick}
        variant="contained"
        className="verify-btn-submit"
      >
        Verify
      </Button>
    );

  return button;
};

type UpiIdResultProps = {
  isAvailable: boolean;
  validator: MutableRefObject<SimpleReactValidator>;
  upiId: string;
  verifyStatus?: string | null;
};

const UpiIdResult = (props: UpiIdResultProps) => {
  // debugger
  const error = (msg: string, isError: boolean) =>
    msg ? (
      <ErrorWrapper className={isError ? '' : 'success'}>{msg}</ErrorWrapper>
    ) : (
      <></>
    );
  let message = '';
  let isError = true;
  if (!props.isAvailable)
    message = props.validator.current.message(
      'upiId',
      props.upiId,
      'required|upiId',
    );
  if (props.isAvailable && props?.verifyStatus === 'Available') {
    isError = false;
    message = 'UPI ID Verified';
  }
  if (!props.isAvailable && props?.verifyStatus === 'Not Available')
    message = 'Upi ID is not Available';

  return error(message, isError);
};

const Wrapper = styled.div`
  div.tabcard-view {
    background-color: transparent;
    min-height: unset !important;
  }
  .button-wrapper {
    justify-content: center;
  }
  .or-label {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .airpay-logo {
    height: 23px;
  }
  .hdfc-logo {
    width: 100px;
    height: 23px;
    object-fit: contain;
    margin-left: 15px;
  }
  .hdfc-logo2 {
    width: 140px;
    height: 23px;
    object-fit: contain;
    padding: 0;
  }
  .stripe-logo {
    height: 23px;
  }
`;
const UpiLoaderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  .loading-text {
    margin: 0px 12px 0px 0px;
  }
`;
const StatusLoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  // background: rgb(0 0 0 / 82%);
  background: rgb(23 28 37 / 91%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatusLoaderContentWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h6 {
    font-size: 18px;
    letter-spacing: 0.2px;
    font-family: sans-serif;
    font-weight: 100;
    position: relative;
    display: inline-block;
    color: #f4793b3d;

    margin: 15px 0px 10px;

    &:before {
      content: 'Checking Transaction status...';
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
      width: 0;
      color: #f4793b;
      animation: fill-1 2s infinite;
    }
  }
  p {
    font-size: 22px;
    font-family: sans-serif;
    margin: 0 0 4px 0;
  }

  @keyframes fill-1 {
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;
const StyledTabCardView = styled(TabCardView)`
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  .StripeElement {
    width: 100%;
  }
  &.d-block {
    display: block;
  }
`;
const ErrorWrapper = styled.div`
  width: 70%;
  color: red;
  &.success {
    color: #3ec47b !important;
  }
`;
const PaymentOptionWrapper = styled.div`
  padding: 30px 0 0 0;
  .textfield-wrapper {
    width: 75%;
    padding: 0 !important;
  }
`;
const FiedldMainWrapper = styled.div``;
const FiedldWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin: 0 0 10px 0;
  .verify-btn-submit {
    background: #3ec47b !important;
    margin: 0 0 0 10px;
  }
`;
const ButtonWrapper = styled.div`
  text-align: left;
  background: #201e1e;
  margin: 5px 0;
  border-radius: 10px;
  padding: 10px 20px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 265px;
  margin: auto;
  transition: background-color 0.3s ease;
  &:hover {
    background: #333;
  }
`;
const SumbitButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0 0 0;
  .MuiButtonBase-root {
    background: #3ec47b !important;
    color: #ffffff !important;
    &.Mui-disabled {
      opacity: 0.5 !important;
    }
  }
`;
const Image = styled.img`
  object-fit: cover;
  padding-left: 10px;
`;
const ImageWrapper = styled.div`
  padding: 10px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  h5 {
    margin: 0 0 0 40px !important;
    font-size: 16px;
    letter-spacing: 0.5px;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 30px;
`;
const RadioGroupWrapper = styled.div`
  padding: 30px 0 0 0;
  .custom-payment-group-label {
    color: #ffffff !important;
    margin: 0 0 15px 0 !important;
    letter-spacing: 0.5px;
    .secondarylabel {
      color: #616161 !important;
    }
  }
  .MuiButtonBase-root.MuiRadio-root {
    color: rgb(119 131 142) !important;
    > span {
      svg {
        color: rgb(119 131 142) !important;
      }
      svg:nth-child(2) {
        path {
          fill: rgb(119 131 142) !important;
        }
      }
    }
    // &.Mui-checked{
    //   color: #1976d2 !important;
    //   // > span{
    //   //     svg{
    //   //       color: #1976d2 !important;
    //   //     }
    //   //   }
    // }
  }
`;
export default SubscripionsTab;
