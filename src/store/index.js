import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const user_post_url = "http://176.119.159.61/api/Attempts/Go";
const get_lection_url = "http://176.119.159.61/api/Lessons/GetLessonStats?AttemptId=";
const get_totalStat_url = "http://176.119.159.61/api/Attempts/GetStat?AttemptId=";
const get_lecData_url = "http://176.119.159.61/api/Lessons/GetLessonMaterials?LessonStatId=";
const check_answer_url = "http://176.119.159.61/api/Quiz/Answer";
const get_certificate_url = "http://176.119.159.61/api/Attempts/Complete";

export default new Vuex.Store({
  state: {
    user: {},
    // carts: [],
    // tests: [],
    lections: [],
    lectionData: {},
    certificate: {},
    ssData: {}
  },
  mutations: {
    setUser: (state, userData) => {
      state.user = userData;
      localStorage.setItem('userAttemptId', userData.attemptId);
      state.lections = [];
      state.lectionData = {};
      state.certificate = {};
    },
    setLections: (state, lections) => state.lections = lections,
    setLectionData: (state, lections) => state.lectionData = lections,
    setCertificate: (state, certificate) => state.certificate = certificate,
    setAAData: (state, lections) => state.ssData = lections,
    clearState: (state) => {
      localStorage.removeItem('userAttemptId');
      state.user = {};
      state.lections = [];
      state.lectionData = {};
      state.certificate = {};
    }
  },
  actions: {
    async enterPlatform( { commit }, userInfo) {
      return await axios.post(user_post_url, userInfo)
        .then((response)=>{
          commit('setUser', response.data);
          return response;
        })
        .catch((error)=>{
          console.log(error);
          return error;
        })
    },
    async getLections( { commit }) {
      let userAttemptId = localStorage.getItem('userAttemptId')
      return await axios.get(`${get_lection_url}${userAttemptId}`)
        .then((response)=>{
          commit('setLections', response.data);
          return response;
        })
        .catch((error)=>{
          console.log(error);
          return error;
        })
    },
    async getTotalStat() {
      let userAttemptId = localStorage.getItem('userAttemptId')
      return await axios.get(`${get_totalStat_url}${userAttemptId}`)
        .then((response)=>{
         
          return response;
        })
        .catch((error)=>{
          console.log(error);
          return error;
        })
    },
    async getLectionData( { commit }, lecId) {
      return await axios.get(`${get_lecData_url}${lecId}`)
        .then((response)=>{
          commit('setLectionData', response.data);
          return response;
        })
        .catch((error)=>{
          console.log(error);
          return error;
        })
    },
    async sendAnswerforChek( { commit }, answerData) {
      return await axios.post(check_answer_url, answerData)
        .then((response)=>{
          commit('setAAData', response.data);
          return response;
        })
        .catch((error)=>{
          console.log(error);
          return error;
        })
    },
    async getCertificateData( { commit }) {
      let userAttemptId = localStorage.getItem('userAttemptId');
      return await axios.post(get_certificate_url, {"attemptId": userAttemptId})
        .then((response)=>{
          commit('setCertificate', response.data);
          return response;
        })
        .catch((error)=>{
          console.log(error);
          return error;
        })
    }
  },
  getters: {
    // carts: state => state.carts,
    userSigned(state){
      return (("attemptId" in state.user) || (localStorage.getItem('userAttemptId'))) ? true : false;
    },
    lections: state => state.lections,
    lectionData: state => state.lectionData,
    certificate: state => state.certificate
  }
})
