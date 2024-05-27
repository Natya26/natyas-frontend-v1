import React, { useEffect, useState } from 'react';
import './assets/css/styles.css';
type ToggleSwitchProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: boolean;
  text?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
};

const NotificationSwitch = ({
  onChange,
  text,
  checked,
  disabled,
  className,
}: ToggleSwitchProps) => {
  const [checkedVal, setCheckedVal] = useState<boolean | undefined>(false);
  const hanndleCheckSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedVal(event.target.checked);
    onChange?.(event);
  };
  useEffect(() => {
    setCheckedVal(checked);
  }, []);

  return (
    <div className={`'customswitch ' ${className}`}>
      <label>
        <span
          className={`${checkedVal ? 'checked' : 'unchecked'} switch-wrapper`}
        >
          <input
            type="checkbox"
            checked={checkedVal}
            disabled={disabled}
            onChange={e => hanndleCheckSwitch(e)}
          />
          <span className={`${checkedVal ? 'checked' : 'unchecked'} switch`}>
            <span className="switch-handle" />
          </span>
        </span>
      </label>
    </div>
  );
};

export default NotificationSwitch;
