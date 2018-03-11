import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-media-info',
  styleUrls: ['./media-info.component.scss'],
  templateUrl: './media-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaInfoComponent {
  @Input() player: any = {};
  @Input() minimized: GoogleApiYouTubeVideoResource;
  @Output() thumbClick = new EventEmitter();

  constructor() {}

  @HostListener('window:keyup.Escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.player.fullscreen.on) {
      this.handleThumbClick();
    }
  }

  handleThumbClick() {
    this.thumbClick.next();
  }

  get _minimized() {
    return !this.minimized.hasOwnProperty('id');
  }
}
