import { JSONBigInt } from '../js/common_utils';

export class HttpUtils {
	public static post(api: string, params: any): Promise<{ status: number; body?: any }> {
		return this.request('POST', api, params, '');
	}

	public static postWithAuth(api: string, params: any, auth: string): Promise<{ status: number; body?: any }> {
		return this.request('POST', api, params, auth);
	}

	public static postWithHeader(
		api: string,
		params: any,
		header: { [key: string]: string }
	): Promise<{ status: number; body?: any }> {
		return this.request('POST', api, params, null, header);
	}

	public static get(api: string): Promise<{ status: number; body?: any }> {
		return this.request('GET', api, null, '');
	}

	private static request(
		method: string,
		api: string,
		params: any,
		auth: string | null,
		header?: { [key: string]: string }
	): Promise<{ status: number; body?: any }> {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open(method, api);
			request.setRequestHeader('Content-Type', 'application/json');
			if (auth != null && auth !== '') {
				request.setRequestHeader('Authorization', auth);
			}
			if (header != null) {
				for (let key in header) {
					request.setRequestHeader(key, header[key]);
				}
			}
			let body = JSONBigInt.stringify(params);
			// let body = JSON.stringify(params);
			request.send(body);
			request.onload = () => {
				let body = null;
				if (request.responseText !== '') {
					body = JSONBigInt.parse(request.responseText);
				}
				resolve({
					status: request.status,
					body: body
				});
			};

			request.onerror = (e) => {
				console.error('API error: ', e);
				resolve({
					status: 500,
					body: { message: 'Internal service error!' }
				});
			};
		});
	}
}
