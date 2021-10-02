import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { InputStyleSwitchComponent } from './input-style-switch/input-style-switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SpeedDialComponent } from './speed-dial/speed-dial.component';
import { SpeedDialModule } from 'primeng/speeddial';


@NgModule({
	declarations: [
		ConfigComponent,
		InputStyleSwitchComponent,
  SpeedDialComponent
	],
	exports: [
		ConfigComponent,
		SpeedDialComponent
	],
	imports: [
		CommonModule,
		InputSwitchModule,
		FormsModule,
		ButtonModule,
		SpeedDialModule,
	]
})
export class ComponentsModule {
}
