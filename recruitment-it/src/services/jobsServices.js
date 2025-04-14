import { get } from "../utils/request";

export const getAllJob = async () => {
  const res = await get("jobs");
  return res;
}
export const getDetailJob = async (id) => {
  const res = await get(`jobs/${id}`);
  return res;
}
export const getListJobByCompany = async (id) => {
  const res = await get(`jobs?idCompany=${id}`);
  return res;
}