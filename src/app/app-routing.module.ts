import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './core/components/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
