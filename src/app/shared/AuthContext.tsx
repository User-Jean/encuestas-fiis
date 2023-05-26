import React, { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	User,
	UserCredential,
} from 'firebase/auth';
import { FireBaseGetAuth } from '../../firebase';

type AuthParams = {
	email: string;
	password: string;
};

type Context = {
	signup: (params: AuthParams) => Promise<UserCredential>;
	login: (params: AuthParams) => Promise<UserCredential>;
	user: User | null;
	logout: () => Promise<void>;
	loading: boolean;
	resetPassword: (email: string) => Promise<void>;
};

export const AuthContext = createContext<Context>({} as Context);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const signup = ({ email, password }: AuthParams) => {
		return createUserWithEmailAndPassword(FireBaseGetAuth, email, password);
	};

	const login = ({ email, password }: AuthParams) => {
		return signInWithEmailAndPassword(FireBaseGetAuth, email, password);
	};

	const logout = () => signOut(FireBaseGetAuth);

	const resetPassword = async (email: string) =>
		sendPasswordResetEmail(FireBaseGetAuth, email);

	useEffect(() => {
		const unsubuscribe = onAuthStateChanged(FireBaseGetAuth, (currentUser) => {
			localStorage.setItem('idUser', currentUser?.uid ?? '')
			localStorage.setItem('email', currentUser?.email ?? '')
			if(currentUser?.email == 'gavino@gmail.com' || currentUser?.email == 'gavino@unfv.edu.pe') 
				localStorage.setItem('perfil', 'admin');
			else 
				localStorage.setItem('perfil', 'user');

			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubuscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signup,
				login,
				user,
				logout,
				loading,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
