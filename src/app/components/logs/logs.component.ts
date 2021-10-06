import { Component, OnInit } from '@angular/core';
import { ProxmoxService } from '../../services/proxmox.service';
import { Log } from '../../interfaces/log';
import { Task } from '../../interfaces/task';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

	visible: boolean = false;
	position: string = 'right';
	fullscreen: boolean = false
	logs: Log[] = []
	tasks: Task[] = []

	constructor(private proxmoxService: ProxmoxService) {
	}

	ngOnInit(): void {
	}

	async showLogs() {
		this.visible = true
		await this.getTasks();
	}

	async getLogs() {
		this.logs = await this.proxmoxService.logs();
	}

	async getTasks() {
		this.tasks = await this.proxmoxService.tasks();
	}

	async handleChange(event: any) {
		if (event.index === 0) {
			await this.getTasks()
		} else if (event.index === 1) await this.getLogs()
	}
}
