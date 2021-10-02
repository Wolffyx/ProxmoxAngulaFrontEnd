import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProxmoxService } from '../../services/proxmox.service';
import { Domain } from '../../interfaces/domain';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		realm: new FormControl('pam', Validators.required)
	});
	domains: Domain[] = []
	countries: any[] = [];

	selectedCity2: any;

	constructor(private proxmoxService: ProxmoxService) {
	}

	submitted = false;
	checked: boolean = false

	async ngOnInit() {
		let username = String(localStorage.getItem("username")).split("@")
		if (localStorage.getItem("username")){
			this.loginForm.controls.username.setValue(username[0])
			this.checked = Boolean(localStorage.getItem("rememberMe"));
		}
		this.domains = await this.proxmoxService.domains();
	}

	async onSubmit() {
		console.log(this.loginForm.controls.username.value)
		if (this.checked){
			localStorage.setItem("rememberMe", String(true))
			localStorage.setItem('username',this.loginForm.controls.username.value)
		}
		const proxmox = await this.proxmoxService.getTicket({
			username: this.loginForm.controls.username.value,
			password: this.loginForm.controls.password.value,
			realm: this.loginForm.controls.realm.value
		});
		console.log(proxmox)
		console.log(JSON.stringify(this.loginForm.value));
	}

}
