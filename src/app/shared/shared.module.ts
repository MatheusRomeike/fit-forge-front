import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AvatarComponent } from './components/avatar/avatar.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [AvatarComponent, InputTextComponent, LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    NgScrollbarModule,
    FileUploadModule,
    NgxLoadingModule,
  ],
  exports: [
    FontAwesomeModule,
    TranslateModule,
    NgScrollbarModule,
    AvatarComponent,
    InputTextComponent,
    FileUploadModule,
    LoadingComponent,
  ],
})
export class SharedModule {}
