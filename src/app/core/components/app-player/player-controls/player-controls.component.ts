import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'app-player-controls',
  styleUrls: ['./player-controls.component.scss'],
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent {
  @Input() media: GoogleApiYouTubeVideoResource;
  @HostBinding('class.yt-repeat-on')
  @Input()
  isRepeat = false;
  @HostBinding('class.yt-playing')
  @Input()
  playing = false;
  @Output() play = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() pause = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() repeat = new EventEmitter();

  controls = [
    {
      title: 'previous',
      icon: 'step-backward',
      handler: this.handlePrevious,
      feature: 'previous'
    },
    {
      title: 'pause',
      icon: 'pause',
      handler: this.handlePause,
      feature: 'pause'
    },
    {
      title: 'play',
      icon: 'play',
      handler: this.handlePlay,
      feature: 'play'
    },
    {
      title: 'play next track',
      icon: 'step-forward',
      handler: this.handleNext,
      feature: 'next'
    },
    {
      title: 'repeate playlist',
      icon: 'refresh',
      handler: this.handleRepeat,
      feature: 'repeat'
    }
  ];

  handlePlay() {
    this.play.emit(this.media);
  }

  handlePrevious() {
    this.previous.emit();
  }

  handlePause() {
    this.pause.emit();
  }

  handleNext() {
    this.next.emit();
  }

  handleRepeat() {
    this.repeat.emit();
  }

  handleControl(control) {
    control.handler.call(this);
  }
}
