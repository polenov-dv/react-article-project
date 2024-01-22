import { ReactNode, useState } from 'react';
import { AuthorizationContext, LOCAL_STORAGE_AUTORIZATION_KEY } from 'context/AuthorizationContext';

interface AuthorizationProviderProps {
	children?: ReactNode;
}

export const AuthorizationProvider = ({ children }: AuthorizationProviderProps) => {

	const autor = localStorage.getItem(LOCAL_STORAGE_AUTORIZATION_KEY);
	const [user, setUser] = useState(autor);

	return (
		<AuthorizationContext.Provider value={{
			user,
			setUser
		}}>
			{children}
		</AuthorizationContext.Provider>
	);
};
