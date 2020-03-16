import { createAction } from '@reduxjs/toolkit';
import { IToastDefinition } from './types';

export const addToastAction = createAction<IToastDefinition>('@@toasts/add');
export const clearToastAction = createAction<void>('@@toasts/clear');
