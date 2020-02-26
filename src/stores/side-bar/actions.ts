import { createAction } from '@reduxjs/toolkit';
import { ViewTypes } from './types';

export const changeViewTypeAction = createAction<ViewTypes, '@@sideBar/changeViewType'>(
  '@@sideBar/changeViewType');
