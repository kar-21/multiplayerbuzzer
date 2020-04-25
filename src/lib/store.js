import { ActivePlayers } from 'boardgame.io/core';

function resetBuzzers(G) {
  G.queue = {};
}

function toggleLock(G) {
  G.locked = !G.locked;
}

function buzz(G, ctx, id) {
  const newQueue = {
    ...G.queue,
  };
  if (!newQueue[id]) {
    // buzz on server will overwrite the client provided timestamp
    newQueue[id] = { id, timestamp: new Date().getTime() };
  }
  G.queue = newQueue;
}

export const Buzzer = {
  name: 'buzzer',
  minPlayers: 2,
  maxPlayers: 100,
  setup: () => ({ queue: {}, locked: false }),
  phases: {
    play: {
      start: true,
      moves: { buzz, resetBuzzers, toggleLock },
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
    },
  },
};
