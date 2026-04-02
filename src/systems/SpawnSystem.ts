import { Ball, type BallRarity } from '../entities/Ball';

const RARITY_WEIGHTS: ReadonlyArray<{ rarity: BallRarity; weight: number }> = [
  { rarity: 'common', weight: 60 },
  { rarity: 'rare', weight: 25 },
  { rarity: 'epic', weight: 10 },
  { rarity: 'legendary', weight: 4 },
  { rarity: 'mythical', weight: 1 },
];

export class SpawnSystem {
  spawnBall(): Ball {
    const rarity = this.getWeightedRarity();
    return new Ball(crypto.randomUUID(), 400, 300, 10, 180, 0, rarity);
  }

  private getWeightedRarity(): BallRarity {
    const roll = Math.random() * 100;
    let cumulativeWeight = 0;

    for (const { rarity, weight } of RARITY_WEIGHTS) {
      cumulativeWeight += weight;
      if (roll < cumulativeWeight) {
        return rarity;
      }
    }

    return 'common';
  }
}
