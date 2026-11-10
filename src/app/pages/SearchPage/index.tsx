import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { RoutePath } from 'app/RoutePath';
import {
  LocalSearchHit,
  searchLocalCatalog,
} from 'app/data/localCatalog';

type Filter = 'all' | LocalSearchHit['kind'];

const sections: { kind: LocalSearchHit['kind']; title: string }[] = [
  { kind: 'series', title: 'Web series' },
  { kind: 'movie', title: 'Movies' },
  { kind: 'upcoming', title: 'Coming soon' },
];

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'series', label: 'Series' },
  { id: 'movie', label: 'Movies' },
  { id: 'upcoming', label: 'Coming soon' },
];

const suggestions = ['Bro Code', 'Aara', 'Menaka', 'Malayalam', 'Metro'];

const SearchPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [filter, setFilter] = useState<Filter>('all');
  const results = useMemo(() => searchLocalCatalog(query), [query]);
  const trimmed = query.trim();

  // Keep the query in the address bar so Back and refresh keep the search.
  useEffect(() => {
    const next: Record<string, string> = trimmed ? { q: trimmed } : {};
    setParams(next, { replace: true });
  }, [trimmed, setParams]);

  const counts = useMemo(() => {
    const total: Record<Filter, number> = {
      all: results.length,
      series: 0,
      movie: 0,
      upcoming: 0,
    };
    results.forEach(hit => {
      total[hit.kind] += 1;
    });
    return total;
  }, [results]);

  // If the chosen filter has nothing for the new query, fall back to All.
  useEffect(() => {
    if (filter !== 'all' && counts[filter] === 0) setFilter('all');
  }, [filter, counts]);

  const visible = sections.filter(
    section =>
      (filter === 'all' || filter === section.kind) && counts[section.kind] > 0,
  );

  const openHit = (hit: LocalSearchHit) => {
    if (hit.kind === 'movie') {
      navigate(RoutePath.homepage.path, { state: { playId: hit.id } });
      return;
    }
    if (hit.kind === 'series') {
      navigate(RoutePath.homepage.path, { state: { openSeriesId: hit.id } });
    }
  };

  return (
    <Page>
      <Top>
        <Heading>{trimmed ? 'Search results' : 'Search'}</Heading>
        <Bar>
          <Icon viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </Icon>
          <Field
            autoFocus
            type="search"
            value={query}
            placeholder="Search for a movie, series, episode or language"
            aria-label="Search movies and series"
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Escape') setQuery('');
            }}
          />
          {query && (
            <Clear
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
            >
              ×
            </Clear>
          )}
        </Bar>
        <Chips role="tablist" aria-label="Filter results">
          {filters.map(item => (
            <Chip
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              $active={filter === item.id}
              disabled={item.id !== 'all' && counts[item.id] === 0}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <Count>{counts[item.id]}</Count>
            </Chip>
          ))}
        </Chips>
      </Top>

      {results.length === 0 || visible.length === 0 ? (
        <Empty>
          <h2>No results for “{trimmed}”</h2>
          <p>
            Check the spelling, or search for a title, an episode name or a
            language. Try one of these:
          </p>
          <Chips>
            {suggestions.map(word => (
              <Chip
                key={word}
                type="button"
                $active={false}
                onClick={() => {
                  setFilter('all');
                  setQuery(word);
                }}
              >
                {word}
              </Chip>
            ))}
          </Chips>
        </Empty>
      ) : (
        visible.map(section => (
          <Section key={section.kind}>
            <SectionHead>
              <h2>{section.title}</h2>
              <span>
                {counts[section.kind]}{' '}
                {counts[section.kind] === 1 ? 'title' : 'titles'}
              </span>
            </SectionHead>
            <Grid>
              {results
                .filter(hit => hit.kind === section.kind)
                .map(hit => {
                  const soon = hit.kind === 'upcoming';
                  return (
                    <Card
                      key={`${hit.kind}-${hit.id}`}
                      type="button"
                      disabled={soon}
                      onClick={() => openHit(hit)}
                      aria-label={`${hit.name}, ${hit.detail}`}
                    >
                      <Frame $muted={soon}>
                        <img src={hit.poster} alt="" loading="lazy" />
                        <Badge $soon={soon}>
                          {soon
                            ? 'Coming soon'
                            : hit.kind === 'series'
                            ? 'Series'
                            : 'Movie'}
                        </Badge>
                        {!soon && (
                          <PlayHint aria-hidden="true">
                            <span />
                          </PlayHint>
                        )}
                      </Frame>
                      <Name>{hit.name}</Name>
                      <Meta>
                        {[hit.language, soon ? '' : hit.detail]
                          .filter(Boolean)
                          .join(' · ') || 'Coming to Natya'}
                      </Meta>
                      {hit.matchedEpisode && (
                        <Matched>Matches {hit.matchedEpisode}</Matched>
                      )}
                    </Card>
                  );
                })}
            </Grid>
          </Section>
        ))
      )}
    </Page>
  );
};

