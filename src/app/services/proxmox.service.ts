import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Domain } from '../interfaces/domain';
import { tap } from 'rxjs/operators';
import { Ticket } from '../interfaces/ticket';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Node } from '../interfaces/node';
import { Log } from '../interfaces/log';
import { Task } from '../interfaces/task';

@Injectable({
	providedIn: 'root'
})
export class ProxmoxService {
	constructor(private http: HttpClient, private cookieService: CookieService) {
	}

	//todo fix login page
	getTicket(params: any) {
		let body = new URLSearchParams();
		body.set('username', params.username);
		body.set('password', params.password);
		body.set('realm', params.realm);
		return this.http.post<Ticket>('/access/ticket', body, {
			headers: {
				skip:"true"
			}
		}).pipe(
			tap(response => {
				localStorage.setItem('ticket', response.ticket)
				localStorage.setItem('CSRFPreventionToken', response.CSRFPreventionToken)
				localStorage.setItem('username', response.username)
				this.cookieService.set("PVEAuthCookie", response.ticket, 237, "/", `${environment.url}:${environment.port}`)
			}),
		).toPromise()
	}

	getToken() {
		return localStorage.getItem('token')
	}

	async logout() {
		// const data = {
		// 	token: localStorage.getItem('token'),
		// }
		localStorage.removeItem('token')
	}

	//todo make logout system work
	deleteToken(tokens: any) {
		return this.http.post<void>(``, tokens).toPromise()
	}

	apiVersion() {
		return this.http.get('/version').toPromise()
	}

	domains() {
		return this.http.get<Domain[]>('/access/domains').toPromise()
	}

	logs() {
		return this.http.get<Log[]>('/cluster/log').toPromise()

	}

	tasks() {
		return this.http.get<Task[]>('/cluster/tasks').toPromise()

	}

	//todo add types to every function

	// storage
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/storage
	getStorage(param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get('/storage', param).toPromise()
	}

	createStorage(param: any) {
		return this.http.post('/storage', param).toPromise()
	}

	// storage > {storage}
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/storage/{storage}
	getStorageConfig(storage: any) {
		return this.http.get(`/storage/${storage}`).toPromise()
	}

	deleteStorageConfig(storage: any) {
		return this.http.delete(`/storage/${storage}`).toPromise()
	}

	updateStorageConfig(storage: any, param: any) {
		return this.http.put(`/storage/${storage}`, param).toPromise()
	}

	// pools
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/pools
	getPools() {
		return this.http.get('/pools').toPromise()
	}

	// pools > {poolid}
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/pools/{poolid}
	getPoolConfig(poolId: any) {
		return this.http.get(`/pools/${poolId}`).toPromise()
	}

	deletePoolConfig(poolId: any) {
		return this.http.delete(`/pools/${poolId}`).toPromise()
	}

	updatePoolConfig(poolid: any, param: any) {
		return this.http.put(`/pools/${poolid}`, param).toPromise()
	}

