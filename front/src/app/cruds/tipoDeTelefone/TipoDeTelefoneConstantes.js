/* crud-java */
import IdText from '../../misc/utils/IdText';

export default class TipoDeTelefoneConstantes {
	static getList() {
		return TipoDeTelefoneConstantes.list;
	}
}
TipoDeTelefoneConstantes.RESIDENCIAL = new IdText(1, "Residencial");
TipoDeTelefoneConstantes.COMERCIAL = new IdText(2, "Comercial");
TipoDeTelefoneConstantes.CELULAR = new IdText(3, "Celular");
TipoDeTelefoneConstantes.list = [
	TipoDeTelefoneConstantes.RESIDENCIAL,
	TipoDeTelefoneConstantes.COMERCIAL,
	TipoDeTelefoneConstantes.CELULAR
];
