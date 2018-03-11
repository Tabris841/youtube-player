import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player-resizer',
  styleUrls: ['./player-resizer.component.scss'],
  templateUrl: './player-resizer.component.html'
})
export class PlayerResizerComponent {
  @Input() fullScreen: boolean;
  @Output() toggle = new EventEmitter<void>();
  constructor() {}

  togglePlayer() {
    this.toggle.next();
  }
}
