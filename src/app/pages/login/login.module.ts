import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
	declarations: [
		LoginComponent
	],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        CascadeSelectModule,
        FormsModule,
        CheckboxModule
    ]
})
export class LoginModule {
}
