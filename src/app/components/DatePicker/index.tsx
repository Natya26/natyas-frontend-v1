import React, { useEffect } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import CalendarIcon from './assets/img/icon/1.svg';
import InputAdornment from '@mui/material/InputAdornment';

type DateProps = {
  onChange?: (
    value: dayjs.Dayjs | null | undefined,
    keyboardInputValue?: string | undefined,
  ) => void;
  className?: string;
  id?: string;
  label?: string;
  format?: string;
  value?: Dayjs | null;
  disabled?: boolean;
  maxDate?: any;
  inputFormat?: any;
};

const DatePicker = ({
  onChange,
  disabled,
  id,
  className,
  maxDate,
  inputFormat,
  value,
}: DateProps) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>();
  const handleChangeDate = (e: Dayjs | null | undefined) => {
    onChange?.(e);
    setDateValue(e);
  };
  useEffect(() => {
    setDateValue(value);
  }, [value]);
  return (
    <Wrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          // label="custom"
          inputFormat={inputFormat}
          value={dateValue}
          disabled={disabled}
          className={`datepicker-custom  ${className}`}
          onChange={e => handleChangeDate(e)}
          maxDate={maxDate}
          renderInput={params => (
            <TextField
              id={id}
              {...params}
              fullWidth={true}
              sx={{ width: '100%' }}
            />
          )}
        />
      </LocalizationProvider>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .datepicker-custom {
    .MuiInputBase-input {
      box-shadow: none !important;
    }
    .MuiInputBase-root.MuiOutlinedInput-root {
      background: #201e1e !important;
      color: #ffffff;
      border-radius: 10px !important;
      .MuiInputBase-input {
        padding: 0px 0px 0px 15px !important;
        @media (min-width: 1366px) and (max-width: 4000px) {
          font-size: 13px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 12px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 12px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 11px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 11px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px;
    }
      }
      &.Mui-disabled {
        .MuiInputBase-input {
          padding: 0px 0px 0px 15px !important;
          &.Mui-disabled {
            -webkit-text-fill-color: #ffffff !important;
          }
        }
      }
    }
    .MuiInputAdornment-root {
      .MuiButtonBase-root.MuiIconButton-root {
        svg {
          display: none !important;
        }

        background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.66667 1.16699V2.91699M9.33333 1.16699V2.91699M2.04167 5.30283H11.9583M12.25 4.95866V9.91699C12.25 11.667 11.375 12.8337 9.33333 12.8337H4.66667C2.625 12.8337 1.75 11.667 1.75 9.91699V4.95866C1.75 3.20866 2.625 2.04199 4.66667 2.04199H9.33333C11.375 2.04199 12.25 3.20866 12.25 4.95866Z' stroke='white' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.15563 7.99121H9.16088M9.15563 9.74121H9.16088M6.9973 7.99121H7.00313M6.9973 9.74121H7.00313M4.83838 7.99121H4.84421M4.83838 9.74121H4.84421' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        margin: 0 0px 0 0;
      }
    }
  }
`;
const Icon = styled.img`
  padding: 0px 0px;
  margin: 0px 6px;
`;
export default DatePicker;
