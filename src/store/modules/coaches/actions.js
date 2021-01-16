import axios from "axios";

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    try {
      await axios.put(
        `/coaches/${userId}.json?auth=${token}`,
         coachData
        );
    } catch (error) {
      throw new Error(error.message || 'Failed to register a coach!');
    }

    context.commit('registerCoach', {
      ...coachData,
      userId,
    });
  },

  async loadCoaches(context, payload) {
    if(!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    let coaches = [];
    try {
      const response = await axios.get('/coaches.json');
      for (const key in response.data) {
        const coach = {
          id: key,
          firstName: response.data[key].firstName,
          lastName: response.data[key].lastName,
          description: response.data[key].description,
          hourlyRate: response.data[key].hourlyRate,
          areas: response.data[key].areas,
        }
        coaches.push(coach);
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch coaches!');
    }


    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
