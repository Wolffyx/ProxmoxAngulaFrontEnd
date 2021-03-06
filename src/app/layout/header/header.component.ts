import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

interface City {
	name: string
	code: string
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	items: MenuItem[] = [];
	cities: City[];
	userItems: MenuItem[] = [];
	username: string = '';

	constructor(private messageService: MessageService) {

		this.cities = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
	}


	ngOnInit() {
		this.username = String(localStorage.getItem('username'))
		this.items = [
			{
				label: 'Dashboard',
				icon: 'fas fa-building',
				items: [
					{
						label: 'New',
						icon: 'pi pi-fw pi-plus',
						items: [
							{
								label: 'Bookmark',
								icon: 'pi pi-fw pi-bookmark'
							},
							{
								label: 'Video',
								icon: 'pi pi-fw pi-video'
							},

						]
					},
					{
						label: 'Delete',
						icon: 'pi pi-fw pi-trash'
					},
					{
						separator: true
					},
					{
						label: 'Export',
						icon: 'pi pi-fw pi-external-link'
					}
				]
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
				items: [
					{
						label: 'Left',
						icon: 'pi pi-fw pi-align-left'
					},
					{
						label: 'Right',
						icon: 'pi pi-fw pi-align-right'
					},
					{
						label: 'Center',
						icon: 'pi pi-fw pi-align-center'
					},
					{
						label: 'Justify',
						icon: 'pi pi-fw pi-align-justify'
					},

				]
			},
			{
				label: 'Users',
				icon: 'pi pi-fw pi-user',
				items: [
					{
						label: 'New',
						icon: 'pi pi-fw pi-user-plus',

					},
					{
						label: 'Delete',
						icon: 'pi pi-fw pi-user-minus',

					},
					{
						label: 'Search',
						icon: 'pi pi-fw pi-users',
						items: [
							{
								label: 'Filter',
								icon: 'pi pi-fw pi-filter',
								items: [
									{
										label: 'Print',
										icon: 'pi pi-fw pi-print'
									}
								]
							},
							{
								icon: 'pi pi-fw pi-bars',
								label: 'List'
							}
						]
					}
				]
			},
			{
				label: 'Events',
				icon: 'pi pi-fw pi-calendar',
				items: [
					{
						label: 'Edit',
						icon: 'pi pi-fw pi-pencil',
						items: [
							{
								label: 'Save',
								icon: 'pi pi-fw pi-calendar-plus'
							},
							{
								label: 'Delete',
								icon: 'pi pi-fw pi-calendar-minus'
							},

						]
					},
					{
						label: 'Archieve',
						icon: 'pi pi-fw pi-calendar-times',
						items: [
							{
								label: 'Remove',
								icon: 'pi pi-fw pi-calendar-minus'
							}
						]
					}
				]
			},
			{
				label: 'Quit',
				icon: 'pi pi-fw pi-power-off'
			}
		];
		this.userItems = [
			{
				label: 'Logout',
				icon: 'pi pi-sign-out',
				command: () => this.update()
			},
			// {
			// 	label: 'Delete',
			// 	icon: 'pi pi-times',
			// 	command: () => this.delete()
			// },
			// {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
			// {separator: true},
			// {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
		];
	}

	save(severity: string) {
		this.messageService.add({severity: severity, summary: 'Success', detail: 'Data Saved'});
	}

	update() {
		this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
	}

	delete() {
		this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Deleted'});
	}
}
