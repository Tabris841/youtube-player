import {
  Input,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  AfterViewChecked,
  EventEmitter
} from '@angular/core';

import { YoutubeMediaPlaylist } from '../../core/store/now-playlist';

@Component({
  selector: 'app-now-playlist',
  templateUrl: './now-playlist.component.html',
  styleUrls: ['./now-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistComponent implements AfterViewChecked {
  @Input() playlist: YoutubeMediaPlaylist;
  @Output() select = new EventEmitter();
  @Output() remove = new EventEmitter();

  private activeTrackElement: HTMLUListElement;

  constructor() {}

  ngAfterViewChecked() {
    this.scrollToActiveTrack();
  }
  scrollToActiveTrack() {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView();
    }
  }

  selectVideo(media) {
    this.select.emit(media);
  }

  removeVideo(media: GoogleApiYouTubeSearchResource) {
    this.remove.emit(media);
  }

  isActiveMedia(mediaId: string, trackElement: HTMLUListElement) {
    const isActive = this.playlist.index === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }
}
