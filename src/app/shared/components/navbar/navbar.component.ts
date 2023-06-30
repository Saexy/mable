import { Component } from '@angular/core';
import { ContextService } from '../../context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  help: boolean = false;
  stats: boolean = false;
  
  constructor(public contextService: ContextService) {}

  onOpenHelp(): void {
    this.help = true;
  }

  onCloseHelp(): void {
    this.help = false;
  }

  onOpenStats(): void {
    this.stats = true;
  }

  onCloseStats(): void {
    this.stats = false;
  }

}
