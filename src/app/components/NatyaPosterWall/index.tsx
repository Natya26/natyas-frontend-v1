import React from 'react';
import styled from 'styled-components';
import chuzhal from './posters/chuzhal.jpg';
import kadhaParanjaKadha from './posters/kadha-paranja-kadha.jpg';
import metro from './posters/metro.jpg';
import oruCbiDiaryKurippu from './posters/oru-cbi-diary-kurippu.jpg';
import sabhashChandrabose from './posters/sabhash-chandrabose.jpg';
import team17 from './posters/team-17.jpg';
import thoovanathumbikal from './posters/thoovanathumbikal.jpg';
import ullasLokam from './posters/ullas-lokam.jpg';
import unmadam from './posters/unmadam.jpg';
import who from './posters/who.jpg';

export const natyaPosters = {
  chuzhal,
  kadhaParanjaKadha,
  metro,
  oruCbiDiaryKurippu,
  sabhashChandrabose,
  team17,
  thoovanathumbikal,
  ullasLokam,
  unmadam,
  who,
};

const posterList = Object.values(natyaPosters);

type Props = {
  className?: string;
  /** Number of poster columns on wide screens. */
  columns?: number;
};

/**
 * A dimmed wall of Natya title posters, used as a decorative background
 * behind content. Fills its nearest positioned ancestor.
 */
export const NatyaPosterWall = ({ className, columns = 5 }: Props) => {
  // Only show complete rows so the wall never ends in a half-empty row.
  const desktopCount = fullRows(posterList.length, columns);
  const mobileColumns = Math.min(columns, 3);
  return (
    <Wall
      className={className}
      $columns={columns}
      $mobileColumns={mobileColumns}
      $mobileCount={fullRows(desktopCount, mobileColumns)}
      aria-hidden="true"
    >
      {posterList.slice(0, desktopCount).map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading={i < columns ? 'eager' : 'lazy'}
        />
      ))}
    </Wall>
  );
};

const fullRows = (count: number, columns: number) =>
  Math.max(columns, count - (count % columns));

const Wall = styled.div<{
  $columns: number;
  $mobileColumns: number;
  $mobileCount: number;
}>`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(${p => p.$columns}, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;
  padding: 10px;
  overflow: hidden;
  background: #000000;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    min-height: 0;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid rgba(224, 190, 0, 0.45);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.82) 0%,
      rgba(0, 0, 0, 0.7) 45%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(${p => p.$mobileColumns}, 1fr);
    img:nth-child(n + ${p => p.$mobileCount + 1}) {
      display: none;
    }
  }
`;
