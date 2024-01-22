import React from "react";
import { useNavigate } from 'react-router-dom';
import cls from "./ConfirmModal.module.scss";
import PostService from 'API/PostService';

interface Props {
	visible: boolean;
	id: string;
	setVisible: (status: boolean) => void;
}

export const ConfirmModal = ({ visible, id, setVisible }: Props) => {

	const router = useNavigate();

	const deleteArticle = () => {
		PostService.deleteArticle(id);
		setVisible(false);
		router('/');
	}

	const modalClasses = [cls.modalWindow];
	if (visible) {
		modalClasses.push(cls.active);
	}

	return (
		<div
			className={modalClasses.join(' ')}
			onClick={() => setVisible(false)}
		>
			<div
				className={cls.content}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			>
				<span className={cls.title}>Удалить выбранную статью?</span>
				<div className={cls.btn_wrapper}>
					<button className={cls.btn} onClick={deleteArticle}>Да</button>
					<button className={cls.btn} onClick={() => setVisible(false)}>Нет</button>
				</div>
			</div>
		</div>
	)
}