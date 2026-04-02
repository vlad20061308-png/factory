import { GameState } from '../state/GameState';

export class ScoreSystem {
  addPoints(state: GameState, points: number): void {
    state.score += points;
  }
}
