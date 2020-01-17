import { url } from "../../url";
import Axios from "axios";

export const getUserData = async (user, sort) => {
  try {
    let request = `${url}/user/${user.id}/addressbook`;
    if (sort) {
      request += `?sort=${sort}`;
    }
    const response = await Axios.get(request, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
