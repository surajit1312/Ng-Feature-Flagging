import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  public featureFlags!: {
    featureAdmin: boolean;
    featureUserA: boolean;
    featureUserB: boolean;
  };

  constructor(private httpClient: HttpClient) {}

  public async loadRemoteConfiguration(): Promise<void> {
    let remoteConfig;
    try {
      remoteConfig = await this.httpClient
        .get('assets/api/feature-config.json')
        .toPromise();
      Object.assign(this, remoteConfig);
    } catch (error) {
      throw error;
    }
  }
}
