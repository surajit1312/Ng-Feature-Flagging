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
import { UserDomainService } from './user-domain.service';

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
      useFactory: (
        userDomainService: UserDomainService,
        appConfig: AppConfigService
      ) => {
        const loadAppConfiguration = async (): Promise<void> => {
          userDomainService.getUserDomainRole();
          await appConfig.loadRemoteConfiguration();
        };
        return loadAppConfiguration;
      },
      deps: [UserDomainService, AppConfigService],
      multi: true,
    },
    {
      provide: ROUTES,
      useFactory: (
        userDomainService: UserDomainService,
        appConfig: AppConfigService
      ) => AppRoutingModule.loadRoutes(userDomainService, appConfig),
      deps: [UserDomainService, AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
