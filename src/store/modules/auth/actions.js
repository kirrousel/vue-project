import axios from "../../../axios-auth";
import {firebaseConfig} from "../../../firebase-config";
let timer;

export default {
  async auth(context,payload) {
    let response;
    let loginUrl = `/accounts:signInWithPassword?key=${firebaseConfig.key}`;
    let signupUrl = `/accounts:signUp?key=${firebaseConfig.key}`;
    const requestUrl = payload.isLogin ? loginUrl : signupUrl
    try {
      response = await axios.post(requestUrl, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      });
    } catch(error) {
      throw new Error( error.response.data.error.message || 'Failed to authenticate');
    }

    const expiresIn = +response.data.expiresIn * 1000;
    const expirationDate = new Date().getTime() +expiresIn;
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('userId', response.data.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: response.data.idToken,
      userId: response.data.localId,
    })
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if(expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn)

    if(token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      userId: null,
      token: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
