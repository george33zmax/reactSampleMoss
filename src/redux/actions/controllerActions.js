export const ACTIVATE_CONTROLLER = "ACTIVATE_CONTROLLER";

export function setActiveController(data) {
  return {
    type: ACTIVATE_CONTROLLER,
    data: data
  };
}
