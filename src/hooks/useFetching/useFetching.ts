import { useState } from "react";

export const useFetching = (callback: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetching = async (id?: number) => {
		try {
			setIsLoading(true);
			await callback(id);
		} catch (e) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	}

	return [fetching, isLoading, error] as const;;;
}