/* crud-java */
import BindingString from '../../campos/support/BindingString';
import UConstantes from '../../misc/utils/UConstantes';
import UString from '../../misc/utils/UString';

export default class BindingNome extends BindingString {

	caracteresValidos;

	constructor() {
		super("Nome", 100);
		this.caracteresValidos =
		UConstantes.letrasMaiusculas
		.concat(UConstantes.letrasMinusculas)
		.concat(UConstantes.acentuadasMaiusculas)
		.concat(UConstantes.acentuadasMinusculas)
		.concat(UConstantes.numeros)
		.concat([" "])
		;
	}

	getInvalidMessagePrivate() {
		let s = this.get();
		if (UString.length(s.trim()) < 3) {
			return "Deve conter pelo menos 3 caracteres";
		}
		return null;
	}

	formatParcial(s) {
		let espaco = s.endsWith(" ");
		s = UString.trimPlus(s);
		s = UString.mantemSomenteOsSeguintesCaracteres(s, this.caracteresValidos);
		if (espaco) {
			s += " ";
		}
		return s;
	}

}
