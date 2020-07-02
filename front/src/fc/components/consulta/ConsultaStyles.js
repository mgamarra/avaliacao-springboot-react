/* front-constructor */
import Estilos from '../../outros/Estilos';
import TextAlign from '../../../app/misc/consts/enums/TextAlign';

export default class ConsultaStyles {}
ConsultaStyles.A = 20;
ConsultaStyles.B = 2;
ConsultaStyles.C = 16;
ConsultaStyles.G = ConsultaStyles.B;
ConsultaStyles.DEF = 100 - ConsultaStyles.A - ConsultaStyles.B - ConsultaStyles.C - ConsultaStyles.G;
ConsultaStyles.D = (ConsultaStyles.DEF - ConsultaStyles.B) / 2;
ConsultaStyles.E = ConsultaStyles.B;
ConsultaStyles.F = ConsultaStyles.D;
ConsultaStyles.COL_A = Estilos.createWidth(ConsultaStyles.A).textAlign(TextAlign.right).paddingRight(5).get();
ConsultaStyles.COL_B = Estilos.createWidth(ConsultaStyles.B).textAlign(TextAlign.center).get();
ConsultaStyles.COL_AB = Estilos.createWidth(ConsultaStyles.A + ConsultaStyles.B).get();
ConsultaStyles.COL_C = Estilos.createWidth(ConsultaStyles.C).get();
ConsultaStyles.COL_D = Estilos.createWidth(ConsultaStyles.D).get();
ConsultaStyles.COL_E = Estilos.createWidth(ConsultaStyles.E).textAlign(TextAlign.center).get();
ConsultaStyles.COL_F = Estilos.createWidth(ConsultaStyles.F).get();
ConsultaStyles.COL_G = Estilos.createWidth(ConsultaStyles.G).textAlign(TextAlign.center).get();
ConsultaStyles.COL_DEF = Estilos.createWidth(ConsultaStyles.DEF).get();
ConsultaStyles.COL_CDEFG = Estilos.createWidth(ConsultaStyles.C+ConsultaStyles.DEF+ConsultaStyles.G).get();
