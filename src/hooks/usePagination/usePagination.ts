import { useMemo } from 'react';

export const usePagination = (count: number) => {
	let pages = useMemo(() => {
		let arr = [];
		for (let i = 0; i < count; i++) {
			arr.push(i + 1);
		}
		return arr;
	}, [count])
	return pages;
}