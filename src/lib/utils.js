export function cn(...inputs) {
  return inputs
    .flat()
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ");
}
