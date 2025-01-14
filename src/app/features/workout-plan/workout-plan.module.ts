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
import { WorkoutDayAccordionComponent } from './shared/components/workout-day-accordion/workout-day-accordion.component';
import { WorkoutDayTableComponent } from './shared/components/workout-day-table/workout-day-table.component';
import { WorkoutInfoComponent } from './shared/components/workout-info/workout-info.component';
import { WorkoutWeekAccordionComponent } from './shared/components/workout-week-accordion/workout-week-accordion.component';
import { WorkoutWeeksComponent } from './shared/components/workout-weeks/workout-weeks.component';
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
    WorkoutWeeksComponent,
    WorkoutWeekAccordionComponent,
    WorkoutDayAccordionComponent,
    WorkoutDayTableComponent,
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
