export type LocalTitle = {
  id: string;
  kind: 'movie' | 'series';
  name: string;
  description: string;
  year: string;
  language: string;
  lengthLabel: string;
  poster: string;
  // Optional wide (16:9) image for the home page cover. Falls back to poster.
  backdrop?: string;
  // CSS object-position for the cover, e.g. 'center 30%'.
  backdropFocus?: string;
  preview: string;
  previewSeconds: number;
  frameWidth: number;
  frameHeight: number;
};

export type LocalEpisode = {
  id: string;
  number: number;
  name: string;
  description: string;
  image: string;
  preview?: string;
  previewSeconds?: number;
  frameWidth?: number;
  frameHeight?: number;
};

export type LocalSeriesTitle = {
  id: string;
  name: string;
  description: string;
  year: string;
  language: string;
  poster: string;
  episodes: LocalEpisode[];
};

// Movie files live in public/previews and public/posters.
// A series has one demo file, at public/previews/<series-id>.mp4.
// The other episodes are stills only.
export const localCatalog: LocalTitle[] = [
  {
    id: 'aara',
    kind: 'movie',
    name: 'Aara',
    description: 'A two-minute look at the film.',
    year: '',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/aara.jpg',
    backdrop: '/posters/aara-wide.jpg',
    backdropFocus: 'center center',
    preview: '/previews/aara.mp4',
    previewSeconds: 120,
    frameWidth: 1920,
    frameHeight: 1080,
  },
  {
    id: 'chuzhal',
    kind: 'movie',
    name: 'Chuzhal',
    description: 'A two-minute look at the film, shown in its wide frame.',
    year: '',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/chuzhal.jpg',
    preview: '/previews/chuzhal.mp4',
    previewSeconds: 122,
    frameWidth: 1918,
    frameHeight: 804,
  },
  {
    id: 'unmadam',
    kind: 'movie',
    name: 'Unmadam',
    description: 'A two-minute look at the film.',
    year: '',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/unmadam.jpg',
    backdrop: '/posters/unmadam-wide.jpg',
    backdropFocus: 'center center',
    preview: '/previews/unmadam.mp4',
    previewSeconds: 120,
    frameWidth: 1920,
    frameHeight: 1080,
  },
  {
    id: 'thoovanathumbikal',
    kind: 'movie',
    name: 'Thoovanathumbikal',
    description: 'A two-minute look at the 1987 Malayalam film.',
    year: '1987',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/thoovanathumbikal.jpg',
    preview: '/previews/thoovanathumbikal.mp4',
    previewSeconds: 122,
    frameWidth: 1920,
    frameHeight: 1080,
  },
  {
    id: 'oru-cbi-diary-kurippu',
    kind: 'movie',
    name: 'Oru CBI Diary Kurippu',
    description: 'A two-minute look at the 1988 Malayalam film.',
    year: '1988',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/oru-cbi-diary-kurippu.jpg',
    preview: '/previews/oru-cbi-diary-kurippu.mp4',
    previewSeconds: 122,
    frameWidth: 1920,
    frameHeight: 1080,
  },
  {
    id: 'sabhash-chandrabose',
    kind: 'movie',
    name: 'Sabhash Chandrabose',
    description: 'A two-minute look at the film.',
    year: '',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/sabhash-chandrabose.jpg',
    preview: '/previews/sabhash-chandrabose.mp4',
    previewSeconds: 122,
    frameWidth: 1920,
    frameHeight: 1080,
  },
  {
    id: 'who',
    kind: 'movie',
    name: 'WHO',
    description: 'A short look at the film, just over two minutes.',
    year: '',
    language: '',
    lengthLabel: '2 min demo',
    poster: '/posters/who.jpg',
    preview: '/previews/who.mp4',
    previewSeconds: 147,
    frameWidth: 1920,
    frameHeight: 1080,
  },
  {
    id: 'kadha-paranja-kadha',
    kind: 'movie',
    name: 'Kadha Paranja Kadha',
    description: 'A two-minute look at the film.',
    year: '',
    language: 'Malayalam',
    lengthLabel: '2 min demo',
    poster: '/posters/kadha-paranja-kadha.jpg',
    preview: '/previews/kadha-paranja-kadha.mp4',
    previewSeconds: 122,
    frameWidth: 1920,
    frameHeight: 1080,
  },
];

const episode = (
  seriesId: string,
  _poster: string,
  number: number,
  name: string,
  description: string,
  demo = false,
): LocalEpisode => ({
  id: `${seriesId}-ep${number}`,
  number,
  name,
  description,
  image: `/posters/series/${seriesId}-ep${number}.jpg`,
  ...(demo
    ? {
        preview: `/previews/${seriesId}.mp4`,
        previewSeconds: 120,
        frameWidth: 1920,
        frameHeight: 1080,
      }
    : {}),
});

