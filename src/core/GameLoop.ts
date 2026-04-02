export class GameLoop {
  private lastTime = 0;
  private running = false;

  constructor(
    private readonly update: (deltaTime: number) => void,
    private readonly render: () => void,
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;

    requestAnimationFrame((time) => {
      this.lastTime = time;
      this.tick(time);
    });
  }

  private tick = (time: number): void => {
    if (!this.running) return;

    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.tick);
  };
}
