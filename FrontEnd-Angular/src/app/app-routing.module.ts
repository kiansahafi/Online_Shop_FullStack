import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './auth/components/admin-login/admin-login.component';
import { AdminManageCommentComponent } from './auth/components/admin-manage-comment/admin-manage-comment.component';
import { AdminManageProductComponent } from './auth/components/admin-manage-product/admin-manage-product.component';
import { ProductListComponent } from './auth/components/product-list/product-list.component';
import { ProductPageComponent } from './auth/components/product-page/product-page.component';

const routes: Routes = [
  {
    path: 'Login',
    loadChildren: () =>
      import('./auth/login.module').then((m) => m.LoginModule),
  },
  { path: 'Product-Page', component: ProductPageComponent },
  { path: 'Product-Page/:id', component: ProductPageComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/manage-product', component: AdminManageProductComponent },
  { path: 'admin/comments', component: AdminManageCommentComponent },
  // { path: 'admin/product', component:  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
