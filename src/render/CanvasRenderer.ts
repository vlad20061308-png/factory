import type { Ball, BallRarity } from '../entities/Ball';

const RARITY_COLORS: Record<BallRarity, string> = {
  common: 'gray',
  rare: 'blue',
  epic: 'purple',
  legendary: 'orange',
  mythical: 'red',
};

export class CanvasRenderer {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('2D context not available');
    }
    this.ctx = context;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvasWidth(): number {
    return this.canvas.width;
  }

  drawText(text: string, x: number, y: number): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText(text, x, y);
  }

  drawBall(ball: Ball): void {
    this.ctx.fillStyle = RARITY_COLORS[ball.rarity];
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
