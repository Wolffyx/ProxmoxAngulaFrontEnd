import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
// import { AuthGuard } from './gaurds/auth.gaurd';
// import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from './layout/layouts.module';
import { BaseUrlInterceptor } from './helpers/BaseUrlInterceptor';
import { PagesModule } from './pages/pages.module';
import { ProxmoxApiInterceptor } from './helpers/ProxmoxApiInterceptor';
import { ComponentsModule } from './components/components.module';
import { TokenInterceptor } from './helpers/token.interceptor';
import { CookieService } from 'ngx-cookie-service';

registerLocaleData(en);

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		IconsProviderModule,
		PagesModule,
		LayoutsModule,
		ComponentsModule
	],
	exports: [],
	providers: [
		MessageService,
		CookieService,
		// {provide: NZ_I18N, useValue: en_US},
		{provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi:true},
		{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
		{provide: HTTP_INTERCEPTORS, useClass: ProxmoxApiInterceptor, multi: true},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
