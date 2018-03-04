import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { YoutubeSearch, NowPlaylistService } from '../core/services';
import { EchoesState } from '../core/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>
  ) {}

  ngOnInit() {}

  search(query: string) {}

  playSelectedVideo(media: GoogleApiYouTubeSearchResource) {}

  queueSelectedVideo(media: GoogleApiYouTubeSearchResource) {}

  resetPageToken() {}

  searchMore() {}
}
