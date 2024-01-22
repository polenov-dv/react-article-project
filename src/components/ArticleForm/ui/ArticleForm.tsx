import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './ArticleForm.module.scss';
import PostService from 'API/PostService';
import { Article as ArticleModel } from 'models/Article/Article';
import { useFetching } from 'hooks/useFetching/useFetching';
import { AuthorizationContext } from 'context/AuthorizationContext';
import { ErrorMessage } from 'components/ErrorMessage';
import { Tag as TagModel } from 'models/Tag/Tag';
import { Loader } from 'components/Loader';

interface PropsArticleForm {
	type: 'create' | 'change';
	article?: ArticleModel;
}

export const ArticleForm = ({ type, article }: PropsArticleForm) => {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tagList, setTagList] = useState('');
	const [countArticle, setCountArticle] = useState(0);
	const [countTag, setCountTag] = useState(0);
	const [error, setError] = useState('');
	const [tags, setTags] = useState<TagModel[]>([]);
	const { user } = useContext(AuthorizationContext);
	const router = useNavigate();

	const [fetchArticle, isArticleLoading, articleError] = useFetching(async () => {
		const response = await PostService.getAllArticles();
		const lastArticle: ArticleModel = response.data.pop();
		setCountArticle(+lastArticle.id);
	})

	const [fetchTags, isTagsLoading, tagsError] = useFetching(async () => {
		const response = await PostService.getTags();
		setTags(response.data);

		const lastTag: TagModel = response.data.pop();
		setCountTag(+lastTag.id);
	});

	useEffect(() => {
		fetchArticle();
		fetchTags();
	}, [])

	useEffect(() => {
		if (type === 'change') {
			setTitle(article.title);
			setDescription(article.description);
			setTagList(article.tagList);
		}
	}, [article])

	const createError = () => {
		let error = '';
		if (!title) {
			error = 'Не указан заголовок!';
		} else if (!description) {
			error = 'Не указано описание!';
		} else if (!tagList) {
			error = 'Не указан список тегов!';
		} else if (!user) {
			error = 'Необходимо авторизоватся!';
		}
		if (error) {
			setError(error);
		}
	}

	const createTags = () => {
		const newTagList = tagList.split(' ');
		newTagList.forEach((newTag) => {
			let status = true;
			tags.forEach((activeTag) => {
				if (activeTag.name === newTag) {
					status = false;
				}
			});
			if (status) {
				PostService.createTags(String(+countTag + 1), newTag);
			}
		})
	}

	const createArticle = () => {
		if (title && description && tagList && user !== '') {
			const today = new Date();
			PostService.createArticle(
				String(+countArticle + 1),
				title,
				description,
				user,
				'assets/images/bacteria.svg',
				today.toLocaleString(),
				tagList
			);

			createTags();
			setTitle('');
			setDescription('');
			setTagList('');
			setTimeout(() => {
				router(`/`);
			}, 100);
		} else {
			createError();
		}
	}

	const changeArticle = () => {
		if (title && description && tagList && user !== '') {
			const today = new Date();
			PostService.changeArticle(
				article.id,
				title,
				description,
				user,
				article.autorIcon,
				today.toLocaleString(),
				tagList,
				article.likes,
				article.favorite
			);

			createTags();
			setTitle('');
			setDescription('');
			setTagList('');
			setTimeout(() => {
				router(`/`);
			}, 100);
		} else {
			createError();
		}
	}

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (type === 'create') {
			createArticle();
		} else {
			changeArticle();
		}
	}

	if (articleError || tagsError) {
		return (
			<ErrorMessage textMessage='Ошибка загрузки данных' />
		);
	}

	return (
		<>
			{isArticleLoading || isTagsLoading ? <Loader /> :
				<div className={cls.content}>
					{
						error ? <ErrorMessage textMessage={error} /> : null
					}
					<form onSubmit={handleSubmit}>
						<fieldset className={cls.form_content}>
							<fieldset className={cls.form_group}>
								<input
									type="text"
									className={cls.form_control}
									placeholder='Заголовок'
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</fieldset>

							<fieldset className={cls.form_group}>
								<textarea
									name=""
									className={cls.form_area}
									placeholder='Описание'
									value={description}
									onChange={e => setDescription(e.target.value)}
								>
								</textarea>
							</fieldset>
							<fieldset className={cls.form_group}>
								<input
									type="text"
									className={cls.form_control}
									placeholder='Теги'
									value={tagList}
									onChange={e => setTagList(e.target.value)}
								/>
							</fieldset>

							<fieldset className={cls.form_button}>
								<button type='submit'>
									{
										type === 'create' ? 'Создать' : 'Изменить'
									}
								</button>
							</fieldset>
						</fieldset>
					</form>
				</div >
			}
		</>
	);
};
