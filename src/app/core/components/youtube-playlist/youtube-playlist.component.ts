import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-youtube-playlist',
  templateUrl: './youtube-playlist.component.html',
  styleUrls: ['./youtube-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistComponent implements OnInit {
  @Input() media: any;
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();

  isPlaying = false;

  constructor() {}

  ngOnInit() {}

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.play.next(media);
  }

  queuePlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.queue.next(media);
  }
}
