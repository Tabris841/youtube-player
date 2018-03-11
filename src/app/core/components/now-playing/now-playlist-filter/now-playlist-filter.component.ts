import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import * as NowPlaylist from '@store/now-playlist';

@Component({
  selector: 'app-now-playlist-filter',
  styleUrls: ['./now-playlist-filter.component.scss'],
  templateUrl: './now-playlist-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistFilterComponent {
  @Input() playlist: NowPlaylist.INowPlaylist;
  @Output() clear = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() headerClick = new EventEmitter();

  constructor() {}

  handleFilterChange(searchFilter: string) {
    this.filter.next(searchFilter);
  }

  resetSearchFilter() {
    this.reset.next('');
  }

  isFilterEmpty() {
    return this.playlist.filter === '';
  }

  clearPlaylist() {
    this.clear.next('');
  }

  isPlaylistEmpty() {
    return this.playlistLength === 0;
  }

  onNowPlayingClick() {
    this.headerClick.next();
  }
  get playlistLength() {
    return this.playlist.videos.length;
  }
}
