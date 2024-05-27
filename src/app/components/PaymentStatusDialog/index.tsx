import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import TimerOffRoundedIcon from '@mui/icons-material/TimerOffRounded';
import { HdfcPaymentStatusResponse } from 'utils/enums';
// enum PaymentstatusResponse {
//   success = 1,
//   rejected = 0,
// }

type Props = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  type?:
    | HdfcPaymentStatusResponse.success
    | HdfcPaymentStatusResponse.rejected
    | HdfcPaymentStatusResponse.expired
    | 'timeout';
};

const PaymentStatusDialog = ({ open, setOpen, type }: Props) => {
  const handleClose = () => {
    setOpen?.(false);
  };
  return (
    <StyledDialog
      open={open!}
      //   onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="styled-status-dialog"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <StyledContentSubWrapper>
            <StyledIconWrapper className="styled-icon-wrapper">
              {type === HdfcPaymentStatusResponse.success ? (
                <CheckCircleRoundedIcon className="success" />
              ) : type === HdfcPaymentStatusResponse.rejected ? (
                <HighlightOffRoundedIcon className="rejected" />
              ) : type === HdfcPaymentStatusResponse.expired ? (
                <TimerOffRoundedIcon className="timeout" />
              ) : (
                ''
              )}
            </StyledIconWrapper>
            {type === HdfcPaymentStatusResponse.success ? (
              <h3 className="main-title success">Success</h3>
            ) : type === HdfcPaymentStatusResponse.rejected ? (
              <h3 className="main-title rejected">Payment failed</h3>
            ) : type === HdfcPaymentStatusResponse.expired ? (
              <h3 className="main-title timeout">Timeout</h3>
            ) : (
              ''
            )}
            {type === HdfcPaymentStatusResponse.success ? (
              <p>
                Subscription payment successful.
                <br /> Your account is ready to use.
              </p>
            ) : type === HdfcPaymentStatusResponse.rejected ? (
              <p>
                Transaction has been rejected.
                <br />
              </p>
            ) : type === HdfcPaymentStatusResponse.expired ? (
              <p>
                Your payment session has expired
                <br />
                due to inactivity
              </p>
            ) : (
              ''
            )}
          </StyledContentSubWrapper>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-action-wrapper">
        {/* <Button onClick={handleClose}>Disagree</Button> */}
        {type === HdfcPaymentStatusResponse.success ? (
          <Button
            className="success-btn-custom btn-custom"
            onClick={handleClose}
            autoFocus
          >
            Continue
          </Button>
        ) : type === HdfcPaymentStatusResponse.rejected ? (
          <Button
            className="error-btn-custom btn-custom"
            onClick={handleClose}
            autoFocus
          >
            Continue
          </Button>
        ) : type === HdfcPaymentStatusResponse.expired ? (
          <Button
            className="timeout-btn-custom btn-custom"
            onClick={handleClose}
            autoFocus
          >
            Continue
          </Button>
        ) : (
          ''
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default PaymentStatusDialog;
const StyledDialog = styled(Dialog)`
  .MuiDialog-container {
    .MuiPaper-root {
      &.MuiPaper-elevation {
        min-height: 350px !important;
        min-width: 400px !important;
        max-width: 400px;
        border-radius: 20px !important;
        .MuiDialogContent-root {
          padding: 20px 24px !important;
        }
        .dialog-action-wrapper {
          justify-content: center !important;
          padding: 12px 8px 30px 8px !important;
          .btn-custom {
            text-transform: capitalize;
            min-width: 130px;
            padding: 5px 5px;
            border-radius: 8px;
          }
          .success-btn-custom {
            background: rgb(62, 196, 123) !important;
            color: rgb(255, 255, 255) !important;
          }
          .error-btn-custom {
            background: #fe4759 !important;
            color: rgb(255, 255, 255) !important;
            text-transform: capitalize;
          }
          .timeout-btn-custom {
            background: #546e7a !important;
            color: rgb(255, 255, 255) !important;
            text-transform: capitalize;
          }
        }
      }
    }
  }
`;
const StyledFooterWrapper = styled.div``;
const StyledContentSubWrapper = styled.div`
    .main-title{
        text-align: center;
        color: rgb(62, 196, 123) !important;
        margin: 5px 0px;
        font-size: 24px;
        &.success{
            color: #3ec47b !important;
        }
        &.rejected{
            color: #fe4759 !important;
        }
        &.timeout{
          color: #546E7A !important;
        }
    }
    p{
        text-align: center;
    }
}
`;
const StyledIconWrapper = styled.div`
  text-align: center;
  svg {
    font-size: 90px;
    &.success {
      color: #3ec47b !important;
    }
    &.rejected {
      color: #fe4759 !important;
    }
    &.timeout {
      color: #546e7a !important;
    }
  }
`;
