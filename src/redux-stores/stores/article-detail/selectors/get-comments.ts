import { TReduxStateScheme } from '../../../types/redux-state-scheme';

export const getComments = (state: TReduxStateScheme) => state.article?.comments.data;
export const getCommentsIsLoading = (state: TReduxStateScheme) => state.article?.comments.isLoading;