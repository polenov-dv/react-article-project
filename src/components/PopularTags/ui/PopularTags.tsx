import { useState, useEffect } from 'react';
import cls from './PopularTags.module.scss';
import { useFetching } from 'hooks/useFetching/useFetching';
import PostService from 'API/PostService';
import { ErrorMessage } from 'components/ErrorMessage';
import { Tag as TagModel } from 'models/Tag/Tag';

interface PopularTagsProps {
	createActiveTag: (activeTag: any) => void;
}

export const PopularTags = ({ createActiveTag }: PopularTagsProps) => {

	const [tags, setTags] = useState<TagModel[]>([]);

	const [fetchTags, isTagsLoading, tagsError] = useFetching(async () => {
		const response = await PostService.getTags();
		setTags(response.data);
	});

	useEffect(() => {
		fetchTags();
	}, [])

	return (
		<div className={cls.content}>
			<p className={cls.title}>Популярные теги:</p>
			{tagsError && <ErrorMessage textMessage='Ошибка загрузки данных' />}
			{!isTagsLoading && tags &&
				<div className={cls.link_list}>
					{tags.map((tag, index) => (
						<span key={index} onClick={() => createActiveTag(tag.name)} className={cls.link}>  {tag.name}</span>
					))}
				</div>
			}
		</div>
	);
};
