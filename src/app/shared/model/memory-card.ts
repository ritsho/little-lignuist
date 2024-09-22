export class MemoryCard {
  constructor(
    public word: string,
    public translation: string,
    public isFlipped: boolean,
    public isTarget: boolean,
    public isMatched: boolean
  ) {}
}
