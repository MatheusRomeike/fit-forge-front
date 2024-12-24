import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { LogoComponent } from './components/logo/logo.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';

@NgModule({
  declarations: [LogoComponent, LanguageSwitchComponent, ThemeSwitchComponent],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [LogoComponent, LanguageSwitchComponent, ThemeSwitchComponent],
})
export class CoreModule {}
