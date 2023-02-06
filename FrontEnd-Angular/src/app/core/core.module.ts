import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from './alert';



@NgModule({
  declarations: [],
  imports: [
    AlertModule,
    CommonModule
  ],
  exports : [AlertModule]
})
export class CoreModule { }
