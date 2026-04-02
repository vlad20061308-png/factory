import type { Ball } from '../entities/Ball';

export class MovementSystem {
  updateBall(ball: Ball, deltaTime: number): void {
    const dt = deltaTime / 1000;

    ball.x += ball.velocityX * dt;
    ball.y += ball.velocityY * dt;
  }
}
