import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/test", "routes/test.tsx"),
  route("/tests", "routes/tests.tsx"),
  route("/logout", "routes/logout.tsx"),
] satisfies RouteConfig;
