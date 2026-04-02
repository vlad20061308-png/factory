import type { Ball } from '../entities/Ball';

export class MovementSystem {
  updateBall(ball: Ball, deltaTime: number): void {
    ball.x += ball.velocityX * deltaTime;
    ball.y += ball.velocityY * deltaTime;
  }
}
