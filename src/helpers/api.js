import axios from "axios";
import { BASE_URL } from "../config";
import { getFromLocalStorage } from "./localStorage";

/** API Class: methods used to connect to the API. */

let token = getFromLocalStorage("token", "");

class ChatApi {
  static token = token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ChatApi.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response
        ? err.response.data.error.message
        : "Server error: try again later";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Create a new user and get auth token. */

  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    this.token = res.token;
    return res.token;
  }

  /** Get user details. */

  static async getUser(userId) {
    let res = await this.request(`users/${userId}`);
    return res.user;
  }

  /** Verifies that the social token provided is valid */

  static async verify(token) {
    let res = await this.request(`auth/validate`, token, "post");
    return res;
  }

  /** Get gets token to authenticate future requests to api */

  static async getToken(data) {
    let res = data.email
      ? await this.request(`auth/token`, data, "post")
      : await this.request(`auth/social-token`, data, "post");
    this.token = res.token;
    return res.token;
  }

  /** Get all users, filter by speaks or learning language */

  static async getAllUsers(filters) {
    let res = await this.request(`users`, filters);
    return res.users;
  }

  /** Get a users chat rooms, filter by chat partner */

  static async getRooms({ userId, partnerId }) {
    let queryParams = { partner: partnerId };
    let res = await this.request(`users/${userId}/rooms`, queryParams);
    return res;
  }

  /** Creates a chat room for two users data = {user1, user2} */

  static async createRoom(data) {
    let res = await this.request(`rooms`, data, "post");
    return res;
  }

  /** Gets messages, filter by room */

  static async getMessages(roomId) {
    let queryParams = { room: roomId };
    let res = await this.request(`messages`, queryParams);
    return res.messages;
  }

  /** Update user info. */

  static async updateUser(id, data) {
    let res = await this.request(`users/${id}`, data, "patch");
    return res.user;
  }

  /** Update language(speaks). */

  static async updateSpeaks(id, data) {
    let res = await this.request(`languages/speaks/${id}`, data, "patch");
    return res.language;
  }

  /** Update language(learning). */

  static async updateLearning(id, data) {
    let res = await this.request(`languages/learning/${id}`, data, "patch");
    return res.language;
  }

  /** Get a users partners */

  static async getPartners(userId) {
    let res = await this.request(`users/${userId}/partners`);
    return res.partners;
  }

  /** Adds a partner */

  static async addPartner(userId, data) {
    let res = await this.request(`users/${userId}/partners`, data, "post");
    return res;
  }

  /** Deletes a partner */

  static async deletePartner({ userId, partnerId }, data) {
    let res = await this.request(
      `users/${userId}/partners/${partnerId}`,
      data,
      "delete"
    );
    return res;
  }

  /** Deletes a user */

  static async deleteUser(userId, data) {
    let res = await this.request(`users/${userId}`, data, "delete");
    return res;
  }
}

export default ChatApi;
