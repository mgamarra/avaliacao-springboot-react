/* react */
import Servico from './Servico';
import UInteger from '../app/misc/utils/UInteger';

export default class HttpMethod {

	constructor(method, uri, params, onSuccess) {

		this.uri = uri;
		this.onSuccess = onSuccess;
		this.method = method;

		if (UInteger.isInt(params)) {
			this.params = {id: UInteger.toInt(params)};
		} else {
			this.params = params;
		}

	}

	key;
	method;
	uri;
	params;
	onSuccess;
	onError = HttpMethod.onErrorDefault;
	onFinally;
	guardarNoMap = false;
	headers;

	static onErrorDefault;

	run() {
		Servico.getInstance().callMethod(this);
	}

	static post(uriP, paramsP, onSuccessP) {
		return new HttpMethod("POST", uriP, paramsP, onSuccessP);
	}
	static get(uriP, paramsP, onSuccessP) {
		return new HttpMethod("GET", uriP, paramsP, onSuccessP);
	}
	static delete(uriP, paramsP, onSuccessP) {
		return new HttpMethod("DELETE", uriP, paramsP, onSuccessP);
	}
	static put(uriP, paramsP, onSuccessP) {
		return new HttpMethod("PUT", uriP, paramsP, onSuccessP);
	}

	setHeaders(o){this.headers = o; return this;}
	setOnError(o){this.onError = o; return this;}
	setOnFinally(o){this.onFinally = o; return this;}
	setGuardarNoMap(o){this.guardarNoMap = o; return this;}
}
