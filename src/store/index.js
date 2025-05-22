import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({  state: {
    accessToken: null,
    refreshToken: null,
    userInfo: {
      id: null,
      nickname: "",
      email: "",
      avatar: "",
    },
    visitorId: null,
    lastVisitDate: null,
    authorInfo: {
      lastUpdate: null, // 添加最后更新时间
      avatar: "",
      name: "",
      description: "",
      social: {
        github: "",
        gitee: "",
        email: ""
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    getUserInfo: (state) => state.userInfo,
    getVisitorId: (state) => state.visitorId,
    getLastVisitDate: (state) => state.lastVisitDate,
    getAuthorInfo: (state) => state.authorInfo,
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
    setVisitorInfo(state, { visitorId, visitDate }) {
      state.visitorId = visitorId;
      state.lastVisitDate = visitDate;
    },
    setAuthorInfo(state, authorInfo) {
      state.authorInfo.avatar = authorInfo.avatar;
      state.authorInfo.name = authorInfo.name;
      state.authorInfo.description = authorInfo.description;
      state.authorInfo.social = authorInfo.social;
    },
  },
  actions: {
    logout({ commit }) {
      commit("clearUserInfo");
    },
    updateVisitorInfo({ commit }, visitorInfo) {
      commit("setVisitorInfo", visitorInfo);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
