import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { MediaParserService } from '@core/services/media-parser.service';
import { extractThumbUrl } from '@shared/utils/media.utils';

@Component({
  selector: 'app-now-playlist-track',
  styleUrls: ['./now-playlist-track.component.scss'],
  templateUrl: './now-playlist-track.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistTrackComponent implements OnInit, AfterContentInit {
  @Input() video: GoogleApiYouTubeVideoResource;
  @Input() index: number;

  @Output() remove = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() select = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output()
  selectTrack = new EventEmitter<{
    time: string;
    media: GoogleApiYouTubeVideoResource;
  }>();

  displayTracks = false;
  displayInfo = false;
  tracks: string[] = [];
  videoThumb = '';

  constructor(public mediaParser: MediaParserService) {}

  ngOnInit() {
    this.videoThumb = extractThumbUrl(this.video);
  }

  ngAfterContentInit() {
    this.extractTracks(this.video);
  }

  extractTracks(media: GoogleApiYouTubeVideoResource) {
    const tracks = this.mediaParser.extractTracks(media);
    const isArray = Array.isArray(tracks);
    if (isArray) {
      this.parseAndSaveTracks(tracks);
    }
  }

  isPlaylistMedia(media: GoogleApiYouTubeVideoResource) {
    return this.tracks.length;
  }

  parseAndSaveTracks(tracks: string[]) {
    this.tracks = this.mediaParser.parseTracks(tracks);
  }

  toggleTracks(media: GoogleApiYouTubeVideoResource) {
    this.displayTracks = !this.displayTracks;
    return this.displayTracks;
  }

  handleToggleTracks(event: Event, media: GoogleApiYouTubeVideoResource) {
    event.stopImmediatePropagation();
    this.toggleTracks(media);
  }

  handleSelectTrack(
    $event: Event,
    track: string,
    media: GoogleApiYouTubeVideoResource
  ) {
    $event.stopImmediatePropagation();
    const time = this.mediaParser.extractTime(track);
    if (time) {
      this.selectTrack.emit({ time: time[0], media });
    }
  }

  markSelected(video: GoogleApiYouTubeVideoResource) {
    this.select.emit(video);
  }

  toggleInfo() {
    this.displayInfo = !this.displayInfo;
    return this.displayInfo;
  }
}
