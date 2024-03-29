import { DeepPartial } from '@reduxjs/toolkit';
import { TUser, TProfileSchema } from './types';
import { profileActions, profileReducer } from './profile-slice';
import { saveProfileData } from './requests/save-profile-data';

describe('Test profile-slice', () => {
  const data: TUser = {
    id: '1',
    username: 'Kodrik',
    age: '22',
    currency: 'RUB',
    lastname: 'admin',
    country: 'Armenia',
    city: 'Moscow',
    first: 'Gleb',
  };
  test('Set isReadOnly', () => {
    const state: DeepPartial<TProfileSchema> = { isReadOnly: false };
    expect(profileReducer(
      state as TProfileSchema,
      profileActions.changeIsReadOnly(true),
    )).toEqual({ isReadOnly: true });
  });

  test('Set edit', () => {
    const state: DeepPartial<TProfileSchema> = { data, editForm: { username: 'test' } };
    expect(profileReducer(
      state as TProfileSchema,
      profileActions.cancelEdit(),
    )).toEqual({ data, editForm: data });
  });

  test('Update profile', () => {
    const state: DeepPartial<TProfileSchema> = { editForm: { username: 'test' } };
    expect(profileReducer(
      state as TProfileSchema,
      profileActions.updateProfileData({ username: 'testrewr' }),
    )).toEqual({ editForm: { username: 'testrewr' } });
  });

  test('Save profile pending', () => {
    const state: DeepPartial<TProfileSchema> = { saveProfile: { isLoading: true } };
    expect(profileReducer(
      state as TProfileSchema,
      saveProfileData.pending,
    )).toEqual({ saveProfile: { isLoading: true } });
  });

  test('Save profile fulfilled', () => {
    const state: DeepPartial<TProfileSchema> = {
      saveProfile: { isLoading: true }, isReadOnly: true, data: undefined, editForm: undefined,
    };
    expect(profileReducer(
      state as TProfileSchema,
      saveProfileData.fulfilled(data, '1', ''),
    )).toEqual({
      saveProfile: { isLoading: false }, isReadOnly: true, data, editForm: data,
    });
  });
});
