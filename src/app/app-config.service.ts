import { Injectable } from '@angular/core';
import { FeatureDefinition, GrowthBook } from '@growthbook/growthbook';
import { UserDomainService } from './user-domain.service';

const API_KEY = 'API_KEY';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private featureFlags: Record<string, FeatureDefinition> = {};

  private growthbook!: GrowthBook;

  constructor(private userDomainService: UserDomainService) {}

  setGrowthBook(gb: GrowthBook) {
    this.growthbook = gb;
  }

  getGrowthBook(): GrowthBook {
    return this.growthbook;
  }

  setFeaturesFlag(features: Record<string, FeatureDefinition>) {
    this.featureFlags = features;
  }

  getFeatures(): Record<string, FeatureDefinition> {
    return this.featureFlags;
  }

  getFeatureValue(key: string): boolean | any {
    return this.growthbook.isOn(key);
  }

  getFeatureAttribute(key: string, attribute: string, value: string): boolean {
    const filteredFeature = this.featureFlags[key]?.rules?.filter(
      (rule: any) => {
        return rule.condition?.[attribute] == value;
      }
    );
    if (filteredFeature && filteredFeature.length > 0) {
      return filteredFeature[0].force;
    } else {
      return false;
    }
  }

  private async loadConfig() {
    const growthbook = new GrowthBook({
      apiHost: 'https://cdn.growthbook.io',
      clientKey: API_KEY,
      enableDevMode: true,
      subscribeToChanges: true,
      trackingCallback: (experiment, result) => {
        // TODO: Use your real analytics tracking system
        console.log('Viewed Experiment', {
          experimentId: experiment.key,
          variationId: result.key,
        });
      },
    });

    // Wait for features to be downloaded
    await growthbook.loadFeatures();
    this.setGrowthBook(growthbook);
    this.setFeaturesFlag(growthbook.getFeatures());
  }

  public async loadRemoteConfiguration(): Promise<void> {
    let remoteConfig: any;
    try {
      remoteConfig = await this.loadConfig();
      return remoteConfig;
    } catch (error) {
      throw error;
    }
  }

  public validateUser(): boolean {
    const isDomainFeatured = this.getFeatureAttribute(
      'ff-domain',
      'domain',
      this.userDomainService.getUserDomain()
    );
    const isAdmin: boolean = this.getFeatureAttribute(
      'ff-config',
      'role',
      this.userDomainService.getUserRole()
    );
    return isDomainFeatured && isAdmin;
  }
}