	// nodes
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes
	getNodes() {
		return this.http.get<Node[]>('/nodes').toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/wakeonlan
	wakeNode(node: any, params: any) {
		return this.http.post(`/nodes/${node}/wakeonlan`, params).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/version
	getNodeVersion(node: any) {
		return this.http.get(`/nodes/${node}/version`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/time
	getNodeTime(node: any) {
		return this.http.get(`/nodes/${node}/time`).toPromise()
	}

	updateNodeTimeZone(node: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/time`, param).toPromise()
	}

	// https://pve.proxmo x.com/pve-docs/api-viewer/index.html#/nodes/{node}/syslog
	getNodeLog(node: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/syslog`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/subscription
	getNodeSubscriptionStatus(node: any) {
		return this.http.get(`/nodes/${node}/subscription`).toPromise()
	}

	deleteNodeSubscriptionKey(node: any) {
		return this.http.delete(`/nodes/${node}/subscription`).toPromise()
	}

	setNodeSubscriptionKey(node: any, params: any) {
		return this.http.put(`/nodes/${node}/subscription`, params).toPromise()
	}

	updateNodeSubscriptionKey(node: any, params: any) {
		return this.http.post(`/nodes/${node}/subscription`, params).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/stopall
	stopAll(node: any, param: any) {
		return this.http.post(`/nodes/${node}/stopall`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/status
	getNodeStatus(node: any) {
		return this.http.get(`/nodes/${node}/status`).toPromise()
	}

	rebootNode(node: any) {
		return this.http.post(`/nodes/${node}/status`, {
			command: 'reboot'
		}).toPromise()
	}

	shutdownNode(node: any) {
		return this.http.post(`/nodes/${node}/status`, {
			command: 'shutdown'
		}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/startall
	startAll(node: any, param: any) {
		return this.http.post(`/nodes/${node}/startall`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/rrddata
	getNodeRRDData(node: any) {
		return this.http.get(`/nodes/${node}/rrddata`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/report
	getNodeReport(node: any) {
		return this.http.get(`/nodes/${node}/report`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/netstat
	getNodeNetstat(node: any) {
		return this.http.get(`/nodes/${node}/netstat`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/migrateall
	migrateAll(node: any, param: any) {
		return this.http.post(`/nodes/${node}/migrateall`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/journal
	getNodeJournal(node: any) {
		return this.http.get(`/nodes/${node}/journal`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/hosts
	getNodeHostname(node: any) {
		return this.http.get(`/nodes/${node}/hosts`).toPromise()
	}

	setNodeHostname(node: any, params: any) {
		return this.http.post(`/nodes/${node}/hosts`, params).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/dns
	getNodeDnsSettings(node: any) {
		return this.http.get(`/nodes/${node}/dns`).toPromise()
	}

	setNodeDnsSettings(node: any, param: any) {
		return this.http.put(`/nodes/${node}/dns`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/cpu
	listNodeCpu(node: any) {
		return this.http.get(`/nodes/${node}/cpu`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/config
	getNodeConfig(node: any) {
		return this.http.get(`/nodes/${node}/config`).toPromise()
	}

	updateNodeConfig(node: any, param: any) {
		return this.http.put(`/nodes/${node}/config`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/aplinfo
	getNodeAplInfo(node: any) {
		return this.http.get(`/nodes/${node}/aplinfo`).toPromise()
	}

	// nodes > vzdump
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/vzdump
	createBackup(node: any, param: any) {
		return this.http.post(`/nodes/${node}/vzdump`, param).toPromise()
	}

	getBackupConfig(node: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/vzdump/extractconfig`, param).toPromise()
	}

	// node > tasks
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/tasks
	getNodeTasks(node: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/tasks`, param).toPromise()
	}

	//https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/tasks/{upid}
	// No description on what this does on proxmox api docs, I will see later.
	getNodeTaskNotDocumented(node: any, upid: any) {
		return this.http.get(`/nodes/${node}/tasks/${upid}`).toPromise()
	}

	stopTask(node: any, upid: any) {
		return this.http.delete(`/nodes/${node}/tasks/${upid}`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/tasks/{upid}/log
	getTaskLog(node: any, upid: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/tasks/${upid}/log`, param).toPromise()
	}

	//https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/tasks/{upid}/status
	getTaskStatus(node: any, upid: any) {
		return this.http.get(`/nodes/${node}/tasks/${upid}/status`).toPromise()
	}

	// node > storage
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/storage
	getDatastoreStatus(node: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/storage`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/storage/{storage}
	// No description on what this does on proxmox api docs, I will see later.
	getDatastoreNotDocumented(node: any, storage: any) {
		return this.http.get(`/nodes/${node}/storage/${storage}`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/storage/{storage}/status
	getStorageStatus(node: any, storage: any) {
		return this.http.get(`/nodes/${node}/storage/${storage}/status`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/storage/{storage}/rrddata
	getStorageRRDData(node: any, storage: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/storage/${storage}/rrddata`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/storage/{storage}/content
	getStorageContent(node: any, storage: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/storage/${storage}/content`, param).toPromise()
	}

	allocateDiskImage(node: any, storage: any, param: any) {
		return this.http.post(`/nodes/${node}/storage/${storage}/content`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/storage/{storage}/content/{volume}
	getVolumeAttributes(node: any, storage: any, volume: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/storage/${storage}/content/${volume}`, param).toPromise()
	}

	deleteVolume(node: any, storage: any, volume: any, param: {
		headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; body?: any; // https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/snapshot/{snapname}
	}) {
		return this.http.delete(`/nodes/${node}/storage/${storage}/content/${volume}`, param).toPromise()
	}

	// node > services
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/services/{service}/reload
	reloadService(node: any, service: any, params: any) {
		return this.http.post(`/nodes/${node}/services${service}/reload`, params).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/services/{service}/restart
	restartService(node: any, service: any) {
		return this.http.post(`/nodes/${node}/services${service}/restart`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/services/{service}/start
	startService(node: any, service: any) {
		return this.http.post(`/nodes/${node}/services${service}/start`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/services/{service}/stop
	stopService(node: any, service: any) {
		return this.http.post(`/nodes/${node}/services${service}/stop`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/services/{service}/state
	getServiceState(node: any, service: any) {
		return this.http.get(`/nodes/${node}/services${service}/state`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/services
	listServices(node: any) {
		return this.http.get(`/nodes/${node}/services`).toPromise()
	}

	// lxc containers
	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc
	listLxcContainers(node: any) {
		return this.http.get(`/nodes/${node}/lxc`).toPromise()
	}

	createLxcContainer(node: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/template
	createLxcTemplate(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/template`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/rrddata
	getLxcRRDData(node: any, vmId: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/rrddata`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/resize
	resizeLxcContainer(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/resize`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/pending
	getLxcPending(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/pending`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/config
	getLxcConfig(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/config`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/clone
	cloneLxcContainer(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/clone`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/suspend
	suspendLxcContainer(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/status/suspend`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/stop
	stopLxcContainer(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/status/stop`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/start
	startLxcContainer(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/status/start`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/shutdown
	shutdownLxcContainer(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/status/shutdown`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/resume
	resumeLxcContainer(node: any, vmId: any, params: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/status/resume`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/reboot
	rebootLxcContainer(node: any, vmId: any, params: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/status/reboot`, params).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/status/current
	getLxcContainerStatus(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/status/current`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}
	deleteLxcContainer(node: any, vmId: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; body?: any; }) {
		return this.http.delete(`/nodes/${node}/lxc/${vmId}`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/snapshot
	getLxcSnapshot(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/snapshot`).toPromise()
	}

	createLxcSnapshot(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/snapshot`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/snapshot/{snapname}
	deleteLxcSnapshot(node: any, vmId: any, snapName: any, param: any) {
		return this.http.delete(`/nodes/${node}/lxc/${vmId}/snapshot/${snapName}`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/snapshot/{snapname}/config
	getLxcSnapshotConfig(node: any, vmId: any, snapName: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/snapshot/${snapName}/config`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/snapshot/{snapname}/config
	updateLxcSnapshotMetadata(node: any, vmId: any, snapName: any, param: any) {
		return this.http.put(`/nodes/${node}/lxc/${vmId}/snapshot/${snapName}/config`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/snapshot/{snapname}/rollback
	rollbackLxcContainer(node: any, vmId: any, snapName: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/snapshot/${snapName}/rollback`, {}).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/firewall
	getLxcFirewallRefs(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/firewall/refs`).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/firewall/options
	getLxcFirewallOptions(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/firewall/options`).toPromise()
	}

	setLxcFirewallOptions(node: any, vmId: any, param: any) {
		return this.http.put(`/nodes/${node}/lxc/${vmId}/firewall/options`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/firewall/log
	getLxcFirewallLog(node: any, vmId: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/firewall/log`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/firewall/rules
	getLxcFirewallRules(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/firewall/rules`).toPromise()
	}

	createLxcFirewallRule(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/firewall/rules`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/firewall/ipset
	getLxcFirewallIPSets(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/firewall/ipset`).toPromise()
	}

	createLxcFirewallIPSet(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/firewall/ipset`, param).toPromise()
	}

	// https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/{node}/lxc/{vmId}/firewall/aliases
	getLxcFirewallAliases(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/lxc/${vmId}/firewall/aliases`).toPromise()
	}

	createLxcFirewallAlias(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/lxc/${vmId}/firewall/aliases`, param).toPromise()
	}

	listQemuVms(node: any) {
		return this.http.get(`/nodes/${node}/qemu/`).toPromise()
	}

	getQemuVmConfig(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/config`).toPromise()
	}

	resizeQemuVm(node: any, vmId: any, param: any) {

		return this.http.put(`/nodes/${node}/qemu/${vmId}/resize`, param).toPromise()
	}

	setQemuVmConfig(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/config`, param).toPromise()
	}

	checkQemuVmFeature(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/feature`).toPromise()
	}

	getQemuVmMigrationPreconditions(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/migration`).toPromise()
	}

	cloneQemuVm(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/clone`, param).toPromise()
	}

	suspendQemuVm(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/suspend`, {}).toPromise()
	}

	stopQemuVm(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/stop`, {}).toPromise()
	}

	startQemuVm(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/start`, {}).toPromise()
	}

	shutdownQemuVm(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/shutdown`, {}).toPromise()
	}

	resumeQemuVm(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/resume`, {}).toPromise()
	}

	rebootQemuVm(node: any, vmId: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/reboot`, {}).toPromise()
	}

	execQemuMonitorCommand(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/monitor`, param).toPromise()
	}

	moveQemuVmDisk(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/status/reboot`, param).toPromise()
	}

	getQemuVmPendingConfig(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/pending`).toPromise()
	}

	getQemuSnapshot(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/snapshot`).toPromise()
	}

	createQemuSnapshot(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/snapshot`, param).toPromise()
	}

	deleteQemuSnapshot(node: any, vmId: any, snapName: any, param: any) {
		return this.http.delete(`/nodes/${node}/qemu/${vmId}/snapshot/${snapName}`).toPromise()
	}

	getQemuSnapshotConfig(node: any, vmId: any, snapName: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/snapshot/${snapName}/config`).toPromise()
	}

	updateQemuSnapshotMetadata(node: any, vmId: any, snapName: any, param: any) {
		return this.http.put(`/nodes/${node}/qemu/${vmId}/snapshot/${snapName}/config`, param).toPromise()
	}

	rollbackQemuVm(node: any, vmId: any, snapName: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/snapshot/${snapName}/rollback`, {}).toPromise()
	}

	createQemuVm(node: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu`, param).toPromise()
	}

	getQemuVmCloudinitConfig(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/cloudinit/dump`).toPromise()
	}

	makeQemuVmTemplate(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/template`, param).toPromise()
	}

	createQemuVmTermProxy(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/termproxy`, param).toPromise()
	}

	getQemuFirewallRefs(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/firewall/refs`).toPromise()
	}

	getQemuFirewallOptions(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/firewall/options`).toPromise()
	}

	setQemuFirewallOptions(node: any, vmId: any, param: any) {
		return this.http.put(`/nodes/${node}/qemu/${vmId}/firewall/options`, param).toPromise()
	}

	getQemuFirewallLog(node: any, vmId: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/firewall/log`, param).toPromise()
	}

	getQemuFirewallRules(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/firewall/rules`).toPromise()
	}

	createQemuFirewallRule(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/firewall/rules`, param).toPromise()
	}

	getQemuFirewallIPSets(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/firewall/ipset`).toPromise()
	}

	createQemuFirewallIPSet(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/firewall/ipset`, param).toPromise()
	}

	//  createQemuFirewallIPSet(node: any, vmId: any, param: any) {
	// 	return  this.http.post(`/nodes/${node}/qemu/${vmId}/firewall/ipset`, param).toPromise()
	// }

	unlinkQemuVmDisk(node: any, vmId: any, param: any) {
		return this.http.put(`/nodes/${node}/qemu/${vmId}/unlink`, param).toPromise()
	}

	createQemuVmVncProxy(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/vncproxy`, param).toPromise()
	}

	getQemuRRDData(node: any, vmId: any, param: any) {
		return this.http.post(`/nodes/${node}/qemu/${vmId}/rrddata`, param).toPromise()
	}

	execGetQemuAgentCommand(node: any, vmId: any, command: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/agent/${command}`).toPromise()
	}

	execPostQemuAgentCommand(node: any, vmId: any, command: any, params: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; }) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/agent/${command}`, params).toPromise()
	}

	deleteQemuVm(node: any, vmId: any, param: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; body?: any; }) {
		return this.http.delete(`/nodes/${node}/qemu/${vmId}`, param).toPromise()
	}

	getCurrentQemuVmState(node: any, vmId: any) {
		return this.http.get(`/nodes/${node}/qemu/${vmId}/status/current`).toPromise()
	}

	////Node Firewall/////
	getNodeFirewall(node: any) {
		return this.http.get(`/nodes/${node}/firewall`).toPromise()
	}

	getNodeFirewallRules(node: any) {
		return this.http.get(`/nodes/${node}/firewall/rules`).toPromise()
	}

	getNodeNetwork(node: any) {
		return this.http.get(`/nodes/${node}/network`).toPromise()
	}

	getNodeSDN(node: any) {
		return this.http.get(`/nodes/${node}/sdn`).toPromise()
	}

	getNodeCapabilities(node: any) {
		return this.http.get(`/nodes/${node}/capabilities`).toPromise()
	}

	////Node Ceph////
	getCeph(node: any) {
		return this.http.get(`/nodes/${node}/ceph`).toPromise()
	}

	getCephPools(node: any) {
		return this.http.get(`/nodes/${node}/ceph/pools`).toPromise()
	}

	getCephPool(node: any, pool: any) {
		return this.http.get(`/nodes/${node}/ceph/pools/${pool}`).toPromise()
	}

	getCephFS(node: any) {
		return this.http.get(`/nodes/${node}/ceph/fs`).toPromise()
	}

	getCephFSi(node: any, name: any) {
		return this.http.get(`/nodes/${node}/ceph/fs/${name}`).toPromise()
	}

	////Cluster/////
	getCluster() {
		return this.http.get('/cluster').toPromise()
	}

	getNextvmId() {
		return this.http.get('/cluster/nextid').toPromise()
	}

	getClusterFirewall() {
		return this.http.get('/cluster/firewall').toPromise()
	}

	getClusterFirewallGroups() {
		return this.http.get('/cluster/firewall/groups').toPromise()
	}

	getClusterFirewallIPSets() {
		return this.http.get('/cluster/firewall/ipset').toPromise()
	}

	getClusterSDN() {
		return this.http.get('/cluster/sdn').toPromise()
	}

	getClusterSDNvnets() {
		return this.http.get('/cluster/sdn/vnets').toPromise()
	}

	addHAResource(ID: string, opts = {}) {
		// @ts-ignore
		opts.isContainer = opts.isContainer || false;
		return this.http.post('/cluster/ha/resources', {
			// @ts-ignore
			sid: (opts.isContainer) ? 'vm:' + ID : 'ct:' + ID,
			// @ts-ignore
			group: opts.group,
			// @ts-ignore
			max_relocate: opts.max_relocate,
			// @ts-ignore
			max_restart: opts.max_restart,
			// @ts-ignore
			state: opts.state
		}).toPromise()
	}

	poolPIDPromise(node: any, PID: any, interval = 1000) {
		return new Promise((acc, rej) => {
			const lcl = (() => {
				let status = this.getTaskStatus(node, PID)
				//console.log(status)
				// @ts-ignore
				if (status.status == 'stopped') {
					// @ts-ignore
					if (status.exitstatus == "OK") {
						acc(status)
					} else
						rej(status)
				} else
					setTimeout(lcl, interval);
			});
			lcl()
		})
	}

}
