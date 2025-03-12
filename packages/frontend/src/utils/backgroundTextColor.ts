/* This function is used to give a text color according to background color
 * Example-1: if given color is a bright one, text color returned will be black
 * Example-2: if given color is a dark one, text color returned will be white */
export function backgroundTextColor(bgColor: string): string {
  const r = parseInt(bgColor.slice(1, 3), 16);  // extract red
  const g = parseInt(bgColor.slice(3, 5), 16);  // extract green
  const b = parseInt(bgColor.slice(5, 7), 16);  // extract blue

  let luma: number = 0.2126 * r + 0.7152 * g + 0.0722 * b; // magick trick 🧙
  if (luma < 90) return "#FFFFFF";
  return "#000000";
}