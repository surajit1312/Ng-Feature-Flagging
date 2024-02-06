import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { ROUTES, Routes } from '@angular/router';

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
    ConfigurationModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfigService) => {
        const loadAppConfiguration = async (): Promise<void> => {
          await appConfig.loadRemoteConfiguration();
        };
        return loadAppConfiguration;
      },
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: ROUTES,
      useFactory: (appConfig: AppConfigService) => {
        const appRoutes: Routes = routes;
        if (appConfig.featureFlags.featureAdmin) {
          appRoutes.push({
            path: 'configuration',
            loadChildren: () =>
              import('./configuration/configuration.module').then(
                (m) => m.ConfigurationModule
              ),
          });
        }
        return appRoutes;
      },
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
