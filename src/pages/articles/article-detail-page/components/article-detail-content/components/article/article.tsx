import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'shared-components/avatar';
import { Typography } from 'shared-components/typography';
import { Icon } from 'shared-components/icon';
import { getArticleDetail, getIsCreatorArticle } from 'redux-stores/stores/article-detail/selectors';
import { Button } from 'shared-components/button';
import { Link } from 'shared-components/link';
import { ROUTES_PATH } from 'constants/routers';
import { ArticleBlock } from '../article-block';
import styles from '../../article-detail-content.module.scss';

export const Article = () => {
  const isCreatorArticle = useSelector(getIsCreatorArticle);
  const article = useSelector(getArticleDetail);
  const navigate = useNavigate();
  const onGoToBack = () => {
    navigate(-1);
  };

  const renderBack = () => (
    <Button onClick={onGoToBack} color="secondary" className={styles.back}>
      ← К списку
    </Button>
  );

  const renderRedactor = () => isCreatorArticle && (
    <Link to={`${ROUTES_PATH.ARTICLE_DETAIL}/${article?.id}/edit`}>
      <Icon name="redactor" />
    </Link>
  );

  return (
    <>
      <div className={styles.wrapperHeader}>
        { renderBack() }
        { renderRedactor() }
      </div>
      <Avatar src={article?.img} className={styles.avatar} alt="article" size={180} />
      <Typography size="large" className={styles.title} tag="h1">{article?.title}</Typography>
      <Typography size="medium-large" className={styles.subtitle}>{article?.subtitle}</Typography>
      <div className={styles.wrapperAdditions}>
        <Icon name="eye" fill="secondary" />
        <Typography>{article?.views}</Typography>
      </div>
      <div className={cn(styles.wrapperAdditions, styles.lastWrapperAdditions)}>
        <Icon name="calendar" fill="secondary" />
        <Typography>{article?.createdAt}</Typography>
      </div>
      {article?.blocks?.map(ArticleBlock)}
    </>
  );
};
