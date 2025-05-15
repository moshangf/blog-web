import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    userInfo: {
      id: null,
      nickname: "",
      email: "",
      avatar: "",
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    getUserInfo: (state) => state.userInfo,
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUserInfo(state, userInfo) {
      state.userInfo.id = userInfo.id;
      state.userInfo.nickname = userInfo.nickname;
      state.userInfo.email = userInfo.email;
      state.userInfo.avatar = userInfo.headPortrait;
      state.accessToken = userInfo.accessToken;
      state.refreshToken = userInfo.refreshToken;
    },
    clearUserInfo(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userInfo = {
        id: null,
        nickname: "",
        email: "",
        avatar: "",
      };
    },
  },
  actions: {
    logout({ commit }) {
      commit("clearUserInfo");
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
