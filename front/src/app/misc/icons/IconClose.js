/* react-web */
import React from 'react';
import Icone from './Icone';
import SuperComponent from '../components/SuperComponent';

export default class IconClose extends SuperComponent {

	render() {
		return <Icone pathCode={IconClose.pathCode}/>;
	}

}
IconClose.pathCode =
	"M336.559,68.611L231.016,174.165l105.543,105."
	+ "549c15.699,15.705,15.699,41.145,0,56.85   "
	+ "c-7.844,7.844-18.128,11.769-28.407,11.769c"
	+ "-10.296,0-20.581-3.919-28.419-11.769L174.1"
	+ "67,231.003L68.609,336.563   c-7.843,7.844-"
	+ "18.128,11.769-28.416,11.769c-10.285,0-20.5"
	+ "63-3.919-28.413-11.769c-15.699-15.698-15.6"
	+ "99-41.139,0-56.85   l105.54-105.549L11.774"
	+ ",68.611c-15.699-15.699-15.699-41.145,0-56."
	+ "844c15.696-15.687,41.127-15.687,56.829,0l1"
	+ "05.563,105.554   L279.721,11.767c15.705-15"
	+ ".687,41.139-15.687,56.832,0C352.258,27.466"
	+ ",352.258,52.912,336.559,68.611z";

IconClose.defaultProps = SuperComponent.defaultProps;
