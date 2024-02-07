import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDomainService {
  private userConfig!: any;

  constructor(private httpClient: HttpClient) {}

  getUserDomainRole() {
    this.httpClient
      .get('assets/api/logged-user.json')
      .subscribe((userConfig) => {
        this.setUserConfig(userConfig);
      });
  }

  setUserConfig(userConfig: any) {
    this.userConfig = userConfig;
  }

  getUserDomain(): string {
    return this.userConfig.domain;
  }

  getUserRole(): string {
    return this.userConfig.role;
  }
}
