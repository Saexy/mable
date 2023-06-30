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
    const randomWord = words[Math.floor(Math.random() * words.length)];
    localStorage.setItem('word', randomWord);
    return randomWord;
  }

  async getWord(): Promise<string> {
    return localStorage.getItem('word') ?? this.getRandomWord();
  }

  async checkWord(word: string): Promise<boolean> {
    const result = await this.httpClient.get("../../../../assets/data/words.txt", { responseType: 'text' }).toPromise();
    const words = result?.split("\n") ?? [];
    return words.includes(word);
  }
  
}
