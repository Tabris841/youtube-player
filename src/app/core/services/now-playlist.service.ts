import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { EchoesState } from '../store';
import * as NowPlaylist from '../store/now-playlist/now-playlist.actions';

import {
  NowPlaylistActions,
  YoutubeMediaPlaylist
} from '../store/now-playlist';

import { YoutubeVideosInfo } from './youtube-videos-info.service';

@Injectable()
export class NowPlaylistService {
  public playlist$: Observable<YoutubeMediaPlaylist>;

  constructor(
    public store: Store<EchoesState>,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) {
    this.playlist$ = this.store.select(state => state.nowPlaylist);
  }

  queueVideo(mediaId: string) {
    return this.youtubeVideosInfo
      .fetchVideoData(mediaId)
      .map(items => items[0]);
  }

  queueVideos(medias: GoogleApiYouTubeVideoResource[]) {
    this.store.dispatch(new NowPlaylist.QueueVideos(medias));
  }

  removeVideo(media) {
    this.store.dispatch(new NowPlaylist.RemoveVideo(media));
  }

  selectVideo(media) {
    this.store.dispatch(new NowPlaylist.SelectVideo(media));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new NowPlaylist.ChangeFilter(filter));
  }

  clearPlaylist() {
    this.store.dispatch(new NowPlaylist.RemoveAll());
  }

  selectNextIndex() {
    this.store.dispatch(new NowPlaylist.SelectNext());
  }

  getCurrent() {
    let media;
    this.playlist$.take(1).subscribe(playlist => {
      media = playlist.videos.find(video => video.id === playlist.index);
    });
    return media;
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(new NowPlaylist.UpdateIndexByMedia(mediaId));
  }
}
