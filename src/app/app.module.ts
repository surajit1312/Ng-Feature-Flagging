import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { ConfigurationModule } from './configuration/configuration.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    ConfigurationModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (httpClient: HttpClient, appConfig: AppConfigService) => {
        const loadAppConfiguration = async (): Promise<void> => {
          httpClient
            .get('assets/api/logged-user.json')
            .subscribe((userConfig) => {
              appConfig.setUserConfig(userConfig);
            });
          await appConfig.loadRemoteConfiguration();
        };
        return loadAppConfiguration;
      },
      deps: [HttpClient, AppConfigService],
      multi: true,
    },
    {
      provide: ROUTES,
      useFactory: (appConfig: AppConfigService) =>
        AppRoutingModule.loadRoutes(appConfig),
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
