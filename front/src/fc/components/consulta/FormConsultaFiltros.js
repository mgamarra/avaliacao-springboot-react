/* front-constructor */
import React from 'react';
import BindingString from '../../../app/campos/support/BindingString';
import CampoConsulta from './CampoConsulta';
import CommonStyles from '../../../app/misc/styles/CommonStyles';
import ConsultaStyles from './ConsultaStyles';
import FcBotao from '../FcBotao';
import InputBind from '../../../antd/InputBind';
import Style from '../../../app/misc/utils/Style';
import SuperComponent from '../../../app/misc/components/SuperComponent';
import Tb from '../../../web/Tb';
import TextAlign from '../../../app/misc/consts/enums/TextAlign';
import UString from '../../../app/misc/utils/UString';
import {SearchOutlined} from '@ant-design/icons';

export default class FormConsultaFiltros extends SuperComponent {

	filtro = new BindingString("", 50);

	render() {
		return (
			<Tb style={FormConsultaFiltros.TABLE_STYLE} className={"table-filtros"}>
				{this.botoesSuperiores()}
				{this.table()}
				{this.botoesInferiores()}
			</Tb>
		);
	}

	botoesSuperiores() {
		return (
			<tr>
				<td colSpan={2} style={ConsultaStyles.COL_AB}>
					{this.inputFiltro()}
				</td>
				<td colSpan={5} style={ConsultaStyles.COL_CDEFG}>
					<div style={FormConsultaFiltros.STYLE_BUTTONS}>
						<FcBotao
							title={"Limpar Filtros"}
							onClick={() => {
								this.props.consulta.limparFiltros();
								this.filtro.clear();
							}}
							style={Style.create().marginRight(5)}
						/>
						{this.botaoConsultar()}
					</div>
				</td>
			</tr>
		);
	}

	botoesInferiores() {
		return (
			<tr>
				<td colSpan={8}>
					<div style={FormConsultaFiltros.STYLE_BUTTONS}>
						{this.botaoConsultar()}
					</div>
				</td>
			</tr>
		);
	}

	botaoConsultar() {
		return (
			<FcBotao
				title={"Consultar (Ctrl + Enter)"}
				onClick={() => this.props.consulta.consultar()}
			/>
		);
	}

	table() {

		let itens = this.props.consulta.campos.filter(o => UString.like(o.titulo, this.filtro.get()));

		if (itens.isEmpty()) {
			return null;
		} else {
			return this.map(itens, o => o.render());
		}

	}

	inputFiltro() {
		return (
			<InputBind
				bind={this.filtro}
				after={<SearchOutlined/>}
			/>
		);
	}

	componentDidMount() {
		this.observar(this.props.consulta);
		this.observar(this.filtro);
	}
}
FormConsultaFiltros.STYLE_BUTTONS = Style.create().textAlign(TextAlign.right).marginTop(10).marginBottom(10).get();
FormConsultaFiltros.TABLE_STYLE = CommonStyles.W100P.copy().fontSize(CampoConsulta.fontSize);

FormConsultaFiltros.defaultProps = SuperComponent.defaultProps;
