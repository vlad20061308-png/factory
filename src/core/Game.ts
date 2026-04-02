import { CanvasRenderer } from '../render/CanvasRenderer';
import { GameState } from '../state/GameState';
import { MovementSystem } from '../systems/MovementSystem';
import { SpawnSystem } from '../systems/SpawnSystem';

const SPAWN_INTERVAL_MS = 2000;

export class Game {
  private readonly movementSystem = new MovementSystem();
  private readonly spawnSystem = new SpawnSystem();
  private spawnTimer = 0;

  constructor(
    private readonly state: GameState,
    private readonly renderer: CanvasRenderer,
  ) {}

  update(deltaTime: number): void {
    this.state.elapsedTime += deltaTime;
    this.spawnTimer += deltaTime;

    while (this.spawnTimer >= SPAWN_INTERVAL_MS) {
      this.state.balls.push(this.spawnSystem.spawnBall());
      this.spawnTimer -= SPAWN_INTERVAL_MS;
    }

    const canvasWidth = this.renderer.getCanvasWidth();

    for (const ball of this.state.balls) {
      this.movementSystem.updateBall(ball, deltaTime);

      if (ball.x - ball.radius > canvasWidth) {
        ball.x = -ball.radius;
      }
    }
  }

  render(): void {
    this.renderer.clear();

    for (const ball of this.state.balls) {
      this.renderer.drawBall(ball);
    }

    this.renderer.drawText(`Score: ${this.state.score}`, 16, 24);
  }
}
