import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TabCardView } from 'app/components/TabCardView';
import { TabLabel } from 'app/components/TabLabel';
import { Grid, Box } from '@mui/material';
import { MTextField } from 'app/components/MTextField';
import EditButton from 'app/components/EditButton';
import { NumberField } from 'app/components/NumberField';
import UploadPic from 'app/components/UploadPic';
import DatePicker from 'app/components/DatePicker';
import { MSelect } from 'app/components';
import useApi from 'services/mavapi/useApi';
// import { ApiError, SettingsApiService } from 'services/openapi';
import { useManageUserSlice } from '../../slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDobValue,
  selectEditProfile,
  selectGenderValue,
  selectPreviewEmail,
  selectPreviewFullName,
  selectUserPayLoad,
} from '../../slice/selectors';
import { SaveButton } from 'app/components/SaveButton';
import { CancelButton } from 'app/components/CancelButton';
import { MExtensionField } from 'app/components/MExtensionField';
import { SettingsApiService } from 'services/openapi/services/SettingsApiService';
import dateFormat from 'dateformat';
import dayjs, { Dayjs } from 'dayjs';
import Cookies from 'js-cookie';
import { ModifyUserPayLoad } from 'services/openapi/models/ModifyUserPayLoad';
import useToast from 'hooks/Toast';
import SimpleReactValidator from 'simple-react-validator';

type Props = {};

