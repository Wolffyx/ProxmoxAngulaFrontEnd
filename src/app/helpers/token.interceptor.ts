import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ProxmoxService } from '../services/proxmox.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(private proxmoxService: ProxmoxService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return from(this.handle(request, next))
	}

	async handle(request: HttpRequest<any>, next: HttpHandler) {

		const token = this.proxmoxService.getToken()

		// add authorization header with jwt token if available
		// if (token && !request.url.endsWith('/auth/logout')) {
		// 	await this.proxmoxService.logout(false)
		// }
		if (request.headers.get("skip"))
			return next.handle(request).toPromise();
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `PVEAPIToken=${environment.proxmoxTokenIDApi}=${environment.proxmoxApi}`,
				},
				withCredentials:true
			})
		}
		return next.handle(request).toPromise()
	}
}
