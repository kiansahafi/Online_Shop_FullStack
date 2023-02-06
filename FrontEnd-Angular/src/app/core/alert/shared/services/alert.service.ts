import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { AlertType } from '../alert-type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private snackBar: MatSnackBar,
    public appConfig: AppConfigService
  ) {}

  showSnackbar(
    message: string,
    type: AlertType = 'INFO',
    duration: number = 2500
  ) {
    let panelClass = 'alert-info';
    switch (type) {
      case 'DEFAULT':
        panelClass = 'alert-default';
        break;
      case 'DANGER':
        panelClass = 'alert-danger';
        break;
      case 'SUCCESS':
        panelClass = 'alert-success';
        break;
      case 'WARNING':
        panelClass = 'alert-warning';
        break;
    }
    this.snackBar.openFromComponent(AlertComponent, {
      data: { message, type },
      panelClass: panelClass,
      duration,
    });
  }
}
