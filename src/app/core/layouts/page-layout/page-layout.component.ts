import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  standalone: false,
})
export class PageLayoutComponent implements AfterViewChecked {
  @ViewChild('content') content: ElementRef;

  hasContent: boolean = true;

  ngAfterViewChecked() {
    this.hasContent = this.content?.nativeElement?.children?.length > 0;
  }
}
