import { Game } from '../core/Game';
import { GameLoop } from '../core/GameLoop';
import { GameState } from '../state/GameState';
import { CanvasRenderer } from '../render/CanvasRenderer';
import { SpawnSystem } from '../systems/SpawnSystem';

export function bootstrap(): void {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);

  const state = new GameState();
  const spawnSystem = new SpawnSystem();
  state.balls.push(spawnSystem.spawnBall());

  const renderer = new CanvasRenderer(canvas);
  const game = new Game(state, renderer);
  const loop = new GameLoop(
    (deltaTime) => game.update(deltaTime),
    () => game.render(),
  );

  loop.start();
}
