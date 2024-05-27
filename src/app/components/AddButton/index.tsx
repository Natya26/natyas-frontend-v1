import React, { useEffect, useState } from 'react';
import { ReactComponent as Add } from './assets/img/icon/add.svg';
import { ReactComponent as Added } from './assets/img/icon/added.svg';

interface Props {
  value?: boolean;
  onClick?: (value: boolean) => void;
}

const MyComponent: React.FC<Props> = ({ value, onClick }) => {
  const [showIcon, setShowIcon] = useState<boolean>();
  useEffect(() => {
    setShowIcon(value);
  }, [value]);

  const handleIconClick = () => {
    setShowIcon(!showIcon);
    handleAddClick();
  };

  const handleAddClick = () => {
    onClick?.(!showIcon);
  };

  return (
    <div>
      {showIcon ? (
        <Added onClick={handleIconClick} />
      ) : (
        <Add onClick={handleIconClick} />
      )}
    </div>
  );
};

export default MyComponent;
