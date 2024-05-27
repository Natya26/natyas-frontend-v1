import React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CancelButton } from 'app/components/CancelButton';
import { SaveButton } from 'app/components/SaveButton';
import { CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

type DialogProps = {
  id?: string;
  title?: string;
  textData?: string;
  open?: boolean;
  restricted?: boolean;
  children?: React.ReactNode;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void; // to handle onClick functions
  setView?: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserPaymentDetailsPopup = ({
  title,
  open,
  onSubmit,
  onClose,
  setView,
  textData,
  restricted,
  onChange,
}: DialogProps) => {
  const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onSubmit?.(event);
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange?.(e);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    Width: '100%',
    minWidth: 400,
    height: 'auto',
    minHeight: 300,
    textAlign: 'center',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  };
  // Make sure to call `loadStripe` outside of a component's render to avoid
  //recreating the `Stripe` object on every render.
  // const stripePromise = loadStripe(
  //   'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
  // );
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <StyledModal
      open={open!}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="StyledModal"
    >
      <Box className="StyledModal-Sub-Box">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Label Goes Here
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          {/* <Elements stripe={stripePromise}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Elements> */}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            padding: '0px 0px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              padding: '15px 40px',
            }}
          >
            <CancelButton onClick={onClose}>cancel</CancelButton>
            <SaveButton onClick={handleConfirmClick}>Save</SaveButton>
          </Box>
          {/* <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirmClick}>
            Confirm
          </Button> */}
        </Box>
      </Box>
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  width: 100%;
  .StyledModal-Sub-Box {
    width: 500px;
    height: 500px;
    background: aliceblue;
    /* display: block; */
    margin: 0 auto;
    /* position: 'absolute';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    width: '100%';
    min-width: 400;
    min-height: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
export default UserPaymentDetailsPopup;
