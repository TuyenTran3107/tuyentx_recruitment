import { del, edit, get, post } from "../utils/request";

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
export const createJob = async (options) => {
  const res = await post("jobs", options);
  return res;
}
export const editJob = async (id, options) => {
  const res = await edit(`jobs/${id}`, options);
  return res;
}
export const deleteJob = async (id) => {
  const res = await del(`jobs/${id}`);
  return res;
}