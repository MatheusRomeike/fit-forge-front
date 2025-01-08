import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { WorkoutPlanEditComponent } from './pages/workout-plan-edit/workout-plan-edit.component';
import { WorkoutPlanHistoryComponent } from './pages/workout-plan-history/workout-plan-history.component';
import { WorkoutPlanComponent } from './pages/workout-plan/workout-plan.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPlanComponent,
  },
  {
    path: 'edit/:id',
    component: WorkoutPlanEditComponent,
  },
  {
    path: 'my-workouts',
    component: MyWorkoutsComponent,
  },
  {
    path: 'history',
    component: WorkoutPlanHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutPlanRoutingModule {}
