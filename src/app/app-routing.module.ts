import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeModule } from './pages/welcome/welcome.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
// import { LayoutComponent } from './layout/layout.component';
// import { AuthGuard } from './gaurds/auth.gaurd';
// import { LoginModule } from './pages/login/login.module';
// import { RegisterUserModule } from './pages/register-user/register-user.module';
// import { ErrorComponent } from './pages/error/error.component';
// import { DashboardModule } from './pages/dashboard/dashboard.module';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
				{
					path: '',
					component: WelcomeComponent,
					// canActivate: [AuthGuard]
				},
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
