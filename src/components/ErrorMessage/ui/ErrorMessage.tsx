import cls from './ErrorMessage.module.scss';

interface ErrorMessageProps {
	textMessage: string;
}

export const ErrorMessage = ({ textMessage }: ErrorMessageProps) => {

	return (
		<div className={textMessage ? cls.content : cls.content_hidden}>
			<p className={cls.text}>{textMessage}</p>
		</div>
	);
};
