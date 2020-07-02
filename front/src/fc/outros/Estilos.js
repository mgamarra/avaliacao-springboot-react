/* front-constructor */
import Style from '../../app/misc/utils/Style';

export default class Estilos {

	static createWidth(value) {
		return Style.create().widthPercent(value).maxWidthPercent(value).minWidthPercent(value);
	}
}
Estilos.ICON_RIGHT = Style.create().marginLeft(10).get();
