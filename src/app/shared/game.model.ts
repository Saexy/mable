import { WordService } from "../home/game/shared/word.service";
import { User } from "./user.model";

export class Game{

  finished: boolean;
  data: any[];
  blockRowNumber: number;
  blockNumber: number;
  defaultData: any[] = [
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
  ];
  user: User;

  constructor(private wordService: WordService) {
    const gameData = JSON.parse(localStorage.getItem('game') ?? '"{}"');
    this.finished = gameData?.finished ?? false;
    this.data = gameData?.data ?? this.defaultData;
    this.blockRowNumber = gameData?.blockRowNumber ?? 0;
    this.blockNumber = gameData?.blockNumber ?? 0;
    this.user = new User();
  }

  saveData(): void {
    const data = {
      finished: this.finished,
      data: this.data,
      blockRowNumber: this.blockRowNumber,
      blockNumber: this.blockNumber,
    };
    localStorage.setItem('game', JSON.stringify(data));
  }

  isFinished(): boolean {
    return this.finished;
  }

  eraseLetter(): void {
    if(this.blockNumber > 0 && !this.data[this.blockRowNumber].blocks[this.blockNumber].value){
      this.blockNumber--;
    }
    this.data[this.blockRowNumber].blocks[this.blockNumber].value = null;
    if(this.blockNumber > 0){
      this.blockNumber--;
    }
    this.saveData();
  }

  async sendRow(word: string): Promise<void> {
    let fullText = true;
    let quantityRight = 0;
    let fullWord = "";
    this.data[this.blockRowNumber].blocks.forEach((block: any, b: number) => {
      if(!block.value){
        fullText = false;
      }else{
        fullWord = fullWord + block.value;
        const wordArray = word.split(''); 
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
      console.log('passed');
      if(quantityRight == 5){
        alert("Parabéns você ganhou!");
        this.user?.addWins();
        this.finished = true;
      }else{
        if(this.blockRowNumber < 5){
          this.blockRowNumber++;
          this.blockNumber = 0;
        }else{
          alert("Você perdeu!");
          this.user?.addLoses();
          this.finished = true;
        }
      }
    }
    this.saveData();
  }

  sendLetter(key: string): void {
    if(!this.data[this.blockRowNumber].blocks[this.blockNumber].value){
      this.data[this.blockRowNumber].blocks[this.blockNumber].value = key
    }
    if(this.blockNumber < 4){
      this.blockNumber++;
    }
    this.saveData();
  }

  newGame(): void {
    this.finished = false;
    this.data = this.defaultData;
    this.blockNumber = 0;
    this.blockRowNumber = 0;
    this.saveData();
  }
}
