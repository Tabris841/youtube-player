import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Escape = 27,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  ArrowDown = 40
}

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './app-navbar-menu.component.html',
  styleUrls: ['./app-navbar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarMenuComponent implements OnInit {
  hide = true;
  @Input() signedIn = false;
  @Input()
  appVersion = {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  };
  @Input() theme = { themes: [], selected: '' };
  @Output() signOut = new EventEmitter();
  @Output() themeChange = new EventEmitter();

  @HostListener('keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideMenu();
    }
  }

  constructor() {}

  ngOnInit() {}

  handleSignOut() {
    this.signOut.emit();
  }

  hideMenu() {
    this.hide = true;
  }

  toggleMenu() {
    this.hide = !this.hide;
  }

  updateTheme(theme) {
    this.themeChange.emit(theme);
  }
}
