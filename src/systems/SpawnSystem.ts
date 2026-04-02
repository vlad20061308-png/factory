import { Ball } from '../entities/Ball';

export class SpawnSystem {
  spawnBall(): Ball {
    return new Ball(crypto.randomUUID(), 400, 300, 10, 180, 0);
  }
}
