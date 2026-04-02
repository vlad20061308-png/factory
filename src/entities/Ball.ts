import type { Entity } from './Entity';

export class Ball implements Entity {
  constructor(
    public id: string,
    public x: number,
    public y: number,
    public radius: number = 8,
    public velocityX: number = 0,
    public velocityY: number = 0,
  ) {}
}
