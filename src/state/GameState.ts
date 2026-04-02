import type { Ball } from '../entities/Ball';
import type { Block } from '../blocks/Block';

export class GameState {
  score = 0;
  elapsedTime = 0;
  balls: Ball[] = [];
  blocks: Block[] = [];
}
