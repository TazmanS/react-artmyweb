import { EDIT_USER, GET_USER, GET_USERS } from "./endpoints";
import http from "./index";

export const apiGetUsers = async (page, filters) => {
  let url = GET_USERS + `?page=${page}`;
  if (filters.gender.length === 1) {
    url = url + `&gender=${filters.gender[0]}`;
  }
  return await http.get(url);
};

export const apiGetUser = async (id) => {
  return await http.get(GET_USER + id);
};

export const apiEditUser = async (id, params) => {
  return await http.put(EDIT_USER + id, { ...params });
};
