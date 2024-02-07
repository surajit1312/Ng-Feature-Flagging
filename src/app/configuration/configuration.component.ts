import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { FeatureDefinition, FeatureRule } from '@growthbook/growthbook';

export interface IFeature {
  key: string;
  defaultValue: boolean;
  rules: Array<FeatureRule>;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  featureFlags!: Record<string, FeatureDefinition>;
  panelOpenState = false;
  features: Array<IFeature> = [];
  json = JSON.stringify;

  constructor(private appConfig: AppConfigService) {}

  ngOnInit(): void {
    this.featureFlags = this.appConfig.getFeatures();
    for (let key of Object.keys(this.featureFlags)) {
      const value = this.featureFlags[key];
      this.features.push({
        key,
        defaultValue: value.defaultValue,
        rules: value.rules || [],
      });
    }
  }
}
