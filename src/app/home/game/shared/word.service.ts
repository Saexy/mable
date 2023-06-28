import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(private httpClient: HttpClient) {}

  async getRandomWord(): Promise<string> {
    const result = await this.httpClient.get("../../../../assets/data/words.txt", { responseType: 'text' }).toPromise();
    const words = result?.split("\n") ?? []; 
    return words[Math.floor(Math.random() * words.length)];
  }

  async checkWord(word: string): Promise<boolean> {
    const result = await this.httpClient.get("../../../../assets/data/words.txt", { responseType: 'text' }).toPromise();
    const words = result?.split("\n") ?? [];
    return words.includes(word);
  }
  
}
