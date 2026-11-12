import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RoutePath } from 'app/RoutePath';
import {
  findLocalTitle,
  localMovies,
  localSeries,
  localUpcoming,
  LocalSeriesTitle,
  LocalTitle,
} from 'app/data/localCatalog';
import { useManageUserSlice } from '../Settings/slice';
import { DemoModal } from './DemoModal';
import { SeriesPanel } from './SeriesPanel';
import { Footer } from 'app/components/Footer';

const coverIds = ['unmadam', 'aara'];
const covers = coverIds
  .map(id => findLocalTitle(id))
  .filter((item): item is LocalTitle => Boolean(item));

export const LocalBrowse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { actions: userActions } = useManageUserSlice();
  const [active, setActive] = useState<LocalTitle | null>(null);
  const [openSeries, setOpenSeries] = useState<LocalSeriesTitle | null>(null);
  const [slide, setSlide] = useState(0);
  const seriesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (covers.length < 2) return;
    const timer = window.setInterval(() => {
      setSlide(current => (current + 1) % covers.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const state = location.state as {
      playId?: string;
      openSeriesId?: string;
    } | null;
    if (state?.playId) {
      const title = findLocalTitle(state.playId);
      if (title) setActive(title);
    }
    if (state?.openSeriesId) {
      const series = localSeries.find(item => item.id === state.openSeriesId);
      if (series) {
        setOpenSeries(series);
        window.setTimeout(() => {
          seriesRef.current?.scrollIntoView({ block: 'start' });
        }, 50);
      }
    }
  }, [location.state]);

  const askToSubscribe = () => {
    setActive(null);
    dispatch(userActions.setSettingsTabVal(4));
    navigate(RoutePath.settings.path);
  };

  return (
    <Page>
      <Hero>
        {covers.map((item, index) => (
          <Slide key={item.id} $active={index === slide}>
            <picture>
              <source media="(max-width: 899px)" srcSet={item.poster} />
              <Billboard
                src={item.backdrop || item.poster}
                alt={item.name}
                $focus={item.backdropFocus || 'center 30%'}
              />
            </picture>
            <Shade />
            <HeroCopy>
              {!item.backdrop && <HeroTitle>{item.name}</HeroTitle>}
              <HeroMeta>
                {[item.year, item.language, item.lengthLabel]
                  .filter(Boolean)
                  .join('  •  ')}
              </HeroMeta>
              <HeroText>{item.description}</HeroText>
              <PlayButton type="button" onClick={() => setActive(item)}>
                <Triangle />
                Watch demo
              </PlayButton>
            </HeroCopy>
          </Slide>
        ))}
        <Dots>
          {covers.map((item, index) => (
            <Dot
              key={item.id}
              type="button"
              $on={index === slide}
              aria-label={item.name}
              onClick={() => setSlide(index)}
            />
          ))}
        </Dots>
      </Hero>

      <Rails>
        <Section ref={seriesRef}>
          <SectionTitle>Web series</SectionTitle>
          <Row>
            {localSeries.map(item => (
              <Card
                key={item.id}
                type="button"
                onClick={() =>
                  setOpenSeries(current =>
                    current?.id === item.id ? null : item,
                  )
                }
              >
                <Frame
                  className="poster-frame"
                  $selected={openSeries?.id === item.id}
                >
                  <Poster
                    src={item.poster}
                    alt=""
                    onError={event => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                  <PlayMark aria-hidden>
                    <Triangle />
                  </PlayMark>
                </Frame>
                <CardName>{item.name}</CardName>
              </Card>
            ))}
          </Row>
          {openSeries && (
            <SeriesPanel
              key={openSeries.id}
              series={openSeries}
              onClose={() => setOpenSeries(null)}
              onPlay={setActive}
              onSubscribe={askToSubscribe}
            />
          )}
        </Section>
        <Shelf title="Movies" items={localMovies} onOpen={setActive} />
        <Upcoming />
      </Rails>

      <Footer />

      {active && (
        <DemoModal
          title={active}
          onClose={() => setActive(null)}
          onSubscribe={askToSubscribe}
        />
      )}
    </Page>
  );
};

const PlayMark = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(186, 186, 182, 0.92);
  color: #111;
  pointer-events: none;
`;

const Shelf = ({
  title,
  items,
  onOpen,
}: {
  title: string;
  items: LocalTitle[];
  onOpen: (title: LocalTitle) => void;
}) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <Row>
      {items.map(item => (
        <Card key={item.id} type="button" onClick={() => onOpen(item)}>
          <Frame className="poster-frame" $selected={false}>
            <Poster
              src={item.poster}
              alt=""
              onError={event => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <PlayMark aria-hidden>
              <Triangle />
            </PlayMark>
          </Frame>
          <CardName>{item.name}</CardName>
        </Card>
      ))}
    </Row>
  </Section>
);

const Upcoming = () => (
  <Section>
    <SectionTitle>Upcoming</SectionTitle>
    <Row>
      {localUpcoming.map(item => (
        <QuietCard key={item.id}>
          <Frame>
            <Poster src={item.poster} alt="" />
          </Frame>
          <CardName>{item.name}</CardName>
        </QuietCard>
      ))}
    </Row>
  </Section>
);

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #090909;
  color: #f6f3ee;
  font-family: Urbanist, 'Avenir Next', system-ui, sans-serif;
`;

// Desktop: the frame matches the wide art (1376x768) so nothing is cropped.
const Hero = styled.section`
  position: relative;
  width: 100%;
  aspect-ratio: 1376 / 768;
  overflow: hidden;
  background: #090909;
  @media (max-width: 899px) {
    aspect-ratio: auto;
  }
`;

const Slide = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${props => (props.$active ? 1 : 0)};
  transition: opacity 0.45s ease;
  pointer-events: ${props => (props.$active ? 'auto' : 'none')};
  @media (max-width: 899px) {
    position: ${props => (props.$active ? 'relative' : 'absolute')};
    padding-bottom: 48px;
  }
`;

const Billboard = styled.img<{ $focus: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${props => props.$focus};
  @media (max-width: 899px) {
    position: static;
    display: block;
    height: auto;
  }
`;

// Dark only at the far left (behind the text) and the very top/bottom edges,
// so the title art in the centre stays clear.
const Shade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      90deg,
      rgba(9, 9, 9, 0.8) 0%,
      rgba(9, 9, 9, 0.35) 22%,
      rgba(9, 9, 9, 0) 36%
    ),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 14%,
      rgba(0, 0, 0, 0) 94%,
      #090909 100%
    );
  pointer-events: none;
  @media (max-width: 899px) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 14%
    );
  }
