import React, { useEffect } from 'react';
import { DynamicModuleLoader, TReducersList } from 'redux-stores/components/dynamic-module-loader';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { useSelector } from 'react-redux';
import { TCurrency } from 'shared-components/currency/types';
import { TCountry } from 'shared-components/country/types';
import { useParams } from 'react-router-dom';
import { getUser } from 'redux-stores/stores/user/selectors/get-user';
import { LoaderWithOverlay } from 'shared-components/loader-with-overlay';
import { profileActions, profileReducer } from 'redux-stores/stores/profile';
import { requestGetProfileData } from 'redux-stores/stores/profile/requests/request-get-profile-data';
import {
  getIsLoading,
  getEditForm,
  getReadOnly,
  getError,
  getProfileData,
  getIsLoadingSaveProfile,
} from 'redux-stores/stores/profile/selectors';
import { saveProfileData } from 'redux-stores/stores/profile/requests/save-profile-data';
import { ProfileCard } from './components/profile-card';

const reducerList: TReducersList[] = [
  { name: 'profile', reducer: profileReducer },
];

export const Profile: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const user = useSelector(getUser);
  const isEdit = user?.id === id;
  const dispatch = useAppDispatch();
  const profileEditData = useSelector(getEditForm);
  const profileData = useSelector(getProfileData);
  const isLoading = useSelector(getIsLoading);
  const isLoadingSaveProfile = useSelector(getIsLoadingSaveProfile);
  const isReadOnly = useSelector(getReadOnly);
  const error = useSelector(getError);

  const onInputNameChange = (value: string) => {
    dispatch(profileActions.updateProfileData({ first: value }));
  };

  const onInputSurnameChange = (value: string) => {
    dispatch(profileActions.updateProfileData({ lastname: value }));
  };

  const onInputAgeChange = (value: string) => {
    dispatch(profileActions.updateProfileData({ age: value }));
  };

  const onInputCityChange = (value: string) => {
    dispatch(profileActions.updateProfileData({ city: value }));
  };

  const onInputUsernameChange = (value: string) => {
    dispatch(profileActions.updateProfileData({ username: value }));
  };

  const onInputAvatarChange = (value: string) => {
    dispatch(profileActions.updateProfileData({
      avatar: value,
    }));
  };

  const onChangeCurrencyValue = (value: TCurrency) => {
    dispatch(profileActions.updateProfileData({ currency: value }));
  };
  const onChangeCountryValue = (value: TCountry) => {
    dispatch(profileActions.updateProfileData({ country: value }));
  };

  const onButtonEdit = () => {
    dispatch(profileActions.changeIsReadOnly(false));
  };

  const onButtonCancelEdit = () => {
    dispatch(profileActions.cancelEdit());
    dispatch(profileActions.changeIsReadOnly(true));
  };

  const onProfileSave = () => {
    if (id) {
      dispatch(saveProfileData(id));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(requestGetProfileData(id));
    }
  }, []);

  return (
    <DynamicModuleLoader reducers={reducerList}>
      {
        isLoading
          ? <LoaderWithOverlay />
          : (
            <ProfileCard
              onButtonEdit={onButtonEdit}
              onButtonCancelEdit={onButtonCancelEdit}
              onProfileSave={onProfileSave}
              onInputAgeChange={onInputAgeChange}
              onInputCityChange={onInputCityChange}
              onInputSurnameChange={onInputSurnameChange}
              onInputNameChange={onInputNameChange}
              onInputUsernameChange={onInputUsernameChange}
              onInputAvatarChange={onInputAvatarChange}
              onChangeCurrencyValue={onChangeCurrencyValue}
              onChangeCountryValue={onChangeCountryValue}
              profileEditData={profileEditData}
              isLoading={isLoadingSaveProfile}
              isProfileDataReceivedSuccessfully={Boolean(error)}
              isReadOnly={isReadOnly}
              profileData={profileData}
              isEdit={isEdit}
            />
          )
      }
    </DynamicModuleLoader>
  );
};
