import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
  },
];

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatExpansionModule,
    NgxJsonViewerModule,
  ],
})
export class ConfigurationModule {}
