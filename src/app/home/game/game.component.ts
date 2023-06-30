import { Component, OnInit } from '@angular/core';
import { WordService } from './shared/word.service';
import { User } from 'src/app/shared/user.model';
import { ContextService } from 'src/app/shared/context.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit { 

  word: string = "";

  constructor(private wordService: WordService, public contextService: ContextService) {}

  async ngOnInit(): Promise<void> {
    this.word = await this.wordService.getWord();
  }

  async onKeyboard(key: string): Promise<void> {
    if(!this.contextService.game?.isFinished()){
      if(key === "BACKSPACE"){
        this.contextService.game?.eraseLetter();
        return;
      }
      if(key === "ENTER"){
        this.contextService.game?.sendRow(this.word);
        return;
      }
      this.contextService.game?.sendLetter(key);
    }
  }

  async onNewGame(): Promise<void> {
    this.contextService.game?.newGame();
    this.word = await this.wordService.getRandomWord();
  }

}
