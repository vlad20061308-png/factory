import { Ball, type BallRarity } from '../entities/Ball';

const BALL_RARITIES: readonly BallRarity[] = [
  'common',
  'rare',
  'epic',
  'legendary',
  'mythical',
];

export class SpawnSystem {
  spawnBall(): Ball {
    const rarity =
      BALL_RARITIES[Math.floor(Math.random() * BALL_RARITIES.length)];

    return new Ball(crypto.randomUUID(), 400, 300, 10, 180, 0, rarity);
  }
}
