/* crud-java */
import React from 'react';
import AlignItens from '../../misc/consts/enums/AlignItens';
import ClienteCampos from './ClienteCampos';
import ClienteCols from './ClienteCols';
import ClienteConsulta from './ClienteConsulta';
import ClienteEdit from './ClienteEdit';
import ClienteUtils from './ClienteUtils';
import EntityCampos from '../../../fc/components/EntityCampos';
import FcBotao from '../../../fc/components/FcBotao';
import FormGenerico from '../../../fc/components/FormGenerico';
import LayoutApp from '../../../fc/components/LayoutApp';
import ModalConfirmar from '../../../fc/components/ModalConfirmar';
import Permissao from '../../../fc/components/Permissao';
import Session from '../../estado/Session';
import Style from '../../misc/utils/Style';
import Tabela from '../../../fc/components/tabela/Tabela';
import Tb from '../../../web/Tb';
import TextAlign from '../../misc/consts/enums/TextAlign';

export default class ClienteFormConsulta extends FormGenerico {
	constructor(props){
		super(props);
		this.state.showEdit = false;
		this.state.showConfirmLogout = false;
	}
	columns = [];
	titulo;
	widthTotal = 0;
	permissao;
	normalCols;
	grupoCols;

	getConsulta() {
		return ClienteConsulta.getInstance();
	}

	novo() {
		this.setEdit(ClienteUtils.getInstance().novo());
	}

	edit(id) {
		ClienteCampos.getInstance().edit(id, o => this.setEdit(o));
	}

	setEdit(o) {
		ClienteCampos.getInstance().setCampos(o);
		this.setShowEdit(true);
	}

	renderEdit() {
		return <ClienteEdit onDelete={idP => this.delete(idP)} onClose={() => this.setShowEdit(false)} isModal={true}/>;
	}

	delete(idP) {
		if (!this.permissao.delete()) return;
		EntityCampos.excluir(ClienteCampos.getInstance().getEntidadePath(), idP, () => {
			let cps = ClienteConsulta.getInstance();
			let o = cps.dados.getItens().byId(idP);
			cps.dados.remove(o);
		});
	}

	onDeleteFunction() {
		if (!this.permissao.delete()) return null;
		return o => this.delete(o.getId());
	}

	getTable() {
		const cps = ClienteConsulta.getInstance();
		return (
			<Tabela
			bind={cps.dados}
			colunas={this.normalCols}
			colunasGrupo={this.grupoCols}
			onClick={o => this.edit(o.getId())}
			onDelete={this.onDeleteFunction()}
			/>
		);
	}

	getTop() {
		return (
			<Tb>
				<tr>
					<td style={ClienteFormConsulta.TD_BUTTONS_LEFT}>
						{super.getTop()}
					</td>
					<td style={ClienteFormConsulta.TD_BUTTONS_RIGHT}>
						{this.botaoNovo()}
					</td>
				</tr>
			</Tb>
		);
	}

	botaoNovo() {
		if (this.permissao.insert()) {
			return (
				<FcBotao
					title={"Novo"}
					onClick={() => this.novo()}
					style={ClienteFormConsulta.STYLE_BOTAO_MAIS_FILTROS}
				/>
			);
		} else {
			return null;
		}
	}

	getTitle() {
		return this.titulo;
	}

	getFooter() {
		return null;
	}

	componentDidMount2() {
		let consulta = this.getConsulta();
		this.observar(consulta);
		this.observar(consulta.pagina);
		this.observar(consulta.paginas);
		this.permissao = new Permissao("Cliente");
		this.titulo = "Cliente";
		this.normalCols = ClienteCols.getInstance().list;
		this.grupoCols = ClienteCols.getInstance().grupos;
	}

	getBody() {
		return (
			<div style={ClienteFormConsulta.STYLE_CONTEUDO.get()}>
				{this.renderConteudo()}
				{this.getModal()}
			</div>
		);
	}

	renderConteudo() {
		return (
			<div style={ClienteFormConsulta.STYLE_DIV_TABLE.get()}>
				{this.getTable()}
			</div>
		);
	}

	getModal() {
		if (this.state.showEdit) {
			return this.renderEdit();
		} else if (this.state.showConfirmLogout) {
			let session = Session.getInstance();
			return (
				<ModalConfirmar
					onCancel={() => this.setShowConfirmLogout(false)}
					onConfirm={() => session.efetuaLogout()}
				><span>Efetuar Logout do Sistema?</span></ModalConfirmar>
			);
		} else {
			return null;
		}
	}

	cancelar() {
		if (!this.state.showEdit) {
			super.cancelar();
		}
	}

	esc() {
		if (this.getConsulta().pagina.intValue() > 0) {
			this.getConsulta().pagina.clear();
		} else {
			this.setShowConfirmLogout(true);
		}
	}

	ctrlEnter() {
		if (this.getConsulta().pagina.intValue() < 1) {
			this.getConsulta().consultar();
		}
	}
	setWidthForm = o => this.setState({widthForm:o});
	setShowEdit = o => this.setState({showEdit:o});
	setShowConfirmLogout = o => this.setState({showConfirmLogout:o});

}
ClienteFormConsulta.TD_BUTTONS_LEFT = Style.create().alignItems(AlignItens.flexStart).textAlign(TextAlign.left).paddingTop(10).paddingBottom(10).paddingLeft(20).widthPercent(75).get();
ClienteFormConsulta.TD_BUTTONS_RIGHT = Style.create().alignItems(AlignItens.flexEnd).textAlign(TextAlign.right).paddingTop(10).paddingBottom(10).paddingRight(20).widthPercent(25).get();
ClienteFormConsulta.STYLE_DIV_TABLE = LayoutApp.createStyle().widthPercent(100).marginTop(20);
ClienteFormConsulta.STYLE_BOTAO_MAIS_FILTROS = LayoutApp.createStyle().marginLeft(10);
ClienteFormConsulta.STYLE_CONTEUDO = LayoutApp.createStyle().textAlign(TextAlign.center);

ClienteFormConsulta.defaultProps = FormGenerico.defaultProps;
