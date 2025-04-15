import { get, post } from "../utils/request";

export const createCV = async (options) => {
  const res = await post('cv', options);
  return res;
}
export const getListCV = async (id) => {
  const res = await get(`cv?idCompany=${id}`);
  return res;
}