import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ComponentsModule } from '../components/components.module';


@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		TopMenuComponent,
		SideMenuComponent,
		LayoutComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		MenubarModule,
		SharedModule,
		InputTextModule,
		DropdownModule,
		SplitButtonModule,
		ToastModule,
		PanelMenuModule,
		ComponentsModule
	]
})
export class LayoutsModule {
}
