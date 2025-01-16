import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './core/layouts/base-layout/base-layout.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/front-page/front-page.module').then(
        (m) => m.FrontPageModule
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'dashboard',
    component: BaseLayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'workout-plan',
    component: BaseLayoutComponent,
    canActivate: [],
    loadChildren: () =>
      import('./features/workout-plan/workout-plan.module').then(
        (m) => m.WorkoutPlanModule
      ),
  },
  {
    path: 'settings',
    component: BaseLayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      enableViewTransitions: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
