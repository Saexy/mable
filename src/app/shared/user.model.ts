export class User {
  
  wins: number;
  loses: number;
  winstreak: number;
  bestWinstreak: number;

  constructor() {
    const data = JSON.parse(localStorage.getItem('user') ?? '"{}"');
    this.wins = data?.wins ?? 0;
    this.loses = data?.loses ?? 0;
    this.winstreak = data?.winstreak ?? 0;
    this.bestWinstreak = data?.bestWinstreak ?? 0;
  }

  saveData(): void {
    const data = {
      wins: this.wins,
      loses: this.loses,
      winstreak: this.winstreak,
      bestWinstreak: this.bestWinstreak,
    };
    localStorage.setItem('user', JSON.stringify(data));
  }

  getWins(): number {
    return this.wins;
  }

  addWins(): void {
    this.wins++;
    this.winstreak++;
    this.saveData();
  }

  getLoses(): number {
    return this.loses;
  }

  addLoses(): void {
    this.loses++;
    if (this.winstreak >= this.bestWinstreak) {
      this.bestWinstreak = this.winstreak;
    }
    this.winstreak = 0;
    this.saveData();
  }

  getWinstreak(): number {
    return this.winstreak;
  }

  getBestWinstreak(): number {
    return this.bestWinstreak;
  }
  
  getGames(): number {
    return this.wins + this.loses;
  }

  getWinrate(): string {
    const winrate =
      (this.getGames() == 0
        ? 0
        : this.loses == 0
        ? 100
        : this.wins / this.getGames()) * 100;
    return `${winrate.toFixed(0)}%`;
  }

}
