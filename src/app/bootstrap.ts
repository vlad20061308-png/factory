import { Game } from '../core/Game';
import { GameLoop } from '../core/GameLoop';
import { GameState } from '../state/GameState';
import { CanvasRenderer } from '../render/CanvasRenderer';
import { SpawnSystem } from '../systems/SpawnSystem';

export function bootstrap(): void {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.tabIndex = 0;
  document.body.appendChild(canvas);
  canvas.focus();

  const state = new GameState();
  const spawnSystem = new SpawnSystem();
  state.balls.push(spawnSystem.spawnBall());

  const renderer = new CanvasRenderer(canvas);
  const game = new Game(state, renderer);
  const loop = new GameLoop(
    (deltaTime) => game.update(deltaTime),
    () => game.render(),
  );

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.code === 'Space') {
      event.preventDefault();
      game.purchaseSpawnSpeedUpgrade();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keydown', handleKeyDown);
  canvas.addEventListener('keydown', handleKeyDown);

  loop.start();
}
