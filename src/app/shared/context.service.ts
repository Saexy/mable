import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Game } from './game.model';
import { WordService } from '../home/game/shared/word.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  user?: User;
  game?: Game;

  constructor(private wordService: WordService) {
    this.user = new User();
    this.game = new Game(wordService);
  }
}
