import { Component, OnInit, AfterContentInit } from '@angular/core';

import { PlayerService } from '../core/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterContentInit {
  constructor(private playerService: PlayerService) {}

  ngAfterContentInit() {
    const htmlId = 'yt-player-ng2-component';
    this.playerService.loadPlayerApi();
    this.playerService.setupPlayer(htmlId);
  }

  ngOnInit() {}

  playVideo() {
    // this.playerService.play();
    // this.play.next(this.player.media);
  }

  pauseVideo() {
    // this.playerService.pause();
  }

  togglePlayer() {
    // this.playerService.togglePlayer();
  }

  playNextTrack() {
    // this.playNext.next(this.player);
  }
}
