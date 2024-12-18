import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { FullSizeDirective } from './directives/fullsize.directive';
@NgModule({
  declarations: [FullSizeDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
  ],
  exports: [FullSizeDirective, FontAwesomeModule, TranslateModule],
})
export class SharedModule {}
