import cls from './NotFound.module.scss';

const NotFound = () => {
	return (
		<main className='container'>
			<div className={cls.content}>
				<h1>
					<span className={cls.content_img}>😕</span>
					<br />
					Ничего не найдено
				</h1>
				<p className={cls.content_text}>
					К сожалени данная страница отсутствует
				</p>
			</div>
		</main>
	);
};

export default NotFound;