import React, { useEffect } from 'react';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ReactComponent as SearchIcon } from './assets/img/icons/search.svg';
import { ReactComponent as ClearIcon } from './assets/img/icons/clear.svg';

export type FieldProps = {
  onChange?: (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void; // to handle onClick functions
  color?: 'primary' | 'secondary'; // two styling options (you can create as many as you want)
  border?: 'primary' | 'secondary';
  disabled?: boolean; // make the button disabled or not
  label?: String;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string | null;
  defaultValue?: string;
  value?: string;
  type?: 'password' | 'text' | 'number';
  autoComplete?: 'off' | '';
};

const SearchTextField = ({
  onChange,
  color,
  border,
  label,
  placeholder,
  className,
  name,
  type,
  disabled,
  defaultValue,
  value,
  error,
  autoComplete,
}: FieldProps) => {
  const [placeHolderText, setPlaceHolderText] = React.useState<
    string | undefined
  >('');
  const [textValue, setTextValue] = React.useState<string | undefined>('');
  const [showClearIcon, setShowClearIcon] = React.useState<boolean>(false);
  const handleChange = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange?.(e);
    setTextValue(e?.target?.value);
    setShowClearIcon(true);
  };
  const handleClearText = () => {
    setTextValue('');
    setShowClearIcon(false);
  };
  useEffect(() => {
    setPlaceHolderText(placeholder);
  }, [placeholder]);
  return (
    <StyledSearchField
      id="search-text-box-custom"
      className={`search-text-box  ${className}`}
      onChange={e => handleChange(e)}
      placeholder={placeHolderText}
      inputProps={{
        autoComplete: 'new-password',
        form: {
          autoComplete: 'off',
        },
      }}
      value={textValue}
      endAdornment={
        <InputAdornment position="end">
          {showClearIcon ? (
            <IconButton edge="end">
              <ClearIcon onClick={handleClearText} />
            </IconButton>
          ) : (
            <IconButton edge="end">
              <SearchIcon />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
};
const StyledSearchField = styled(OutlinedInput)`
  background: #1e1c1c !important;
  border-radius: 20px !important;
  color: #ffffff !important;
  font-family: Urbanist !important;
  width: 100%;
  padding: 9px 30px 9px 30px !important;
  .MuiOutlinedInput-root {
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #ffffff;
      padding-left: 10px !important;
      font-family: Urbanist !important;
      font-style: italic !important;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #ffffff;
      padding-left: 10px !important;
      font-style: italic !important;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #ffffff;
      padding-left: 10px !important;
      font-style: italic !important;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #ffffff;
      padding-left: 10px !important;
      font-style: italic !important;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

export default SearchTextField;
