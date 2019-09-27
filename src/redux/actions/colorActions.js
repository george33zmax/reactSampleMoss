export const ACTIVATE_COLORS = "ACTIVATE_COLORS";

export function setActiveColors(data) {
  return {
    type: ACTIVATE_COLORS,
    data: data
  };
}
