import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { AccountSettingsComponent } from './shared/components/account-settings/account-settings.component';

@NgModule({
  declarations: [SettingsComponent, AccountSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class SettingsModule {}
