import { url } from "../../url";
import Axios from "axios";

export const getUserData = async user => {
  try {
    const response = await Axios.get(`${url}/user/${user.id}/addressbook`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
