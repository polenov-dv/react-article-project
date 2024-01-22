import { useContext } from 'react';
import cls from './FeedToggle.module.scss';
import { AuthorizationContext } from 'context/AuthorizationContext';

interface FeedToggleProps {
	tagName: string;
	isMyTag: boolean;
	createActiveTag: (activeTag: string) => void;
	createMyTag: (status: boolean) => void;
}

export const FeedToggle = ({ tagName, isMyTag, createActiveTag, createMyTag }: FeedToggleProps) => {

	const { user } = useContext(AuthorizationContext);

	return (
		<div className={cls.content}>
			<ul className={cls.link_list}>
				{user &&
					<li className={cls.link_item}>
						<span
							onClick={() => createMyTag(true)}
							className={tagName === '' && isMyTag === true ? cls.link_active : cls.link}
						>
							Ваши статьи
						</span>
					</li>
				}
				<li className={cls.link_item}>
					<span
						onClick={() => createActiveTag('')}
						className={tagName === '' && isMyTag === false ? cls.link_active : cls.link}
					>
						Все статьи
					</span>
				</li>
				{tagName &&
					<li className={cls.link_item}>
						<span className={cls.link_active}># {tagName}</span>
					</li>
				}
			</ul>
		</div >
	);
};