const Page = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  padding: 110px 4vw 64px;
  box-sizing: border-box;
  background: #090909;
  color: #f6f3ee;
  text-align: left;
  @media (max-width: 640px) {
    padding-top: 96px;
  }
`;

const Top = styled.div`
  max-width: 760px;
`;

const Heading = styled.h1`
  margin: 0 0 16px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 500;
  color: #e7c56a;
`;

const Bar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.svg`
  position: absolute;
  left: 18px;
  width: 20px;
  height: 20px;
  fill: none;
  stroke: rgba(246, 243, 238, 0.55);
  stroke-width: 2;
  stroke-linecap: round;
  pointer-events: none;
`;

const Field = styled.input`
  flex: 1;
  height: 56px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 0 52px 0 50px;
  background: #171717;
  color: #f6f3ee;
  font-size: 16px;
  outline: none;
  transition: border-color 0.15s ease, background 0.15s ease;
  &::placeholder {
    color: rgba(246, 243, 238, 0.45);
  }
  &:focus {
    border-color: #e7c56a;
    background: #1c1c1c;
  }
  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const Clear = styled.button`
  position: absolute;
  right: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #f6f3ee;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid
    ${props => (props.$active ? '#e7c56a' : 'rgba(255, 255, 255, 0.16)')};
  border-radius: 999px;
  padding: 8px 14px;
  background: ${props => (props.$active ? '#e7c56a' : 'transparent')};
  color: ${props => (props.$active ? '#1a1408' : '#ece7de')};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover:not(:disabled) {
    border-color: #e7c56a;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const Count = styled.span`
  font-weight: 500;
  opacity: 0.7;
`;

const Section = styled.section`
  margin-top: 40px;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  span {
    color: rgba(246, 243, 238, 0.5);
    font-size: 13px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 24px 16px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 12px;
  }
`;

const PlayHint = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.2s ease;
  span {
    width: 0;
    height: 0;
    margin-left: 4px;
    border-style: solid;
    border-width: 14px 0 14px 22px;
    border-color: transparent transparent transparent #f6f3ee;
  }
`;

const Frame = styled.span<{ $muted: boolean }>`
  position: relative;
  display: block;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  overflow: hidden;
  background: #161616;
  outline: 2px solid transparent;
  transition: transform 0.2s ease, outline-color 0.2s ease;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${props => (props.$muted ? 'saturate(0.6) brightness(0.8)' : 'none')};
  }
`;

const Badge = styled.span<{ $soon: boolean }>`
  position: absolute;
  top: 8px;
  left: 8px;
  border-radius: 3px;
  padding: 3px 7px;
  background: ${props => (props.$soon ? '#e7c56a' : 'rgba(0, 0, 0, 0.7)')};
  color: ${props => (props.$soon ? '#1a1408' : '#f6f3ee')};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Card = styled.button`
  align-self: start;
  display: block;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  &:hover:not(:disabled) ${Frame}, &:focus-visible ${Frame} {
    transform: translateY(-4px);
    outline-color: #e7c56a;
  }
  &:hover:not(:disabled) ${PlayHint}, &:focus-visible ${PlayHint} {
    opacity: 1;
  }
  &:focus-visible {
    outline: none;
  }
  &:disabled {
    cursor: default;
  }
`;

const Name = styled.strong`
  display: block;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.span`
  display: block;
  margin-top: 3px;
  color: rgba(246, 243, 238, 0.6);
  font-size: 12px;
`;

const Matched = styled.span`
  display: block;
  margin-top: 4px;
  color: #e7c56a;
  font-size: 12px;
`;

const Empty = styled.div`
  margin-top: 48px;
  max-width: 560px;
  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }
  p {
    margin: 8px 0 0;
    color: rgba(246, 243, 238, 0.7);
    line-height: 1.5;
  }
`;

export default SearchPage;
