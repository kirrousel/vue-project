import axios from "axios";

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    let response = null;

    try {
      response = await axios.post(
        `https://vue-course-c2822-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        newRequest
      );
    } catch (error) {
      throw new Error(error.message || 'Failed to send your request!');
    }

    newRequest.id = response.data.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    let requests = [];
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    try {
     const response = await axios.get(
      `https://vue-course-c2822-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
      );
     for (const key in response.data) {
       const request = {
         id: key,
         coachId: coachId,
         userEmail: response.data[key].userEmail,
         message: response.data[key].message
       }
       requests.push(request);
     }
    } catch (error) {
      throw new Error(error.message || 'Failed to load request!');
    }

    context.commit('setRequests', requests);
  },
};
