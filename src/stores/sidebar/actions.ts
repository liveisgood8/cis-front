import { createAction } from '@reduxjs/toolkit';

export const reverseVisibleAction = createAction<void, '@@sidebar/reverseVisible'>('@@sidebar/reverseVisible');
