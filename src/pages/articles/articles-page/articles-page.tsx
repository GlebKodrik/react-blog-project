import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { requestGetArticles } from 'redux-stores/stores/articles/requests/request-get-articles';
import { articleActions, EArticlesSort } from 'redux-stores/stores/articles';
import { useSearchParams } from 'react-router-dom';
import {
  getArticlesPage,
  getArticlesIsHasMore,
  getArticlesIsLoading,
  getArticlesIsInit,
} from 'redux-stores/stores/articles/selectors';
import { InfiniteScroll } from 'shared-components/infinite-scroll';

import { ScrollToTop } from 'feature/scroll-to-top';
import { TOrderFilter } from 'redux-stores/stores/types';
import { TArticlesTypes } from 'redux-stores/stores/articles/types';
import { ArticleList } from './components/article-list';
import { ArticlesFilters } from './components/articles-filters';

export const ArticlesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = useSelector(getArticlesPage);
  const isHasMore = useSelector(getArticlesIsHasMore);
  const isLoading = useSelector(getArticlesIsLoading);
  const isInit = useSelector(getArticlesIsInit);
  const dispatch = useAppDispatch();

  const onScrollEnd = () => {
    if (isHasMore && !isLoading) {
      dispatch(requestGetArticles({ page: page + 1 }));
      dispatch(articleActions.setPage(page + 1));
    }
  };

  useEffect(() => {
    if (!isInit) {
      dispatch(articleActions.init({
        params: {
          order: searchParams.get('order') as TOrderFilter || 'asc',
          search: searchParams.get('search') || '',
          sort: searchParams.get('sort') as EArticlesSort || EArticlesSort.VIEWS,
          type: searchParams.get('type') as TArticlesTypes || 'all',
        },
      }));
      dispatch(requestGetArticles({ page: 1 }));
    }
  }, []);

  return (
    <ScrollToTop>
      <InfiniteScroll
        callbackScrollEnd={onScrollEnd}
      >
        <ArticlesFilters />
        <ArticleList />
      </InfiniteScroll>
    </ScrollToTop>

  );
};
