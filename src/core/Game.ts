import { CanvasRenderer } from '../render/CanvasRenderer';
import { GameState } from '../state/GameState';

export class Game {
  constructor(
    private readonly state: GameState,
    private readonly renderer: CanvasRenderer,
  ) {}

  update(deltaTime: number): void {
    this.state.elapsedTime += deltaTime;
  }

  render(): void {
    this.renderer.clear();
    this.renderer.drawText(`Score: ${this.state.score}`, 16, 24);
  }
}
