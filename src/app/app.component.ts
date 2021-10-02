import { Component, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import proxmoxApi from "proxmox-api";
import { ProxmoxService } from './services/proxmox.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

	constructor(
		// translate: TranslateService,
		private proxmoxService: ProxmoxService
	) {
		// this language will be used as a fallback when a translation isn't found in the current language
		// translate.setDefaultLang('en');
	}

	async ngOnInit() {
		// const promox = this.proxmoxService.getTicket();
		// const nodes = await promox.nodes.$get();
		// console.log(promox)
	}
}
