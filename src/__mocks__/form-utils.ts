// eslint-disable-next-line @typescript-eslint/no-empty-function
export const formEventMock = { preventDefault: (): void => { } };

export const changeEventMock = (value: string) => ({
  currentTarget: {
    value,
  },
});
