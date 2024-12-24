import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'authentication',
  //   loadChildren: () =>
  //     import('./feature/login/login.module').then((m) => m.LoginModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./features/front-page/front-page.module').then(
        (m) => m.FrontPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
