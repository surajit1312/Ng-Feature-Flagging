import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  public static loadRoutes = (appConfig: AppConfigService): Routes => {
    const appRoutes: Routes = routes;
    const userRole = appConfig.getUserRole();
    const isAdmin: boolean = appConfig.getFeatureAttribute(
      'ff-config',
      'role',
      userRole
    );
    if (isAdmin) {
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
