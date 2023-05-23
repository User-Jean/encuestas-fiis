export interface Encuesta {
	id: string;
	description: string;
	title: string;
	fecha: Date;
	questions: Question[];
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
