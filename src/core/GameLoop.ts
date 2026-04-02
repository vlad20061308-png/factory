export class GameLoop {
  private running = false;
  private lastTime = 0;

  constructor(
    private readonly onUpdate: (deltaTime: number) => void,
    private readonly onRender: () => void,
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
  }

  private tick = (time: number): void => {
    if (!this.running) return;

    const deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.onUpdate(deltaTime);
    this.onRender();

    requestAnimationFrame(this.tick);
  };
}
