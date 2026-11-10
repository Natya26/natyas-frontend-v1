import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { LocalTitle } from 'app/data/localCatalog';

type Props = {
  title: LocalTitle;
  onClose: () => void;
  onSubscribe: () => void;
};

export const DemoModal = ({ title, onClose, onSubscribe }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [locked, setLocked] = useState(false);
  const [missing, setMissing] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    setReady(false);
    setMissing(false);
    setLocked(false);
    const video = videoRef.current;
    if (!video) return;
    const markMissing = () => setMissing(true);
    if (video.error) markMissing();
    video.addEventListener('error', markMissing);
    return () => video.removeEventListener('error', markMissing);
  }, [title.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || missing) return;
    const play = video.play();
    if (play) play.catch(() => undefined);
  }, [title.id, missing]);

  const stopAtPreview = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime >= title.previewSeconds) {
      video.pause();
      video.currentTime = title.previewSeconds;
      setLocked(true);
    }
  };

  return (
    <Scrim onClick={onClose}>
      <Sheet
        $w={title.frameWidth}
        $h={title.frameHeight}
        role="dialog"
        aria-modal="true"
        aria-label={`${title.name} demo`}
        onClick={event => event.stopPropagation()}
      >
        <Close type="button" aria-label="Close" onClick={onClose}>
          ×
        </Close>
        <Stage $w={title.frameWidth} $h={title.frameHeight}>
          <Video
            key={title.id}
            ref={videoRef}
            src={title.preview}
            poster={title.poster}
            controls={!locked && !missing && ready}
            controlsList="nodownload"
            playsInline
            autoPlay
            onContextMenu={event => event.preventDefault()}
            onCanPlay={() => setReady(true)}
            onTimeUpdate={stopAtPreview}
            onSeeked={stopAtPreview}
            onEnded={() => setLocked(true)}
            onError={() => setMissing(true)}
          />
          {locked && (
            <Lock>
              <h2>Demo finished</h2>
              <p>Subscribe to keep watching {title.name}.</p>
              <Subscribe type="button" onClick={onSubscribe}>
                See plans
              </Subscribe>
            </Lock>
          )}
          {missing && (
            <Lock>
              <h2>Demo not on this computer yet</h2>
              <p>
                Add the file at <code>public{title.preview}</code>
              </p>
            </Lock>
          )}
        </Stage>
        <Meta>
          <div>
            <h2>{title.name}</h2>
            <p>
              {[title.year, title.language, title.lengthLabel]
                .filter(Boolean)
                .join('  ·  ')}
            </p>
            <Copy>{title.description}</Copy>
          </div>
          <Full type="button" onClick={onSubscribe}>
            Watch full {title.kind === 'series' ? 'series' : 'film'}
          </Full>
        </Meta>
      </Sheet>
    </Scrim>
  );
};

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 28px 16px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
`;

const Sheet = styled.div<{ $w: number; $h: number }>`
  position: relative;
  width: min(
    1120px,
    calc(100vw - 40px),
    calc((100vh - 190px) * ${props => props.$w} / ${props => props.$h})
  );
  background: #101114;
  color: #f6f3ee;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
`;

const Close = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: rgba(20, 20, 20, 0.72);
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
`;

const Stage = styled.div<{ $w: number; $h: number }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${props => `${props.$w} / ${props.$h}`};
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
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
  padding: 24px;
  text-align: center;
  background: rgba(0, 0, 0, 0.78);
  h2 {
    margin: 0;
    font-size: 28px;
    letter-spacing: -0.03em;
  }
  p {
    margin: 0;
    color: #d7d2c8;
  }
  code {
    color: #fff;
  }
`;

const Subscribe = styled.button`
  margin-top: 8px;
  border: 0;
  border-radius: 4px;
  padding: 12px 18px;
  background: #f4f1ea;
  color: #111;
  font-weight: 650;
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  padding: 22px 24px 26px;
  h2 {
    margin: 0;
    font-size: 28px;
    letter-spacing: -0.04em;
    font-weight: 560;
  }
  p {
    margin: 8px 0 0;
    color: #b7b2a8;
    font-size: 13px;
    letter-spacing: 0.04em;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copy = styled.p`
  max-width: 560px;
  color: #e7e2d8 !important;
  letter-spacing: 0 !important;
  font-size: 15px !important;
  line-height: 1.5;
`;

const Full = styled.button`
  flex: 0 0 auto;
  border: 0;
  border-radius: 4px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
`;
