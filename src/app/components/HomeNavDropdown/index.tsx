import React, { useEffect } from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export type DropdownProps = {
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  color?: 'primary' | 'secondary';
  border?: 'primary' | 'secondary';
  disabled?: boolean;
  label?: String;
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  name?: string;
  id?: string;
  defaultValue?: string | number;
  value?: string | number;
  data?: { id?: number; name?: string; code?: string }[];
};

const HomeNavDropdown = ({
  onChange,
  color,
  border,
  label,
  placeholder,
  name,
  id,
  disabled,
  defaultValue,
  fullWidth,
  value,
  data,
}: DropdownProps) => {
  const [selectvalue, setSelectValue] = React.useState<number | string>(
    value ?? '',
  );
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange?.(event);
    setSelectValue(event.target.value);
  };

  useEffect(() => {
    if (value !== selectvalue) setSelectValue(value ?? '');
    return () => {};
  }, [value]);

  return (
    <Wrapper className="select-wrapper">
      <FormControl fullWidth id="homepage-select">
        <Select
          className="muiSelect"
          labelId="homepage-select-label"
          label={label}
          value={selectvalue ? selectvalue : ''}
          defaultValue={1}
          id="homepage-slect"
          onChange={handleChange}
          fullWidth={fullWidth}
          disabled={disabled}
          MenuProps={{
            classes: { paper: 'homepage-select-menu' },
            variant: 'menu',
          }}
        >
          {data?.map((data, index) => {
            return (
              <MenuItem id="homepage-select" key={index} value={data.id}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  position: relative !important;
  input {
    border-width:0px;
    padding:0px;
  }

  
  .muiSelect {
    @media (min-width: 1366px) and (max-width: 4000px) {
      font-size: 24px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 22px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 20px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 18px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 15px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px;
    }
  }
  &.select-wrapper {
    width: 100%;
    .MuiFormControl-root {
      width: inherit;
    }
    .MuiInputBase-root {
      width: 100%;
      height: 100%;
      min-height: 31px;
      max-height: 31px;
      text-align: left;
      color: #e0be00 !important;
      box-shadow: unset !important;
      .MuiSvgIcon-root
      {
        right: 15px;
        width: 15px;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }
      &:hover {
        box-shadow: none !important;
        border: 0px !important;
      }
      &:focus {
        box-shadow: none !important;
        border: 0px !important;
      }
      &:focus-visible {
        box-shadow: none !important;
        border: 0px !important;
      }
      .MuiOutlinedInput-notchedOutline {
        border: 0px !important;
        box-shadow: 0px !important;
        padding:0px;
      }
    }

    #homepage-slect .MuiSelect-select + [aria-expanded='true'] {
      border-bottom-left-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }

    .MuiSelect-select {
      display: flex;
      align-items: center;
      font-family: 'Urbanist' !important;
      font-weight: 400 !important;
      letter-spacing: 1.1px !important;
      box-shadow: none !important;
      position: relative;
      max-height: initial !important;
      background: #e0be00 !important;
      color: rgb(255 255 255) !important;
      border-radius: 10px !important;
      min-height: unset !important;
      max-height: 31px;
      box-shadow: unset !important;
      font-size: 15px;
      cursor: pointer;
      @media (min-width: 1366px) and (max-width: 4000px) {
        height: 46px !important;
        width: 176px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        height: 41px !important;
        width: 170px;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        height: 40px !important;
        width: 155px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        height: 37px !important;
        width: 133px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        width: 115px;
        height: 32px !important;
        border-radius: 7px !important;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        width: 90px;
        height: 32px !important;
        border-radius: 5px !important;
        padding: 0 10px !important;
        input {
          height: 32px;
          top: -1px;
          border-radius: 5px;
          .MuiInputBase-root .MuiSvgIcon-root {
            right: 10px !important;
            left: auto !important;
          }
        }
      }
      &:focus-within {
        box-shadow: unset !important;
      }
    }
    .MuiSvgIcon-root {
      fill: none !important;
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='9' viewBox='0 0 18 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.6677 8.5975C7.9677 8.5975 7.2677 8.3275 6.7377 7.7975L0.217701 1.2775C0.0782212 1.13636 0 0.94593 0 0.7475C0 0.549069 0.0782212 0.358638 0.217701 0.2175C0.507701 -0.0725 0.987702 -0.0725 1.2777 0.2175L7.7977 6.7375C8.2777 7.2175 9.0577 7.2175 9.5377 6.7375L16.0577 0.2175C16.3477 -0.0725 16.8277 -0.0725 17.1177 0.2175C17.4077 0.5075 17.4077 0.987499 17.1177 1.2775L10.5977 7.7975C10.0677 8.3275 9.3677 8.5975 8.6677 8.5975Z' fill='white'/%3E%3C/svg%3E");
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: contain !important;
      right: 30px;
      @media (min-width: 1366px) and (max-width: 4000px) {
        right: 30px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        right: 24x;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        right: 20px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        right: 18px;
        width: 20px;
        height: 20px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        top: 7px;
        right: 14px;
        width: 17px;
        height: 17px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        top: 11px;
        left:80px;
        width: 10px;
        height: 10px;
      }
    }
  }
`;
const StyledFormControl = styled(FormControl)`
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 10px;
  }
`;

export default HomeNavDropdown;
