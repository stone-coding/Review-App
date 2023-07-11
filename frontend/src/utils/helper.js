export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const catchError = (error) => {
  const { response } = error;
  // ?. optional chanining operatial return undefined or null if obj on left not exist
  if (response?.data) return response.data;

  return { error: error.message || error };
};