export const localSeries: LocalSeriesTitle[] = [
  {
    id: 'bro-code',
    name: 'Bro Code',
    description: 'A group of friends and the rule they agreed not to break.',
    year: '',
    language: 'English',
    poster: '/posters/series/bro-code.jpg',
    episodes: [
      episode('bro-code', '/posters/series/bro-code.jpg', 1, 'The Pact', 'The rule gets said out loud.'),
      episode('bro-code', '/posters/series/bro-code.jpg', 2, 'After Hours', 'The night runs later than planned.', true),
      episode('bro-code', '/posters/series/bro-code.jpg', 3, 'House Rules', 'Someone asks what the rule is for.'),
      episode('bro-code', '/posters/series/bro-code.jpg', 4, 'Last Round', 'The group has to choose.'),
    ],
  },
  {
    id: 'the-unmemorable-one',
    name: 'The Unmemorable One',
    description: 'People keep meeting someone they cannot quite place.',
    year: '',
    language: 'English',
    poster: '/posters/series/the-unmemorable-one.jpg',
    episodes: [
      episode(
        'the-unmemorable-one',
        '/posters/series/the-unmemorable-one.jpg',
        1,
        'A Face',
        'A stranger feels familiar.',
      ),
      episode(
        'the-unmemorable-one',
        '/posters/series/the-unmemorable-one.jpg',
        2,
        'The Gap',
        'A stretch of time nobody can account for.',
        true,
      ),
      episode(
        'the-unmemorable-one',
        '/posters/series/the-unmemorable-one.jpg',
        3,
        'Someone Else',
        'The same person, told a different way.',
      ),
    ],
  },
  {
    id: 'gangs-of-gregory',
    name: 'Gangs of Gregory',
    description: 'A neighborhood crew, and what it costs to stay in it.',
    year: '',
    language: 'English',
    poster: '/posters/series/gangs-of-gregory.jpg',
    episodes: [
      episode(
        'gangs-of-gregory',
        '/posters/series/gangs-of-gregory.jpg',
        1,
        'The Block',
        'Gregory, and the people who run it.',
      ),
      episode(
        'gangs-of-gregory',
        '/posters/series/gangs-of-gregory.jpg',
        2,
        'New Blood',
        'A new face asks for a place.',
        true,
      ),
      episode(
        'gangs-of-gregory',
        '/posters/series/gangs-of-gregory.jpg',
        3,
        'The Sit-Down',
        'The crew meets to settle a debt.',
      ),
    ],
  },
  {
    id: 'uxoricide',
    name: 'Uxoricide',
    description: 'A marriage, then a case that will not stay in the house.',
    year: '',
    language: 'English',
    poster: '/posters/series/uxoricide.jpg',
    episodes: [
      episode(
        'uxoricide',
        '/posters/series/uxoricide.jpg',
        1,
        'The House',
        'The rooms before anyone arrives.',
      ),
      episode(
        'uxoricide',
        '/posters/series/uxoricide.jpg',
        2,
        'Tuesday',
        'An ordinary day that is not.',
        true,
      ),
      episode(
        'uxoricide',
        '/posters/series/uxoricide.jpg',
        3,
        'The Statement',
        'What gets written down.',
      ),
      episode(
        'uxoricide',
        '/posters/series/uxoricide.jpg',
        4,
        'What Remains',
        'The house after the questions.',
      ),
    ],
  },
  {
    id: 'bread-butter',
    name: 'Bread and Butter',
    description: 'A small kitchen, and the people who keep it open.',
    year: '',
    language: 'English',
    poster: '/posters/series/bread-butter.jpg',
    episodes: [
      episode(
        'bread-butter',
        '/posters/series/bread-butter.jpg',
        1,
        'Morning Shift',
        'The ovens come on.',
        true,
      ),
      episode(
        'bread-butter',
        '/posters/series/bread-butter.jpg',
        2,
        'The Order',
        'A regular asks for more than bread.',
      ),
      episode(
        'bread-butter',
        '/posters/series/bread-butter.jpg',
        3,
        'Short',
        'The day runs out of something.',
      ),
      episode(
        'bread-butter',
        '/posters/series/bread-butter.jpg',
        4,
        'Closing',
        'The lights go down on the counter.',
      ),
    ],
  },
  {
    id: 'menaka',
    name: 'Menaka',
    description: 'A performer, and the life that happens off the stage.',
    year: '',
    language: 'English',
    poster: '/posters/series/menaka.jpg',
    episodes: [
      episode(
        'menaka',
        '/posters/series/menaka.jpg',
        1,
        'The Glance',
        'Menaka sees who is watching.',
      ),
      episode(
        'menaka',
        '/posters/series/menaka.jpg',
        2,
        'Rehearsal',
        'The same scene, again.',
        true,
      ),
      episode(
        'menaka',
        '/posters/series/menaka.jpg',
        3,
        'Opening Night',
        'The curtain goes up.',
      ),
    ],
  },
];

