import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Like } from './assets/img/like.svg';
import { ReactComponent as Likefilled } from './assets/img/likefilled.svg';

export type LikeProps = {
  value?: boolean;
  onClick?: (value: boolean) => void;
};

export const LikeButton = ({ value, onClick }: LikeProps) => {
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
        <Likefilled onClick={handleIconClick} />
      ) : (
        <Like onClick={handleIconClick} />
      )}
    </div>
  );
};
