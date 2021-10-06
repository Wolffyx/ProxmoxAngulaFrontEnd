import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProxmoxService } from '../../services/proxmox.service';
import { Node } from '../../interfaces/node';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
	items: MenuItem[] = [];
	nodes: Node[] = []

	constructor(
		private proxmoxService: ProxmoxService) {

	}

	async ngOnInit() {
		this.nodes = await this.proxmoxService.getNodes();
		console.log(this.nodes)
		this.items = this.nodes.map(node => {
			return {
				label: node.node,
				icon: 'fas fa-building',
			}
		})
		// this.items = [
		// 	{
		// 		label: 'File',
		// 		icon: 'pi pi-fw pi-file',
		// 		items: [
		// 			{
		// 				label: 'New',
		// 				icon: 'pi pi-fw pi-plus',
		// 				items: [
		// 					{
		// 						label: 'Bookmark',
		// 						icon: 'pi pi-fw pi-bookmark'
		// 					},
		// 					{
		// 						label: 'Video',
		// 						icon: 'pi pi-fw pi-video'
		// 					}
		// 				]
		// 			},
		// 			{
		// 				label: 'Delete',
		// 				icon: 'pi pi-fw pi-trash'
		// 			},
		// 			{
		// 				label: 'Export',
		// 				icon: 'pi pi-fw pi-external-link'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		label: 'Events',
		// 		icon: 'pi pi-fw pi-calendar',
		// 		items: [
		// 			{
		// 				label: 'Edit',
		// 				icon: 'pi pi-fw pi-pencil',
		// 				items: [
		// 					{
		// 						label: 'Save',
		// 						icon: 'pi pi-fw pi-calendar-plus'
		// 					},
		// 					{
		// 						label: 'Delete',
		// 						icon: 'pi pi-fw pi-calendar-minus'
		// 					}
		// 				]
		// 			},
		// 			{
		// 				label: 'Archieve',
		// 				icon: 'pi pi-fw pi-calendar-times',
		// 				items: [
		// 					{
		// 						label: 'Remove',
		// 						icon: 'pi pi-fw pi-calendar-minus'
		// 					}
		// 				]
		// 			}
		// 		]
		// 	}
		// ]

	}

}
