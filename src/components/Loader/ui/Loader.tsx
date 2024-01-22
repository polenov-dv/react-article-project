import cls from "./Loader.module.scss";

export const Loader = () => {
	return (
		<div className={cls.wrapper}>
			<div className={cls.loader}></div>
		</div>
	);
};