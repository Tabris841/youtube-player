import { Component } from '@angular/core';

import { AppApi } from '@api/app.api';

@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.component.scss'],
  templateUrl: './app-brand.component.html'
})
export class AppBrandComponent {
  constructor(private appApi: AppApi) {}

  toggleSidebar() {
    return this.appApi.toggleSidebar();
  }
}
