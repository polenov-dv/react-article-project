import React, { createContext } from "react";

export interface AuthorizationContextProps {
	user?: string;
	setUser?: React.Dispatch<React.SetStateAction<string>>;
	id?: string;
}

export const AuthorizationContext = createContext<AuthorizationContextProps>({});

export const LOCAL_STORAGE_AUTORIZATION_KEY = 'authorization';