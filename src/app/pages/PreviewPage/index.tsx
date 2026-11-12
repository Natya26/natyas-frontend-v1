import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RoutePath } from 'app/RoutePath';
import { findLocalTitle } from 'app/data/localCatalog';
import { useManageUserSlice } from '../Settings/slice';
import { Footer } from 'app/components/Footer';

const PreviewPage = () => {
  const { titleId } = useParams();
  const title = findLocalTitle(titleId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [locked, setLocked] = useState(false);
  const [missing, setMissing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions: userActions } = useManageUserSlice();

  const askToSubscribe = () => {
    dispatch(userActions.setSettingsTabVal(4));
    navigate(RoutePath.settings.path);
  };

  const stopAtPreview = () => {
    const video = videoRef.current;
    if (!video || !title) return;
    if (video.currentTime >= title.previewSeconds) {
      video.pause();
      video.currentTime = title.previewSeconds;
      setLocked(true);
    }
  };

  if (!title) {
    return (
      <Page>
        <Message>This title is not in the local list.</Message>
      </Page>
    );
  }

  return (
    <>
      <Page>
        <Top>
          <Back type="button" onClick={() => navigate(RoutePath.homepage.path)}>
            Back
          </Back>
          <Heading>
            <h1>{title.name}</h1>
            <p>2 minute demo · the full film needs a subscription</p>
          </Heading>
        </Top>
        <Stage>
          <Video
            ref={videoRef}
            src={title.preview}
            controls
            controlsList="nodownload"
            playsInline
            onContextMenu={event => event.preventDefault()}
            onTimeUpdate={stopAtPreview}
            onSeeked={stopAtPreview}
            onEnded={() => setLocked(true)}
            onError={() => setMissing(true)}
          />
          {locked && (
            <Lock>
              <h2>Demo finished</h2>
              <p>Subscribe to watch the rest of {title.name}.</p>
              <Subscribe type="button" onClick={askToSubscribe}>
                Subscribe
              </Subscribe>
            </Lock>
          )}
        </Stage>
        {missing && (
          <Hint>
            Put the demo file on this computer at{' '}
            <code>public{title.preview}</code>. It is not uploaded anywhere.
          </Hint>
        )}
        <Under>
          <p>{title.description}</p>
          <Subscribe type="button" onClick={askToSubscribe}>
            Watch full {title.kind === 'series' ? 'series' : 'movie'}
          </Subscribe>
        </Under>
      </Page>
      <Footer />
    </>
  );
};

const Page = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 110px 24px 40px;
`;

const Top = styled.div`
  max-width: 1100px;
  margin: 0 auto 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Back = styled.button`
  border: 0;
  background: transparent;
  color: #e0be00;
  font-weight: 700;
  cursor: pointer;
`;

const Heading = styled.div`
  h1 {
    margin: 0;
    font-size: 28px;
  }
  p {
    margin: 4px 0 0;
    color: #c8c8c8;
  }
`;

const Stage = styled.div`
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  background: #111;
  border-radius: 16px;
  overflow: hidden;
`;

const Video = styled.video`
  display: block;
  width: 100%;
  max-height: 70vh;
  background: #000;
  &::-webkit-media-controls-download-button {
    display: none !important;
  }
`;

const Lock = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.78);
  h2 {
    margin: 0;
    color: #e0be00;
  }
`;

const Subscribe = styled.button`
  margin-top: 12px;
  border: 0;
  border-radius: 999px;
  padding: 12px 24px;
  background: #e0be00;
  color: #161616;
  font-weight: 700;
  cursor: pointer;
`;

const Hint = styled.p`
  max-width: 1100px;
  margin: 16px auto 0;
  color: #e0be00;
  code {
    color: #fff;
  }
`;

const Under = styled.div`
  max-width: 1100px;
  margin: 20px auto 0;
  p {
    color: #d0d0d0;
    max-width: 640px;
  }
`;

const Message = styled.p`
  padding-top: 40px;
`;

export default PreviewPage;
