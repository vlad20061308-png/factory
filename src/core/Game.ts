import { CanvasRenderer } from '../render/CanvasRenderer';
import { GameState } from '../state/GameState';
import { MovementSystem } from '../systems/MovementSystem';

export class Game {
  private readonly movementSystem = new MovementSystem();

  constructor(
    private readonly state: GameState,
    private readonly renderer: CanvasRenderer,
  ) {}

  update(deltaTime: number): void {
    this.state.elapsedTime += deltaTime;

    for (const ball of this.state.balls) {
      this.movementSystem.updateBall(ball, deltaTime);
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
