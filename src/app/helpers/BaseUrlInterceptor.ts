import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

	constructor() {
	}


	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const apiReq = request.clone({
			url: `${environment.url}:${environment.port}/api2/json${request.url}`,
			headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded'),
		});
		return next.handle(apiReq);
	}
}
