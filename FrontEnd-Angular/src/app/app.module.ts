import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './auth/components/login/login.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './auth/login.module';
import { CoreModule } from './core/core.module';
import { AppConfigService } from './core/services/app-config.service';
import { TokenInterceptorService } from './core/http-interceptor';
import { AdminModule } from './modules/admin/admin.module';

// in declarations you should add the Cart component
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    CarouselModule,
    MatMenuModule,
    HttpClientModule,
    LoginModule,
    AdminModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AppConfigService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
