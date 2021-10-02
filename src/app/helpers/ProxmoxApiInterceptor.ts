import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ProxmoxApiInterceptor implements HttpInterceptor {

	constructor(
	) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(map(response => {
				if (response instanceof HttpResponse) {
					// if (response.status >= 200 && response.status <= 299 && response.body?.message) {
					// 	this.notification.success(response.body.message)
					// }
					return response.clone({
						body: response.body?.data,
					})
				}

				return response
			}))
			// catchError(error => {
			// 	if (error.status === 401 && localStorage.getItem('user')) {
			// 		// auto logout if 401 response returned from api
			// 		localStorage.removeItem('user')
			// 		localStorage.removeItem('token')
			// 		location.reload()
			// 	}
			// 	if (error.error.message) {
			// 		this.notification.error(error.error.message)
			// 		return throwError(error.error.message)
			// 	}
			//
			// 	if (error.error.errors) {
			// 		return throwError(error.error.errors)
			// 	}
			//
			// 	return throwError(error)
			// }))
	}
}
