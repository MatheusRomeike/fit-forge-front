import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, BaseLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    FormsModule,
  ],
  exports: [NavbarComponent],
})
export class CoreModule {}
