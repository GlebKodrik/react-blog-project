import React from 'react';
import { useSelector } from 'react-redux';
import {
  getComments,
  getCommentsIsFinish,
  getCommentsIsLoading,
} from 'redux-stores/stores/article-detail/selectors/get-comments';
import { CommentCard } from 'shared-components/comment-card';
import { useLanguage } from 'hooks/use-language';
import { LOCALES } from 'constants/locales';
import { Typography } from 'shared-components/typography';
import { ROUTES_PATH } from 'constants/routers';
import Loader from 'shared-components/loader';
import cn from 'classnames';
import styles from './article-detail-comments.module.scss';

export const ArticleDetailComments = () => {
  const { translation } = useLanguage(LOCALES.ARTICLE_DETAIL_PAGE);
  const comments = useSelector(getComments);
  const isLoading = useSelector(getCommentsIsLoading);
  const isFinishGetComments = useSelector(getCommentsIsFinish);
  const isNotComments = !comments || (isFinishGetComments && !comments.length);

  const renderMessageNotComments = () => (
    <Typography
      size="extra-large"
    >
      {translation('notComment')}
    </Typography>
  );

  return (
    <>
      <div className={cn(styles.wrapper, { [styles.wrapperNotComment]: isNotComments })}>
        {isNotComments && renderMessageNotComments()}
        {isLoading && <Loader className={styles.loader} />}
        {comments?.map(({ id, user, text }) => {
          if (user?.id) {
            return (
              <CommentCard
                key={id}
                avatar={user?.avatar}
                username={user?.username}
                comment={text}
                color="secondary"
                className={styles.comment}
                link={`${ROUTES_PATH.PROFILE}/${user.id}`}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};
