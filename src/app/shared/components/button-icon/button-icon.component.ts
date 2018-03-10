import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  // styleUrls: ['./button-icon.scss'],
  template: `
    <button [ngClass]="types">
      <icon [name]="icon"></icon> <ng-content></ng-content>
    </button>
  `
})
export class ButtonIconComponent implements OnInit {
  @Input() icon: string;
  @Input() types: string;

  constructor() {}

  ngOnInit() {}
}
