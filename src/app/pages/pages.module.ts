import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeModule } from './welcome/welcome.module';
import { LoginModule } from './login/login.module';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		WelcomeModule,
		LoginModule,
	]
})
export class PagesModule {
}