`;

const HeroCopy = styled.div`
  position: absolute;
  z-index: 2;
  left: 4vw;
  bottom: 14%;
  max-width: min(400px, 28vw);
  @media (max-width: 899px) {
    position: static;
    padding: 20px 20px 0;
    max-width: none;
    text-align: left;
  }
`;

const HeroTitle = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(36px, 5vw, 68px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const HeroMeta = styled.div`
  margin-bottom: 14px;
  font-size: 15px;
  color: rgba(246, 243, 238, 0.75);
  white-space: pre;
`;

const HeroText = styled.p`
  margin: 0 0 24px;
  font-size: 17px;
  line-height: 1.5;
  color: rgba(246, 243, 238, 0.88);
`;

const PlayButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 4px;
  padding: 13px 18px;
  background: #f4f1ea;
  color: #121212;
  font-weight: 650;
  letter-spacing: -0.01em;
  cursor: pointer;
`;

const Dots = styled.div`
  position: absolute;
  right: 4vw;
  bottom: 22px;
  display: flex;
  gap: 8px;
  z-index: 2;
  @media (max-width: 899px) {
    right: auto;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
  }
`;

const Dot = styled.button<{ $on: boolean }>`
  width: ${props => (props.$on ? '22px' : '8px')};
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 99px;
  background: ${props => (props.$on ? '#f4f1ea' : 'rgba(255, 255, 255, 0.45)')};
  cursor: pointer;
`;

const Triangle = styled.span`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 0 6px 10px;
  border-color: transparent transparent transparent currentColor;
`;

const Rails = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 0 0 48px;
`;

const Section = styled.section`
  padding: 8px 40px 6px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  overflow-x: auto;
  margin: 0 -8px;
  padding: 10px 8px 8px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.button`
  flex: 0 0 46%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  @media (min-width: 1100px) {
    flex-basis: calc((100% - 50px) / 6);
  }
  &:hover .poster-frame {
    transform: translateY(-4px);
  }
`;

const Frame = styled.span<{ $selected?: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 6px;
  overflow: hidden;
  background: #161616;
  outline: ${props =>
    props.$selected ? '2px solid #e7c56a' : '2px solid transparent'};
  outline-offset: 2px;
  transition: transform 0.2s ease;
`;

const Poster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardName = styled.strong`
  display: block;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuietCard = styled.div`
  flex: 0 0 46%;
  color: inherit;
  text-align: left;
  @media (min-width: 1100px) {
    flex-basis: calc((100% - 50px) / 6);
  }
`;
