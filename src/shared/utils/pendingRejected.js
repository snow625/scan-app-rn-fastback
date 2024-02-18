export const pending = (store) => ({
  ...store,
  loading: true,
  error: null,
});

export const rejected = (store, { payload }) => ({
  ...store,
  loading: false,
  error: payload,
});

export default { pending, rejected };
