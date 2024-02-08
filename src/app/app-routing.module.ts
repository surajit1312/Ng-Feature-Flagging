import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDomainService } from './user-domain.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static loadRoutes = (
    userDomainService: UserDomainService,
    appConfig: AppConfigService
  ): Routes => {
    const appRoutes: Routes = routes;
    const userDomain = userDomainService.getUserDomain();
    const userRole = userDomainService.getUserRole();
    const isDomainFeatured = appConfig.getFeatureAttribute(
      'ff-domain',
      'domain',
      userDomain
    );
    const isAdmin: boolean = appConfig.getFeatureAttribute(
      'ff-config',
      'role',
      userRole
    );
    if (isDomainFeatured && isAdmin) {
      appRoutes.push({
        path: 'configuration',
        loadChildren: () =>
          import('./configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
      });
    }
    return appRoutes;
  };
}
