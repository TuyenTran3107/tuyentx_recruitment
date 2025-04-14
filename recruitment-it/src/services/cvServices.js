import { post } from "../utils/request";

export const createCV = async (options) => {
  const res = await post('cv', options);
  return res;
}