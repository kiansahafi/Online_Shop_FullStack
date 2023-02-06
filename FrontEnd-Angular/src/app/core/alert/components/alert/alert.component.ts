import { Injector } from '@angular/core';
import { AlertBaseComponent } from '../../shared/alert-base-component';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent extends AlertBaseComponent implements OnInit {
  icon = 'notification_important';

  constructor(
    injector: Injector,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<AlertComponent>
  ) {
    super(injector);
    this.message = this.appConfig.snackbarInfoMessage;
  }

  ngOnInit() {
    if (this.data) {
      switch (this.data.type) {
        case 'DEFAULT':
          this.message = this.appConfig.snackbarDefaultMessage;
          break;
        case 'DANGER':
          this.icon = 'error';
          this.message = this.appConfig.snackbarDangerMessage;
          break;
        case 'SUCCESS':
          this.icon = 'check_circle';
          this.message = this.appConfig.snackbarSuccessMessage;
          break;
        case 'WARNING':
          this.icon = 'warning';
          this.message = this.appConfig.snackbarWarningMessage;
          break;
      }
    }
  }

  onClose() {
    this.snackBarRef.dismiss();
  }
}
