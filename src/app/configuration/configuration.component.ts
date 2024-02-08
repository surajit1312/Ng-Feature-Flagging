import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import {
  FeatureDefinition,
  FeatureRule,
  GrowthBook,
} from '@growthbook/growthbook';

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

  changeAttribute(feature: IFeature, field?: string, rule?: FeatureRule) {
    console.log(feature, rule);
    const growthbook: GrowthBook = this.appConfig.getGrowthBook();
    const features: Record<string, FeatureDefinition> =
      this.appConfig.getFeatures();
    if (field === 'defaultValue') {
      features[feature.key].defaultValue = !features[feature.key].defaultValue;
    } else {
      const rules: any = features[feature.key].rules;
      let index = -1;
      for (let i = 0; i < rules.length; i++) {
        if (rules[i].condition == rule?.condition) {
          index = i;
          break;
        }
      }
      // features?.[feature.key]?.rules[index].force = !features[feature.key].rules[index].force;
    }
    growthbook.setFeatures(features);
  }
}
