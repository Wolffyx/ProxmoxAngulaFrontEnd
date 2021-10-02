import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-speed-dial',
	templateUrl: './speed-dial.component.html',
	styleUrls: ['./speed-dial.component.scss']
})
export class SpeedDialComponent implements OnInit {

	items: MenuItem[]=[];

	constructor(private messageService: MessageService) {
	}

	ngOnInit() {
		this.items = [
			{
				tooltip:"Create VM",
				tooltipPosition: 'left',
				icon: 'pi pi-desktop',
				command: () => {
					this.messageService.add({severity: 'info', summary: 'Add', detail: 'Data Added'});
				}
			},
			{
				tooltip:"Create container",
				tooltipPosition: 'left',
				icon: 'pi pi-inbox',
				command: () => {
					this.messageService.add({severity: 'success', summary: 'Update', detail: 'Data Updated'});
				}
			},
			{
				tooltip:"Documentation",
				tooltipPosition: 'left',
				icon: 'pi pi-book',
				url: `${environment.url}:${environment.port}/pve-docs/index.html`
			},
		];
	}

}
