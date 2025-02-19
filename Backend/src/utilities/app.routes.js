import { listRouter } from "../src/modules/list/list.routes.js";
import { userRouter } from "../src/modules/user/user.routes.js";
export const bootstrap = (app) => {
  app.use("/users", userRouter);
  app.use("/lists", listRouter);
};
