/* front-constructor */
import Console from '../../app/misc/utils/Console';
import UCommons from '../../app/misc/utils/UCommons';
import UString from '../../app/misc/utils/UString';

export default class ServicoImpl {

	uriBase;
	getToken;
	headersDefault;

	constructor(uriBase, getTokenFunction) {
		this.uriBase = uriBase;
		this.getToken = getTokenFunction;
		this.headersDefault = new Headers();
		this.headersDefault.set("Content-Type", "application/json; charset=UTF-8");
		this.headersDefault.set("Accept", "*/*");
		this.headersDefault.set("Access-Control-Allow-Origin", "*");
		this.headersDefault.set("credentials", "include");
		this.headersDefault.set("Access-Control-Allow-Credentials", "true");
	}

	method(method, uri, params, h, onSuccess, onError, onFinally) {

		let bodyRequest = UString.toString(params);

		if (UCommons.notEmpty(this.getToken)) {
			const token = this.getToken();
			if (UString.notEmpty(token)) {
				if (UString.notEmpty(bodyRequest)) {
					bodyRequest = UString.ignoreRight(bodyRequest, 1) + ", ";
				} else {
					bodyRequest = "{";
				}
				bodyRequest += "\"token\":\"" + token + "\"}";
				this.headersDefault.set("token", token);
				this.headersDefault.set("Authorization", "Bearer " + token);
			}
		}

		if (UString.equals(method, "GET")) {
			bodyRequest = null;
		}

		const fetchParams = {
			body: bodyRequest,
			headers: this.headersDefault,
			method: method,
			mode: "cors",
			cache: "default",
			credentials: "omit"
		};

		fetch(this.uriBase + uri, fetchParams)
		.then(res => {
			try {
				res.json().then(body => {
					const o = {};
					o.body = body;
					o.data = res.data;
					o.url = res.url;
					let status = res.status;
					if (status >= 200 && status < 300) {
						onSuccess(o);
					} else {
						onError(o);
					}
				}).catch(body => {
					Console.error("erro", body);
				});
			} finally {}
		})
		.catch(o => {
			onError(o);
		})
		.finally(() => {
			if (UCommons.notEmpty(onFinally)) {
				onFinally();
			}
		})
		;
	}

	addInterceptor(interceptor) {
		/* TODO Auto-generated method stub*/

	}

}
