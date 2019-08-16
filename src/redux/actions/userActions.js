import { CHANGE_SIDEBAR_VISIBILITY } from "./sidebarActions";

export const SAVE_USER_INFO = "SAVE_USER_INFO";

export function getUserInfo(data) {
  return {
    type: SAVE_USER_INFO,
    data: data
  };
}