// Kept in localCatalog, left off the browse UI until they should show again.
const hiddenMovieIds = new Set([
  'thoovanathumbikal',
  'oru-cbi-diary-kurippu',
  'sabhash-chandrabose',
  'who',
  'kadha-paranja-kadha',
]);

export const localMovies = localCatalog.filter(
  item => item.kind === 'movie' && !hiddenMovieIds.has(item.id),
);

export const localUpcoming = [
  {
    id: 'metro',
    name: 'Metro',
    poster: '/posters/metro.jpg',
  },
  {
    id: 'team-17',
    name: 'Team 17',
    poster: '/posters/team-17.jpg',
  },
  {
    id: 'malayam',
    name: 'Malayam',
    poster: '/posters/malayam.jpg',
  },
  {
    id: 'ullas-lokam',
    name: 'Ullas Lokam',
    poster: '/posters/ullas-lokam.jpg',
  },
  {
    id: 'marks-of-chakram',
    name: 'Marks of Chakram',
    poster: '/posters/marks-of-chakram.jpg',
  },
];

export const findLocalTitle = (id?: string) =>
  localCatalog.find(item => item.id === id);

export type LocalSearchHit = {
  id: string;
  kind: 'movie' | 'series' | 'upcoming';
  name: string;
  poster: string;
  language: string;
  // Short line under the title, e.g. "4 episodes" or "2 min demo".
  detail: string;
  // Set when the query matched an episode name rather than the title.
  matchedEpisode?: string;
};

const words = (value: string) =>
  value
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

// Every word of the query must start one of the words in the text.
// "gang" finds "Gangs of Gregory"; "the" does not find "Brother".
const matches = (needle: string[], text: string) => {
  if (needle.length === 0) return true;
  const haystack = words(text);
  return needle.every(part => haystack.some(word => word.startsWith(part)));
};

// Lower is better: title matches come before language or episode matches.
const rank = (needle: string[], name: string) => {
  if (needle.length === 0) return 0;
  const title = name.toLowerCase();
  const query = needle.join(' ');
  if (title === query) return 0;
  if (title.startsWith(query)) return 1;
  if (matches(needle, name)) return 2;
  return 3;
};

export const searchLocalCatalog = (query: string): LocalSearchHit[] => {
  const needle = words(query);
  const hits: (LocalSearchHit & { score: number })[] = [];

  localSeries.forEach(item => {
    const titleHit = matches(needle, `${item.name} ${item.language}`);
    const episodeHit = titleHit
      ? undefined
      : item.episodes.find(ep => matches(needle, ep.name));
    if (!titleHit && !episodeHit) return;
    hits.push({
      id: item.id,
      kind: 'series',
      name: item.name,
      poster: item.poster,
      language: item.language,
      detail: `${item.episodes.length} episodes`,
      matchedEpisode: episodeHit
        ? `Episode ${episodeHit.number} · ${episodeHit.name}`
        : undefined,
      score: rank(needle, item.name),
    });
  });

  localMovies.forEach(item => {
    if (!matches(needle, `${item.name} ${item.language}`)) return;
    hits.push({
      id: item.id,
      kind: 'movie',
      name: item.name,
      poster: item.poster,
      language: item.language,
      detail: item.lengthLabel,
      score: rank(needle, item.name),
    });
  });

  localUpcoming.forEach(item => {
    if (!matches(needle, item.name)) return;
    hits.push({
      id: item.id,
      kind: 'upcoming',
      name: item.name,
      poster: item.poster,
      language: '',
      detail: 'Coming soon',
      score: rank(needle, item.name),
    });
  });

  return hits
    .sort((x, y) => x.score - y.score)
    .map(({ score, ...hit }) => hit);
};

export const episodeAsTitle = (
  series: LocalSeriesTitle,
  episodeItem: LocalEpisode,
): LocalTitle => ({
  id: episodeItem.id,
  kind: 'series',
  name: `${series.name} · ${episodeItem.name}`,
  description: episodeItem.description,
  year: series.year,
  language: series.language,
  lengthLabel: `Episode ${episodeItem.number} demo`,
  poster: episodeItem.image,
  preview: episodeItem.preview || '',
  previewSeconds: episodeItem.previewSeconds || 120,
  frameWidth: episodeItem.frameWidth || 1920,
  frameHeight: episodeItem.frameHeight || 1080,
});
