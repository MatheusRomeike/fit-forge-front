import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NgxLoadingModule } from 'ngx-loading';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AgGridAutoComplete } from './components/ag-grid-auto-complete/ag-grid-auto-complete.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { IconDropdownComponent } from './components/icon-dropdown/icon-dropdown.component';
import { InputImageComponent } from './components/input-image/input-image.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ScrollDirective } from './directives/scroll.directive';

@NgModule({
  declarations: [
    AvatarComponent,
    InputTextComponent,
    LoadingComponent,
    InputImageComponent,
    IconDropdownComponent,
    AgGridAutoComplete,
  ],
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
    AgGridModule,
    ScrollDirective,
  ],
  exports: [
    FontAwesomeModule,
    TranslateModule,
    NgScrollbarModule,
    AvatarComponent,
    InputTextComponent,
    FileUploadModule,
    LoadingComponent,
    InputImageComponent,
    IconDropdownComponent,
    AgGridModule,
    ScrollDirective,
    AgGridAutoComplete,
  ],
})
export class SharedModule {}
