export class GameResult {
  constructor(
    public categoryId: string = '',
    public gameId: number = 0,
    public score: number = 0,
    public date: Date = new Date()
  ) {}
}
