import { edit, get, post } from "../utils/request";

export const login = async (email, password = "") => {
  let pw = "";
  if (password !== "") {
    pw = `password=${password}`;
  }
  const result = await get(`company?email=${email}&${pw}`);
  return result;
}

export const getAllCompany = async () => {
  const res = await get("company");
  return res;
}
export const getDetailCompany = async (id) => {
  const res = await get(`company/${id}`);
  return res;
}
export const checkExist = async (key, value) => {
  const result = await get(`company?${key}=${value}`);
  return result;
}
export const createCompany = async (options) => {
  const result = await post("company", options);
  return result;
}
export const editCompany = async (id, options) => {
  const res = await edit(`company/${id}`, options)
}