import { CanvasRenderer } from '../render/CanvasRenderer';
import { GameState } from '../state/GameState';
import { MovementSystem } from '../systems/MovementSystem';
import { SpawnSystem } from '../systems/SpawnSystem';
import type { BallRarity } from '../entities/Ball';

const INITIAL_SPAWN_INTERVAL_MS = 2000;
const MIN_SPAWN_INTERVAL_MS = 400;
const SPAWN_INTERVAL_UPGRADE_STEP_MS = 200;
const SPAWN_INTERVAL_UPGRADE_COST = 25;

const RARITY_SCORE_REWARDS: Readonly<Record<BallRarity, number>> = {
  common: 1,
  rare: 3,
  epic: 8,
  legendary: 20,
  mythical: 50,
};

export class Game {
  private readonly movementSystem = new MovementSystem();
  private readonly spawnSystem = new SpawnSystem();
  private spawnTimer = 0;
  private spawnIntervalMs = INITIAL_SPAWN_INTERVAL_MS;

  constructor(
    private readonly state: GameState,
    private readonly renderer: CanvasRenderer,
  ) {}

  update(deltaTime: number): void {
    this.state.elapsedTime += deltaTime;
    this.spawnTimer += deltaTime;

    while (this.spawnTimer >= this.spawnIntervalMs) {
      this.state.balls.push(this.spawnSystem.spawnBall());
      this.spawnTimer -= this.spawnIntervalMs;
    }

    const canvasWidth = this.renderer.getCanvasWidth();
    const activeBalls = [];

    for (const ball of this.state.balls) {
      this.movementSystem.updateBall(ball, deltaTime);

      if (ball.x - ball.radius <= canvasWidth) {
        activeBalls.push(ball);
      } else {
        this.state.score += RARITY_SCORE_REWARDS[ball.rarity];
      }
    }

    this.state.balls = activeBalls;
  }

  purchaseSpawnSpeedUpgrade(): boolean {
    if (this.state.score < SPAWN_INTERVAL_UPGRADE_COST) {
      return false;
    }

    if (this.spawnIntervalMs <= MIN_SPAWN_INTERVAL_MS) {
      return false;
    }

    this.state.score -= SPAWN_INTERVAL_UPGRADE_COST;
    this.spawnIntervalMs = Math.max(
      MIN_SPAWN_INTERVAL_MS,
      this.spawnIntervalMs - SPAWN_INTERVAL_UPGRADE_STEP_MS,
    );

    return true;
  }

  render(): void {
    this.renderer.clear();

    for (const ball of this.state.balls) {
      this.renderer.drawBall(ball);
    }

    this.renderer.drawText(`Score: ${this.state.score}`, 16, 24);
    this.renderer.drawText(`Spawn interval: ${this.spawnIntervalMs} ms`, 16, 48);
    this.renderer.drawText(`Press Space: -25 score`, 16, 72);
  }
}
