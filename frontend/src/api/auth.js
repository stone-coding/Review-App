import client from "./client";

/**
 * function to create a brand new user object
 * @param {*} userInfo contains name, email, and password
 * @returns error info or the response data
 */
export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // ?. optional chanining operatial return undefined or null if obj on left not exist
    if (response?.data) return response.data;

    return {error: error.message || error}
  }
};

/**
 * 
 * @param {*} userInfo contains user id and OTP
 * @returns 
 */
export const verifyUserEmail = async (userInfo) => {
    try {
      const { data } = await client.post("/user/verify-email", userInfo);
      return data;
    } catch (error) {
      const { response } = error;
      // ?. optional chanining operatial return undefined or null if obj on left not exist
      if (response?.data) return response.data;
  
      return {error: error.message || error}
    }
  };