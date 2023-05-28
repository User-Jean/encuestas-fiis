export interface Encuesta {
	id: string;
	description: string;
	title: string;
	fecha: Date;
	fechaFinal: Date;
	questions: Question[];
	status: string;
}

export enum TypeQuestion {
	Multiple = 'Opción multiple',
	Regular = 'Respuesta simple',
}

export interface Question {
	id: string;
	name: string;
	type: TypeQuestion;
	options: string[];
}
