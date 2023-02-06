import { Injector } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppConfigService } from '../../services/app-config.service';

export class AlertBaseComponent {
  message: string;
  config: MatSnackBarConfig<any> = new MatSnackBarConfig<any>();
  appConfig: AppConfigService;

  constructor(injector: Injector) {
    this.appConfig = injector.get(AppConfigService);
  }
}
