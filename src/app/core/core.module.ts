import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';

@NgModule({
  declarations: [
    LogoComponent,
    LanguageSwitchComponent,
    ThemeSwitchComponent,
    HeaderComponent,
    SidebarComponent,
    MenuComponent,
    BaseLayoutComponent,
    PageHeaderComponent,
    PageLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    LogoComponent,
    LanguageSwitchComponent,
    ThemeSwitchComponent,
    HeaderComponent,
    SidebarComponent,
    BaseLayoutComponent,
    PageHeaderComponent,
    PageLayoutComponent,
  ],
})
export class CoreModule {}
