import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatSnackBarModule],
  exports: [AlertComponent],
  entryComponents: [AlertComponent],
})
export class AlertModule {}
