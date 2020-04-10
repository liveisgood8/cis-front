import { ISideBarState } from '../types';
import { reverseVisibleAction } from '../actions';
import { sideBarReduces } from '../reducer';

describe('sidebar reducer', () => {
  it('reverse visible action', () => {
    const state: ISideBarState = {
      isVisible: false,
    };

    const modifiedState = sideBarReduces(state, reverseVisibleAction());
    expect(modifiedState)
      .toStrictEqual({
        isVisible: true,
      } as ISideBarState);

    expect(sideBarReduces(modifiedState, reverseVisibleAction()))
      .toStrictEqual({
        isVisible: false,
      } as ISideBarState);
  });
});
