import { Component, OnInit } from '@angular/core';
import { WordService } from './shared/word.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit { 

  blockRowNumber: number = 0;
  blockNumber: number = 0;

  finished: boolean = false;
  data: any[] = [
    {
      blocks: [
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
      ],
      passed: false,
    },
    {
      blocks: [
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
      ],
      passed: false,
    },
    {
      blocks: [
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
      ],
      passed: false,
    },
    {
      blocks: [
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
      ],
      passed: false,
    },
    {
      blocks: [
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
      ],
      passed: false,
    },
    {
      blocks: [
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
        {
          value: null,
          status: 0,
        },
      ],
      passed: false,
    },
  ]
  word: string = "";

  constructor(private wordService: WordService) {}

  async ngOnInit(): Promise<void> {
    this.word = await this.wordService.getRandomWord();
  }

  async onKeyboard(key: string): Promise<void> {
    if(!this.finished){
      if(key === "BACKSPACE"){
        if(this.blockNumber > 0 && !this.data[this.blockRowNumber].blocks[this.blockNumber].value){
          this.blockNumber--;
        }
        this.data[this.blockRowNumber].blocks[this.blockNumber].value = null;
        if(this.blockNumber > 0){
          this.blockNumber--;
        }
        return;
      }
      if(key === "ENTER"){
        let fullText = true;
        let quantityRight = 0;
        let fullWord = "";
        this.data[this.blockRowNumber].blocks.forEach((block: any, b: number) => {
          if(!block.value){
            fullText = false;
          }else{
            fullWord = fullWord + block.value;
            const wordArray = this.word.split(''); 
            if(!wordArray.includes(block.value)){
              block.status = 0;
            }else if(wordArray.includes(block.value) && wordArray[b] !== block.value){
              block.status = 1;
            }else{
              block.status = 2;
              quantityRight++;
            }
          }
        });
        let existsWord = await this.wordService.checkWord(fullWord);
        if(!fullText){
          alert("Você precisa preencher todos os campos para tentar adivinhar a palavra.");
        }else if(!existsWord) {
          alert("Essa palavra não existe.");
        }else{
          this.data[this.blockRowNumber].passed = true;
          if(quantityRight == 5){
            alert("Parabéns você ganhou!");
            this.finished = true;
          }else{
            if(this.blockRowNumber < 5){
              this.blockRowNumber++;
              this.blockNumber = 0;
            }else{
              alert("Você perdeu!");
              this.finished = true;
            }
          }
        }
        return;
      }
      if(!this.data[this.blockRowNumber].blocks[this.blockNumber].value){
        this.data[this.blockRowNumber].blocks[this.blockNumber].value = key
      }
      if(this.blockNumber < 4){
        this.blockNumber++;
      }
    }
  }

}
