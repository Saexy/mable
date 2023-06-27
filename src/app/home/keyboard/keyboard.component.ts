import { HostListener, Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {

  @Output() onKeyboard = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    const regex = /^[a-zA-Z]+$/;
    const key = e.key.toUpperCase();
    if(key === "BACKSPACE" || key === "ENTER" || (regex.test(key) && key.length == 1)){
      this.onKeyboard.emit(key)
    }
  }

  onKey(key: string){
    this.onKeyboard.emit(key);
  }

}
