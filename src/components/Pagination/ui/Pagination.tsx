import cls from './Pagination.module.scss';
import { usePagination } from 'hooks/usePagination/usePagination';

interface Props {
	page: number;
	totalPages: number;
	setPage: (num: number) => void;
}

export const Pagination = ({ page, totalPages, setPage }: Props) => {

	//Формирование массива кнопок пагинации
	const pages = usePagination(totalPages);

	//Изменение номера сираницы
	const changePage = (item: number) => {
		setPage(item)
	}

	return (
		<div className={cls.pagination}>
			{pages.map((item, index) => (
				<span
					key={item}
					className={item === page ? `${cls.pagination_item} ${cls.pagination_item_current}` : cls.pagination_item}
					onClick={() => changePage(item)}
				>
					{item}
				</span>
			))}
		</div>
	);
};
