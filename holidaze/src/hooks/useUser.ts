export function useUser() {
  if (typeof window === "undefined") return {};

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user;
}
