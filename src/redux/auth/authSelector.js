export const getUser = (store) => {
  return store.auth.user;
};

export const getUserIsAuth = (store) => {
  return store.auth.isAuth;
};

export const getUserToken = (store) => {
  return store.auth.token;
};

export const getAuthStore = (store) => {
  return store.auth;
};
