import { get } from "../utils/request";

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
export const createCompany = async () => {

}