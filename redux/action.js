import axios from "axios";
import BASE_URL from "../services/api";

export default getContacts = () => {
  return (dispatch, getState) => {
    const url = BASE_URL + "/contacts";
    axios
      .get(url)
      .then(function (response) {
        dispatch({ type: "GET_CONTACTS", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getFilteredContacts = (key, value) => {
  return (dispatch, getState) => {
    dispatch({ type: "GET_FILTERED", payload: { key: key, value: value } });
  };
};
