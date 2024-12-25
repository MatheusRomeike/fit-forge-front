import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faAngleDown,
  faBars,
  faCircleUser,
  faCompress,
  faExpand,
  faLock,
  faMagnifyingGlass,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false,
})
export class HeaderComponent {
  faBars = faBars;
  faMagnifyingGlass = faMagnifyingGlass;
  faAngleDown = faAngleDown;
  faCircleUser = faCircleUser;
  faLock = faLock;
  faRightToBracket = faRightToBracket;
  faExpand = faExpand;
  faCompress = faCompress;

  isSidebarToggled = false;

  constructor(
    private sidebarService: SidebarService,
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.sidebarService.isSidebarVisible$.subscribe((isSidebarToggled) => {
      this.isSidebarToggled = isSidebarToggled;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isSidebarToggled) {
          this.toggle();
        }
      });
  }

  toggle() {
    this.sidebarService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  isFullscreen: boolean = false;
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener(
        'fullscreenchange',
        this.onFullscreenChange.bind(this)
      );
      document.addEventListener(
        'webkitfullscreenchange',
        this.onFullscreenChange.bind(this)
      );
      document.addEventListener(
        'mozfullscreenchange',
        this.onFullscreenChange.bind(this)
      );
      document.addEventListener(
        'MSFullscreenChange',
        this.onFullscreenChange.bind(this)
      );
    }
  }
  toggleFullscreen() {
    if (this.isFullscreen) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }

  openFullscreen() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.documentElement as HTMLElement & {
        mozRequestFullScreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
    }
  }
  closeFullscreen() {
    if (isPlatformBrowser(this.platformId)) {
      const doc = document as Document & {
        mozCancelFullScreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
      };
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        // Firefox
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        // IE/Edge
        doc.msExitFullscreen();
      }
    }
  }
  onFullscreenChange() {
    if (isPlatformBrowser(this.platformId)) {
      const doc = document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
      };
      this.isFullscreen = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
    }
  }
}
