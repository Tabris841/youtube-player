import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
  AfterViewChecked,
  NgZone,
  SimpleChanges
} from '@angular/core';

import * as NowPlaylist from '@store/now-playlist';
import { flyOut } from '@shared/animations/fade-in.animation';
import { isNewChange } from '@shared/utils/data.utils';

@Component({
  selector: 'app-now-playlist',
  animations: [flyOut],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./now-playlist.component.scss'],
  templateUrl: './now-playlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistComponent implements OnChanges, AfterViewChecked {
  @Input() playlist: NowPlaylist.INowPlaylist;
  @Output() select = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output()
  selectTrack = new EventEmitter<{
    time: string;
    media: GoogleApiYouTubeVideoResource;
  }>();
  @Output() remove = new EventEmitter<GoogleApiYouTubeVideoResource>();

  public activeTrackElement: HTMLUListElement;
  public hasActiveChanged = false;

  constructor(public zone: NgZone) {}

  ngAfterViewChecked() {
    if (this.hasActiveChanged && this.activeTrackElement) {
      this.zone.runOutsideAngular(() => this.scrollToActiveTrack());
    }
  }

  ngOnChanges({ activeId }: SimpleChanges) {
    if (activeId) {
      this.hasActiveChanged = isNewChange(activeId);
    }
  }

  scrollToActiveTrack() {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView();
    }
  }

  selectVideo(media: GoogleApiYouTubeVideoResource) {
    this.select.emit(media);
  }

  removeVideo(media: GoogleApiYouTubeVideoResource) {
    this.remove.emit(media);
  }

  sortVideo(media: GoogleApiYouTubeVideoResource) {
    // this.sort.next(media);
  }

  isActiveMedia(mediaId: string, trackElement: HTMLUListElement) {
    const isActive = this.playlist.selectedId === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }

  selectTrackInVideo(trackEvent: { time; media }) {
    this.selectTrack.emit(trackEvent);
  }
}
