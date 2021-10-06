import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { InputStyleSwitchComponent } from './input-style-switch/input-style-switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SpeedDialComponent } from './speed-dial/speed-dial.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { NodeComponent } from './node/node.component';
import { LogsComponent } from './logs/logs.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';


@NgModule({
	declarations: [
		ConfigComponent,
		InputStyleSwitchComponent,
		SpeedDialComponent,
		NodeComponent,
		LogsComponent
	],
	exports: [
		ConfigComponent,
		SpeedDialComponent,
		NodeComponent,
		LogsComponent
	],
	imports: [
		CommonModule,
		InputSwitchModule,
		FormsModule,
		ButtonModule,
		SpeedDialModule,
		SplitButtonModule,
		MenubarModule,
		ToastModule,
		InputTextModule,
		SidebarModule,
		TabViewModule,
		TableModule,
	]
})
export class ComponentsModule {
}
