import React, { useRef } from 'react';
import styled from 'styled-components';
import './assets/css/style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import poster from './assets/img/2.png';
// import User from './assets/img/user/2.png';
import User from './assets/img/user/2.png';
import EditImageButton from '../EditImageButton';
export type FieldProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | undefined) => void; // to handle onClick functions
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; // make the button disabled or not
  mode?: boolean; // make the button disabled or not
  fieldValue?: any;
  title?: String;
  imgUrl?: string;
};

const UploadPic = ({
  onChange,
  onSubmit,
  imgUrl,
  mode,
  disabled,
}: FieldProps) => {
  //Usestates
  const aRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = React.useState<FileList | null>();
  const [currentImage, SetCurrentImage] = React.useState<string | undefined>(
    imgUrl,
  );

  const resetInput = () => {
    console.log(aRef.current, 'current');
    if (aRef.current) aRef.current.value = '';
  };
  const handleRemove = e => {
    resetInput();
    SetCurrentImage('');
    onChange?.(undefined);
  };

  const chooseImage = img => {
    SetCurrentImage(img);
  };
  const onImageSelected = e => {
    const ImageUrl = URL.createObjectURL(e.target.files[0]);
    chooseImage(ImageUrl);
    setFileList(e.target.files[0]);
    onChange?.(e.target.files[0]);
  };
  const handleSubmitPoster = (event: React.MouseEvent<HTMLButtonElement>) => {
    onSubmit?.(event);
  };

  React.useEffect(() => {
    if (imgUrl != currentImage) SetCurrentImage(imgUrl);
    return () => {};
  }, [imgUrl]);

  return (
    <Wrapper>
      {currentImage ? (
        <StyledImg
          className={`new-image-preview ${currentImage && 'new-img-selected'}`}
          src={User}
        />
      ) : (
        <StyledThumbImg src={User} />
      )}
      <ButtonWrapper className="ButtonWrapper">
        {<EditImageButton />}
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 5px;
  position: relative;
  border-radius: 50% !important;
  border: 2px solid #e0be00;

  width: fit-content;
  /* background: aliceblue; */
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 0;
  button {
    display: none !important; //temporarily hiding
  }
`;
const StyledImg = styled.img`
  width: 100%;
  min-width: 100px;
  margin: 8px 8px;
  border-radius: 50% !important;
  border: 2px solid #e0be00;

  &.new-img-selected {
    border: 3px solid #e0be00;
  }
`;
const StyledThumbImg = styled.img`
  width: 100%;
  min-width: 100px;
  margin: 8px 8px;
  border-radius: 50px !important;
  &.new-img-selected {
    border: 3px solid #e0be00;
  }
`;

export default UploadPic;
