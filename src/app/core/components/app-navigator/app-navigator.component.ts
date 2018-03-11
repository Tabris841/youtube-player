import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EchoesState } from '@store/reducers';
import { Store } from '@ngrx/store';
import * as PlayerSearch from '@core/store/player-search';

@Component({
  selector: 'app-navigator',
  styleUrls: ['./app-navigator.component.scss'],
  templateUrl: './app-navigator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent {
  @Input() closed = false;
  @Input() searchType = PlayerSearch.CSearchTypes.VIDEO;

  public searchType$ = this.store.select(PlayerSearch.getSearchType);
  public routes = [{ link: 'search', icon: 'music', label: 'Explore' }];

  constructor(private store: Store<EchoesState>, private router: Router) {}

  go(link) {
    this.router.navigate([`/${link}/${this.searchType}s`]);
  }
}