export function MyProfileTab(props: Props) {
  const [edit, setEdit] = useState(false);
  const { getCurrentUser, updateCurrentUser } = SettingsApiService;
  const { actions } = useManageUserSlice();
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditProfile);
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { setOffToast } = useToast();
  const simpleValidator = React.useRef(new SimpleReactValidator());

  //Selectors
  const userPayload = useSelector(selectUserPayLoad);
  const genderValue = useSelector(selectGenderValue);
  const dobValue = useSelector(selectDobValue);
  const previewFullName = useSelector(selectPreviewFullName);
  const previewEmail = useSelector(selectPreviewEmail);
  //use States
  const [error, setError] = React.useState<unknown | null>();
  const [prevUserData, setPrevUserData] = React.useState<
    ModifyUserPayLoad | undefined
  >(userPayload!);
  const [genderValState, setGenderValState] = React.useState<number | string>(
    genderValue!,
  );
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(
    dayjs(dateFormat(new Date()?.toISOString(), 'yyyy-mm-dd, ')),
  );
  const GenderArray = [
    { id: 1, name: 'Male', code: 'M' },
    { id: 2, name: 'Female', code: 'F' },
    { id: 3, name: 'Other', code: 'O' },
  ];

  const handleEditProfileClick = () => {
    dispatch(actions.changeEditMode(true));
    setEdit(true);
  };
  const handleCanelEditProfileClick = () => {
    setPrevUserData(userPayload);
    const payload = GenderArray?.filter(item => {
      if (genderValue === item.id) {
        return item;
      }
    });
    setGenderValState(payload?.[0]?.id);
    setDateValue(dayjs(dobValue));
    dispatch(actions.changeEditMode(false));
    setEdit(false);
  };

  const handleFirstNameChange = e => {
    setPrevUserData({
      ...prevUserData,
      first_name: e.target.value,
    });
    // dispatch(actions.changeFirstname(e.target.value));
  };
  const handleLastNameChange = e => {
    setPrevUserData({
      ...prevUserData,
      last_name: e.target.value,
    });
    // dispatch(actions.changeLastName(e.target.value));
  };
  const handleEmailChange = e => {
    setPrevUserData({
      ...prevUserData,
      email: e.target.value,
    });
    // dispatch(actions.changeEmail(e.target.value));
  };
  const handlePhoneNumberChange = e => {
    setPrevUserData({
      ...prevUserData,
      phone: e.target.value,
    });
    // dispatch(actions.changePhoneNumber(e.target.value));
  };
  const handlePhoneCodeChange = e => {
    setPrevUserData({
      ...prevUserData,
      phone_code: e.target.value,
    });
    // dispatch(actions.changePhoneCode(e.target.value));
  };
  //handleOnchange DOB
  const handleChangeDate = (e: Dayjs | null) => {
    setDateValue(e);
    let dateVal = dateFormat(e?.toISOString(), 'yyyy-mm-dd');
    setPrevUserData({
      ...prevUserData,
      date_of_birth: dateVal,
    });
  };
  //handleOnchange Gender
  const handleGenderChange = e => {
    const payload = GenderArray?.filter(item => {
      if (e.target.value === item.id) {
        return item;
      }
    });
    setGenderValState(e.target.value);
    setPrevUserData({
      ...prevUserData,
      gender: payload?.[0]?.name,
    });
    // dispatch(actions.changeGender(payload?.[0].name));
  };
  //handleUpdate profile
  const [soon, setSoon] = React.useState<boolean>(true);
  const handleUpdateClick = () => {
    if (simpleValidator?.current?.allValid()) {
      handleRequest(updateCurrentUser(prevUserData)).then(res => {
        if (res.data) {
          Cookies.set('idToken', res?.data?.idToken);
          Cookies.set('accessToken', res?.data?.accessToken);
          Cookies.set('refreshToken', res?.data?.refreshToken);
          dispatch(actions.changeFirstname(res?.data?.user?.first_name));
          dispatch(actions.changeLastName(res?.data?.user?.last_name));
          dispatch(actions.changeEmail(res?.data?.user?.email));
          dispatch(actions.changePhoneCode(res?.data?.user?.phone_code));
          dispatch(actions.changePhoneNumber(res?.data?.user?.phone_number));
          dispatch(
            actions.setPreviewFullName(
              res?.data?.user.first_name + ' ' + res?.data?.user?.last_name,
            ),
          );
          dispatch(actions.setPreviewEmail(res?.data?.user?.email));
          let convertedDob = dateFormat(
            res?.data?.user?.date_of_birth,
            'yyyy-mm-dd',
          );
          dispatch(actions.changeDateofBirth(convertedDob));
          dispatch(
            actions.changeDobValue(
              dateFormat(
                new Date(res?.data?.user?.date_of_birth),
                'yyyy-mm-dd, ',
              ),
            ),
          );

          let selectedCategory = GenderArray?.filter((item, index) => {
            if (item?.name === res?.data?.user?.gender) {
              return item;
            }
          });
          if (selectedCategory) {
            dispatch(actions.changeGender(selectedCategory?.[0]?.name));
            dispatch(actions.changeGenderValue(selectedCategory?.[0]?.id));
          }
          dispatch(actions.changeEditMode(false));
          setOffToast('success', 'Successfully updated details');
        }
      });
    } else {
      simpleValidator.current.showMessages();
      setSoon(!soon);
    }
  };

  useEffect(() => {
    setDateValue(dayjs(dobValue));
  }, [dobValue]);
  useEffect(() => {
    setPrevUserData(userPayload);
    setGenderValState(genderValue!);
  }, [userPayload, editMode]);
  useEffect(() => {
    dispatch(actions.changeEditMode(false));
  }, []);
  return (
    <StyledTabCardView className={editMode ? 'wrapper active' : 'wrapper'}>
      <Wrapper>
        <div>
          <HeaderWrapper>
            <div className="labelwrapper">
              <div className="upload-pic-wrapper">
                <UploadPic />
              </div>

              <div className="name-text-block">
                <TabLabel className="firstname">{previewFullName}</TabLabel>
                <TabLabel className="username">{previewEmail}</TabLabel>
              </div>
            </div>
            {!editMode && (
              <div className="buttonwrapper">
                <EditButton onClick={handleEditProfileClick}>Edit</EditButton>
              </div>
            )}
          </HeaderWrapper>
          <BodyWrapper>
            <Grid container spacing={2} sx={GridStyles.Container}>
              {/* First Name */}
              <Grid xs={4}>
                <Item>
                  <TabLabel className="leftgrid">First Name</TabLabel>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <MTextField
                    onChange={e => handleFirstNameChange(e)}
                    disabled={editMode ? false : true}
                    value={prevUserData?.first_name}
                    validator={simpleValidator.current}
                    error={'First Name'}
                    validations={'required|alpha_space'}
                  ></MTextField>
                </Item>
              </Grid>
              {/* Last Name */}
              <Grid xs={4}>
                <Item>
                  <TabLabel className="leftgrid">Last Name</TabLabel>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <MTextField
                    onChange={e => handleLastNameChange(e)}
                    disabled={editMode ? false : true}
                    value={prevUserData?.last_name}
                    validator={simpleValidator.current}
                    error={'Last Name'}
                    validations={'required|alpha_space'}
                  ></MTextField>
                </Item>
              </Grid>
              {/* Email */}
              <Grid xs={4}>
                <Item>
                  <TabLabel className="leftgrid">Email</TabLabel>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <MTextField
                    onChange={e => handleEmailChange(e)}
                    disabled={editMode ? false : true}
                    value={prevUserData?.email}
                    validator={simpleValidator.current}
                    error={'E-mail'}
                    validations={'required|email'}
                  ></MTextField>
                </Item>
              </Grid>
              {/* Phone Number */}
              <Grid xs={4}>
                <Item>
                  <TabLabel className="leftgrid">Phone Number</TabLabel>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <Box>
                    <Box sx={GridStyles.ContactBox}>
                      <StyledExtensionField
                        className="settings-extension-field"
                        placeholder="Code"
                        value={prevUserData?.phone_code}
                        disabled={editMode ? false : true}
                        onChange={e => handlePhoneCodeChange(e)}
                      />
                      <StyledNumberField
                        className="custom-num-field"
                        placeholder="Your Mobile Number"
                        value={prevUserData?.phone}
                        disabled={editMode ? false : true}
                        onChange={e => handlePhoneNumberChange(e)}
                        validator={simpleValidator.current}
                        error={'Phone Number'}
                        validations={'required|max:10|min:10'}
                      />
                    </Box>
                  </Box>
                </Item>
              </Grid>
              {/* Gender */}
              <Grid xs={4}>
                <Item>
                  <TabLabel className="leftgrid">Gender</TabLabel>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <StyledGenderWrapper className="dropdown">
                    <MSelect
                      disabled={editMode ? false : true}
                      data={GenderArray}
                      value={genderValState}
                      onChange={e => handleGenderChange(e)}
                    />
                  </StyledGenderWrapper>
                </Item>
              </Grid>
              {/* Date of Birth */}
              <Grid xs={4}>
                <Item>
                  <TabLabel className="leftgrid">Date of Birth</TabLabel>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <DatePickerWrapper className="datepicker">
                    <DatePicker
                      onChange={e => handleChangeDate(e!)}
                      disabled={editMode ? false : true}
                      inputFormat="DD MMMM YY"
                      value={dateValue}
                    />
                  </DatePickerWrapper>
                </Item>
              </Grid>
            </Grid>
            {editMode && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  padding: '15px 40px',
                }}
              >
                <CancelButton onClick={handleCanelEditProfileClick}>
                  cancel
                </CancelButton>
                <SaveButton onClick={handleUpdateClick}>Save</SaveButton>
              </Box>
            )}
          </BodyWrapper>
          <FooterWrapper></FooterWrapper>
        </div>
      </Wrapper>
    </StyledTabCardView>
  );
}
const StyledTabCardView = styled(TabCardView)`
  &.active {
    border: 1px solid #f4793b; /* Replace with the desired border color */
  }
`;
const StyledGenderWrapper = styled.div`
  margin: 10px 0px;
`;
const StyledExtensionField = styled(MExtensionField)`
  /* padding: 10px 0px 10px 0px !important; */
  padding: 0px !important;
  margin-top: 5px;
  align-self: baseline;

  &.settings-extension-field {
    .MuiFormControl-root {
      .MuiInputBase-root.MuiOutlinedInput-root {
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        @media (min-width: 320px) and (max-width: 575px) {
          font-size: 11px;
        }
        &.Mui-disabled {
          .MuiInputBase-input.MuiOutlinedInput-input {
            &.Mui-disabled {
              -webkit-text-fill-color: #ffffff !important;
              color: red !important;
            }
          }
        }
      }
    }
  }
`;
const StyledNumberField = styled(NumberField)`
  width: 100%;
  &.custom-num-field {
    padding: 5px 5px 5px 2px !important;
    .MuiFormControl-root {
      .MuiInputBase-root.MuiOutlinedInput-root {
        font-size: 11px !important;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
      }
    }
  }
`;

