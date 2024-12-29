import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AvatarComponent } from './components/avatar/avatar.component';
import { InputTextComponent } from './components/input-text/input-text.component';

@NgModule({
  declarations: [AvatarComponent, InputTextComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    NgScrollbarModule,
  ],
  exports: [
    FontAwesomeModule,
    TranslateModule,
    NgScrollbarModule,
    AvatarComponent,
    InputTextComponent,
  ],
})
export class SharedModule {}
