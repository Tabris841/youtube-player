import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from '@core/services';

@Injectable()
export class PlaylistResolver implements Resolve<any> {
  constructor(private userProfile: UserProfile) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<GoogleApiYouTubePlaylistResource> {
    const playlistId = route.params['id'];
    return this.userProfile
      .fetchPlaylist(playlistId)
      .map(response => response.items[0]);
  }
}
