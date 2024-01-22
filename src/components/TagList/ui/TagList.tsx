import cls from './TagList.module.scss';

interface PropsTagList {
	tags: string;
	position: string;
}

export const TagList = ({ tags, position }: PropsTagList) => {
	return (
		<ul className={cls.list_tags} style={{ justifyContent: position }}>
			{
				tags.split(' ').map((item, index) => (
					<li key={index} className={cls.tag}>{item}</li>
				))
			}
		</ul >
	);
};
