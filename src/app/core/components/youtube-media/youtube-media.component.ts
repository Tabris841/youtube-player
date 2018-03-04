import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { YoutubeMediaResource } from '../../interfaces/youtube.media.resource';

@Component({
  selector: 'app-youtube-media',
  templateUrl: './youtube-media.component.html',
  styleUrls: ['./youtube-media.component.scss']
})
export class YoutubeMediaComponent implements OnInit {
  @Input() media: any;
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() add = new EventEmitter();

  showDesc = false;
  isPlaying = false;

  constructor() {}

  ngOnInit() {}

  playVideo(media: YoutubeMediaResource) {
    this.play.next(media);
  }

  queueVideo(media: YoutubeMediaResource) {
    this.queue.next(media);
  }

  addVideo(media: YoutubeMediaResource) {
    this.add.next(media);
  }

  toggle(showDesc: Boolean) {
    this.showDesc = !showDesc;
  }
}