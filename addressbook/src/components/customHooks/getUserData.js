import { url } from "../../url";
import Axios from "axios";

export const getUserData = async (user, sort) => {
  try {
    const response = await Axios.get(
      `${url}/user/${user.id}/addressbook?sort=${sort}`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetch = async (user, group, userData, setUserData, sort) => {
  try {
    const response = await Axios.get(
      `${url}/groups/${group}/list?sort=${sort}`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );

    setUserData({ ...userData, addressBook: response.data.contactList });
  } catch (err) {
    console.log(err);
  }
};
