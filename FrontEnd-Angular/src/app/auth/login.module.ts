import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginRouterOutletComponent } from './components/login-router-outlet/login-router-outlet.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShoppingCartViewComponent } from './components/shopping-cart-view/shopping-cart-view.component';
import { CardItemComponent } from './components/cart-item/card-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminManageProductComponent } from './components/admin-manage-product/admin-manage-product.component';
import { AdminManageCommentComponent } from './components/admin-manage-comment/admin-manage-comment.component';

const routes: Routes = [
  {
    path: '',
    component: LoginRouterOutletComponent,
    children: [{ path: '', component: LoginComponent }],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    LoginRouterOutletComponent,
    ShoppingCartViewComponent,
    CardItemComponent,
    ProductListComponent,
    ProductPageComponent,
    AdminLoginComponent,
    AdminManageProductComponent,
    AdminManageCommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ShoppingCartViewComponent],
})
export class LoginModule {}
