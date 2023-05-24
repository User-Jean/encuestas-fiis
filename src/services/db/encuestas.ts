import {
	collection,
	addDoc,
	updateDoc,
	onSnapshot,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query
} from 'firebase/firestore';
import { FireBaseGetStore } from '../../firebase';
import { Encuesta } from '../../app/shared/types';

const collectionName = 'encuestas';
const collectionNameQuestion = 'questions';

export const saveEncuesta = ({
	title,
	description,
	questions,
}: Pick<Encuesta, 'title' | 'description' | 'questions'>) =>
	addDoc(collection(FireBaseGetStore, collectionName), {
		title,
		description,
		questions,
		fecha: new Date(),
		status: 'Pendiente'
	});

export const updateEncuesta = (id: string, updatedFields: any) =>
	updateDoc(doc(FireBaseGetStore, collectionName, id), updatedFields);

export const finalizarEncuesta = (id: string) =>
	updateDoc(doc(FireBaseGetStore, collectionName, id), {status: 'Finalizado'});

export const onGetLinks = (callback: () => void) => {
	const unsub = onSnapshot(
		collection(FireBaseGetStore, collectionName),
		callback
	);
	return unsub;
};

export const getEncuestas = () =>
	getDocs(collection(FireBaseGetStore, collectionName));

export const deleteEncuesta = (id: string) =>
	deleteDoc(doc(FireBaseGetStore, collectionName, id));

export const getEncuesta = (id: string) =>
	getDoc(doc(FireBaseGetStore, collectionName, id));

export const getPreguntas = (id: string) => 
	getDocs(query(collection(FireBaseGetStore, collectionName, id, collectionNameQuestion), orderBy('date', 'asc')))

export const deletePregunta = (idEncuesta: string, idPregunta: string) => 
	deleteDoc(doc(FireBaseGetStore, collectionName, idEncuesta, collectionNameQuestion, idPregunta))

export const savePregunta = (idEncuesta: string) => 
	addDoc(collection(FireBaseGetStore, collectionName, idEncuesta, collectionNameQuestion), {options: [], name: 'Prueba', type: 'Respuesta simple', date: new Date()});

export const updatePregunta = (idEncuesta: string, idPregunta: string, updatedFields: any) => 
	updateDoc(doc(FireBaseGetStore, collectionName, idEncuesta, collectionNameQuestion, idPregunta), updatedFields);

