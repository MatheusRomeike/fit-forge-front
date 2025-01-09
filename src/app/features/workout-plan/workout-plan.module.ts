import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { WorkoutPlanEditComponent } from './pages/workout-plan-edit/workout-plan-edit.component';
import { WorkoutPlanHistoryComponent } from './pages/workout-plan-history/workout-plan-history.component';
import { WorkoutPlanComponent } from './pages/workout-plan/workout-plan.component';
import { AddWorkoutCardComponent } from './shared/components/add-workout-card/add-workout-card.component';
import { WorkoutCardComponent } from './shared/components/workout-card/workout-card.component';
import { WorkoutInfoComponent } from './shared/components/workout-info/workout-info.component';
import { WorkoutPlanRoutingModule } from './workout-plan-routing.module';

@NgModule({
  declarations: [
    WorkoutPlanComponent,
    MyWorkoutsComponent,
    WorkoutPlanEditComponent,
    WorkoutPlanHistoryComponent,
    WorkoutCardComponent,
    AddWorkoutCardComponent,
    WorkoutInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkoutPlanRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class WorkoutPlanModule {}
