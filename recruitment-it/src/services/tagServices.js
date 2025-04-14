import { get } from "../utils/request";

export const getListTag = async () => {
  const res = await get("tags");
  return res;
}