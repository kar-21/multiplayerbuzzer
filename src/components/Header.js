import React from 'react';
import { Navbar } from 'react-bootstrap';
import { isNil } from 'lodash';
import { useHistory } from 'react-router';
import { leaveRoom } from '../lib/endpoints';

function Logo({ size = 25 }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M0 0 C5.94 0 11.88 0 18 0 C18.04125 1.7325 18.0825 3.465 18.125 5.25 C18.61197175 11.55815718 20.6666075 16.12224686 23.72265625 21.6015625 C25 24 25 24 25 26 C26.32 26 27.64 26 29 26 C29 28.64 29 31.28 29 34 C15.8 34 2.6 34 -11 34 C-11 31.36 -11 28.72 -11 26 C-9.68 26 -8.36 26 -7 26 C-6.7525 25.175 -6.505 24.35 -6.25 23.5 C-5.2844984 20.79659552 -4.33995577 18.81272313 -2.9375 16.375 C-0.19742191 11.13931175 -0.26480232 5.82565109 0 0 Z "
        fill="#000000"
        transform="translate(23,15)"
      />
      <path
        d="M0 0 C5.28 0 10.56 0 16 0 C22 10.75 22 10.75 22 13 C12.76 13 3.52 13 -6 13 C-4.19618103 8.49045257 -2.19657375 4.31992837 0 0 Z "
        fill="#D42F49"
        transform="translate(24,29)"
      />
      <path
        d="M0 0 C3.96 0 7.92 0 12 0 C12 2.64 12 5.28 12 8 C8.04 8 4.08 8 0 8 C0 5.36 0 2.72 0 0 Z "
        fill="#E7EEF9"
        transform="translate(26,18)"
      />
      <path
        d="M0 0 C1.875 0.3125 1.875 0.3125 4 1 C6.68506672 5.02760008 6.5633716 8.27109293 6 13 C4.6875 15.5625 4.6875 15.5625 3 17 C2.01 17 1.02 17 0 17 C0.144375 16.484375 0.28875 15.96875 0.4375 15.4375 C1.16581703 12.28145952 1.70649399 9.22856615 2 6 C1.34 5.01 0.68 4.02 0 3 C0 2.01 0 1.02 0 0 Z "
        fill="#000000"
        transform="translate(53,22)"
      />
      <path
        d="M0 0 C-0.2165625 0.7734375 -0.2165625 0.7734375 -0.4375 1.5625 C-1.16581703 4.71854048 -1.70649399 7.77143385 -2 11 C-1.01 12.485 -1.01 12.485 0 14 C0 14.99 0 15.98 0 17 C-1.875 16.6875 -1.875 16.6875 -4 16 C-6.68506672 11.97239992 -6.5633716 8.72890707 -6 4 C-4.2375464 0.55901916 -3.93090471 0 0 0 Z "
        fill="#000000"
        transform="translate(11,22)"
      />
      <path
        d="M0 0 C0.99 0.33 1.98 0.66 3 1 C4.25 7.625 4.25 7.625 2 11 C1.01 10.67 0.02 10.34 -1 10 C-0.835 9.0925 -0.67 8.185 -0.5 7.25 C0.10137146 3.88912497 0.10137146 3.88912497 0 0 Z "
        fill="#000000"
        transform="translate(50,25)"
      />
      <path
        d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.835 1.9075 2.67 2.815 2.5 3.75 C1.89862854 7.11087503 1.89862854 7.11087503 2 11 C1.01 10.67 0.02 10.34 -1 10 C-2.25 3.375 -2.25 3.375 0 0 Z "
        fill="#000000"
        transform="translate(12,25)"
      />
    </svg>
  );
}

export default function Header({
  auth = {},
  clearAuth,
  sound = null,
  setSound,
}) {
  const history = useHistory();

  // leave current game
  async function leave() {
    try {
      await leaveRoom(auth.roomID, auth.playerID, auth.credentials);
      clearAuth();
      history.push('/');
    } catch (error) {
      console.log('leave error', error);
      clearAuth();
      history.push('/');
    }
  }

  return (
    <header>
      <Navbar>
        <Navbar.Brand>
          <Logo />
          Multiplayerbuzzer
        </Navbar.Brand>
        <div className="nav-buttons">
          {!isNil(sound) ? (
            <button className="text-button" onClick={() => setSound()}>
              {sound ? 'Turn off sound' : 'Turn on sound'}
            </button>
          ) : null}
          {clearAuth ? (
            <button className="text-button" onClick={() => leave()}>
              Leave game
            </button>
          ) : null}
        </div>
      </Navbar>
    </header>
  );
}
