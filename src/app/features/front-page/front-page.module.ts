import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { FrontPageRoutingModule } from './front-page-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FeaturesComponent } from './pages/features/features.component';
import { HomeComponent } from './pages/home/home.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { ContactBannerComponent } from './shared/components/contact-banner/contact-banner.component';
import { FaqBannerComponent } from './shared/components/faq-banner/faq-banner.component';
import { FeaturesBannerComponent } from './shared/components/features-banner/features-banner.component';
import { FrontPageNavbarComponent } from './shared/components/front-page-navbar/front-page-navbar.component';
import { StartNowBannerComponent } from './shared/components/start-now-banner/start-now-banner.component';
import { FrontPageLayoutComponent } from './shared/layouts/front-page-layout/front-page-layout.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturesComponent,
    FaqComponent,
    ContactComponent,
    FrontPageNavbarComponent,
    FrontPageLayoutComponent,
    BannerComponent,
    FeaturesBannerComponent,
    StartNowBannerComponent,
    FaqBannerComponent,
    ContactBannerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FrontPageRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class FrontPageModule {}
