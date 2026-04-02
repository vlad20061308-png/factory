import type { Ball } from '../entities/Ball';
import type { Block } from '../blocks/Block';

export class CollisionSystem {
  checkBallBlock(_ball: Ball, _block: Block): boolean {
    return false;
  }
}
