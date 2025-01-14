import { LOCALE_ID, NgModule } from '@angular/core';

import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { NgxLoadingModule } from 'ngx-loading';

registerLocaleData(localeEn);
registerLocaleData(localePt);
ModuleRegistry.registerModules([AllCommunityModule]);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    OAuthModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ],
  providers: [
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useFactory: getLocale },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getLocale(): string {
  return localStorage.getItem('languageSignal') || 'en';
}
