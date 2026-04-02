import type { Block } from './Block';

export class BlockFactory {
  create(partial: Partial<Block>): Block {
    return {
      id: partial.id ?? crypto.randomUUID(),
      type: partial.type ?? 'basic',
      x: partial.x ?? 0,
      y: partial.y ?? 0,
      width: partial.width ?? 64,
      height: partial.height ?? 16,
    };
  }
}
