export const ACTIVATE_PROJECT = "ACTIVATE_PROJECT";

export function setActiveProject(id) {
  return {
    type: ACTIVATE_PROJECT,
    data: id
  };
}
