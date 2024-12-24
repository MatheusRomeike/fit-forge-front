import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule],
  exports: [LogoComponent],
})
export class CoreModule {}
