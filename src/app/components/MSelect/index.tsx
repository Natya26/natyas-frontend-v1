import React, { useEffect } from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export type MSelectProps = {
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

export default function MSelect({
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
}: MSelectProps) {
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
      <FormControl fullWidth>
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
          // name={name}
          labelId="custom-select-label"
          label={label}
          disabled={disabled}
          value={selectvalue ? selectvalue : ''}
          defaultValue={defaultValue}
          id="demo-simple-select"
          onChange={handleChange}
          fullWidth={fullWidth}
        >
          {data?.map((data, index) => {
            return (
              <MenuItem key={index} value={data.id}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  &.select-wrapper {
    .MuiInputBase-root {
      width: 100%;
      height: 100%;
      min-height: 28px;
      max-height: 31px;
      text-align: left;
      background: #201e1e !important;
      color: #e0be00 !important;
      border-radius: 10px;
      margin-left:4px;
      @media (min-width: 1366px) and (max-width: 4000px) {
        margin-left:24px;
      }


      
      &:hover {
        box-shadow: none !important;
      }
    }
    .MuiSelect-select {
      display: flex;
      align-items: center;
      font-family: 'Urbanist';
      background: #201e1e !important;
      box-shadow: inset 0 0 40px 40px #201e1e;
      color: #e0be00 !important;
      border-radius: 10px !important;
      min-height: unset !important;
      position: relative;
      max-height: 31px;
      font-size: 13px !important;
      @media (min-width: 1366px) and (max-width: 4000px) {
        font-size: 13px !important;
 
        right: 20px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        font-size: 13px !important;

      }
      @media (min-width: 992px) and (max-width: 1199px) {
        font-size: 12px !important;

      }
      @media (min-width: 768px) and (max-width: 991px) {
        font-size: 12px !important;

      }
      @media (min-width: 576px) and (max-width: 767px) {
        font-size: 11px !important;

      }
      @media (min-width: 320px) and (max-width: 575px) {
        font-size: 11px !important;
        margin-left:5px;
      }
      &.Mui-disabled {
        -webkit-text-fill-color: #e0be00 !important;
      }
    }
    .MuiSvgIcon-root {
      fill: #e0be00 !important;
      left: 86px;
      @media (min-width: 1366px) and (max-width: 4000px) {
        left: 70px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        left: 86px;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        left: 86px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        left: 80px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        left: 75px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        left: 70px;
      }
    }
  }
`;
