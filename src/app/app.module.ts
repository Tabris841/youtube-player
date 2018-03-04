import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { YoutubeVideosModule } from './youtube-videos';

// SERVICES
import { APP_SERVICES } from './core/services';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    CoreModule,

    YoutubeVideosModule
  ],
  providers: [APP_SERVICES]
})
export class AppModule {}
