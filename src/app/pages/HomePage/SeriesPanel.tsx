import styled from 'styled-components';
import {
  episodeAsTitle,
  LocalSeriesTitle,
  LocalTitle,
} from 'app/data/localCatalog';

type Props = {
  series: LocalSeriesTitle;
  onClose: () => void;
  onPlay: (title: LocalTitle) => void;
  onSubscribe: () => void;
};

export const SeriesPanel = ({
  series,
  onClose,
  onPlay,
  onSubscribe,
}: Props) => {
  const demo = series.episodes.find(item => item.preview) ?? series.episodes[0];

  return (
    <Panel>
      <Layout>
        <Still>
          <img src={series.poster} alt="" />
        </Still>
        <Copy>
          <Top>
            <div>
              <Eyebrow>Web series</Eyebrow>
              <h3>{series.name}</h3>
            </div>
            <Close type="button" aria-label="Close series" onClick={onClose}>
              ×
            </Close>
          </Top>
          <Meta>
            <span>{series.episodes.length} episodes</span>
            {series.language && <span>{series.language}</span>}
            {demo.preview && <span>1 demo</span>}
          </Meta>
          <p>{series.description}</p>
          <Actions>
            {demo.preview && (
              <Play
                type="button"
                onClick={() => onPlay(episodeAsTitle(series, demo))}
              >
                <Triangle />
                Watch demo
              </Play>
            )}
            <Full type="button" onClick={onSubscribe}>
              <Triangle />
              Full series
            </Full>
          </Actions>
          <EpisodeRow $count={series.episodes.length}>
            {series.episodes.map(item => (
              <Episode key={item.id}>
                <Thumb>
                  <img src={item.image} alt={`Episode ${item.number}`} />
                </Thumb>
                <Label>
                  <strong>{item.name}</strong>
                </Label>
              </Episode>
            ))}
          </EpisodeRow>
        </Copy>
      </Layout>
    </Panel>
  );
};

const Panel = styled.div`
  margin-top: 14px;
  background: #141414;
  border-radius: 8px;
  padding: 18px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 22px;
  align-items: start;
  @media (max-width: 700px) {
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 12px;
  }
`;

const Still = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  background: #111;
  aspect-ratio: 2 / 3;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`;

const Play = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 4px;
  padding: 12px 16px;
  background: #f4f1ea;
  color: #121212;
  font-weight: 650;
  cursor: pointer;
`;

const Copy = styled.div`
  min-width: 0;
  h3 {
    margin: 0;
    font-size: 32px;
    font-weight: 560;
    letter-spacing: -0.04em;
  }
  p {
    margin: 12px 0 0;
    color: #d9d3c8;
    line-height: 1.5;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Eyebrow = styled.p`
  margin: 0 0 6px !important;
  color: #e7c56a !important;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 11px;
`;

const Close = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  span {
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 2px;
    padding: 3px 7px;
    color: #ece7de;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const Full = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 4px;
  padding: 12px 16px;
  background: #e7c56a;
  color: #1a1408;
  font-weight: 650;
  cursor: pointer;
  &:hover {
    background: #f0d48a;
  }
`;

const EpisodeRow = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$count}, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Episode = styled.div`
  min-width: 0;
  color: inherit;
  text-align: left;
`;

const Thumb = styled.span`
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
  background: #111;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Label = styled.span`
  display: block;
  margin-top: 8px;
  span {
    display: block;
    color: #b7b2a8;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  strong {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    font-weight: 560;
  }
`;

const Triangle = styled.span`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8px;
  border-color: transparent transparent transparent currentColor;
`;