const GridStyles = {
  Container: {
    width: '100%',
    margin: '0px !important',
  },
  ContactBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0 0 5px',
    margin: '0px 0px 10px 0px',
  },
};

const Wrapper = styled.div`
  &.wrapper {
    /* Styles for wrapper without border color */
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  padding: 30px 40px;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 1366px) and (max-width: 4000px) {
    padding: 30px 40px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    padding: 30px 30px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 30px 20px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 30px 20px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 30px 20px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 20px 10px 15px 10px;
  }
  .labelwrapper {
    display: flex;
    align-items: center;
  }
  .name-text-block {
    padding-left: 15px;
  }

  .firstname {
    font-size: 18px;
    text-transform: capitalize;
    @media (min-width: 1366px) and (max-width: 4000px) {
      font-size: 20px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 19px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 17px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 15px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 14px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 12px;
    }
  }
  .username {
    color: #f4793b;
    text-transform: lowercase;
    @media (min-width: 1366px) and (max-width: 4000px) {
      font-size: 15px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 14px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 14px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 13px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px;
    }
  }
  .buttonwrapper {
    button {
      width: 62px;
      height: 27px;
      @media (min-width: 320px) and (max-width: 575px) {
        width: 50px;
      }
      border-radius: 6px !important;
      img {
        width: 15px;
        height: 15px;
      }
      .text-span {
        font-size: 12px;
      }
    }
  }
  .upload-pic-wrapper {
    div {
      padding: 0px;
      img {
        min-width: unset;
        margin: 0px;
      }
    }
    button {
      padding: 0px !important;
      border-radius: 5px !important;
      min-width: 20px !important;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
const BodyWrapper = styled.div`
  padding: 15px 0 !important;
  .leftgrid {
    align-items: center;
    text-align: start;
    padding: 9px 8px 8px 70px;
    color: #848484;
    margin: 0px;
    @media (min-width: 992px) and (max-width: 1199px) {
      padding: 0px 30px;
      margin-bottom: 25px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      padding: 8px 8px 8px 42px;
    }
    // @media (min-width: 576px) and (max-width: 767px) {
    //   padding: 8px 8px 8px 40px;
    // }
    @media (min-width: 320px) and (max-width: 575px) {
      padding: 9px 8px 8px 20px;
    }
  }
  .textfield-wrapper .MuiTextField-root .MuiInputBase-root {
    max-height: 31px !important;
    border-radius: 10px !important;
    background: #201e1e !important;
  }
  .dropdown {
    min-width: 100px;
    max-width: 32%;
    margin: 0px 0px 15px 0px;
    @media (min-width: 1366px) and (max-width: 4000px) {
      max-width: 35%;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      max-width: 45%;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      max-width: 55%;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      max-width: 45%;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      max-width: 50%;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      max-width: 32%;
    }
  }
  .datepicker {
    min-width: 130px;
    max-width: 70%;
  }
`;
const DatePickerWrapper = styled.div`
  @media (min-width: 576px) and (max-width: 767px) {
    min-width: 150px !important;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    min-width: 130px !important;
  }
`;
const FooterWrapper = styled.div``;
const Item = styled.div``;
