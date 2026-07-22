export function getDevLoginDefaults() {
  if (process.env.NODE_ENV !== "development") {
    return { email: "", password: "" };
  }

  return {
    email: process.env.NEXT_PUBLIC_DEV_LOGIN_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEV_LOGIN_PASSWORD ?? "",
  };
}
