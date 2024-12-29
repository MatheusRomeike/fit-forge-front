import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AvatarComponent } from './components/avatar/avatar.component';
@NgModule({
  declarations: [AvatarComponent],
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
  ],
})
export class SharedModule {}
