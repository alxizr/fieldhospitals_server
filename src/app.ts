import express from "express";
import { auth } from "./routes/session.controller";
import { hotels } from "./routes/hotel.controller";
import { admin } from "./routes/admin.controller";
import { ENV_APP_PORT_REST } from "./utils/secret";
import { createSecuredApp, startMyApp } from "./utils/createSecuredApp";

// create Secured app via util method
const app = createSecuredApp();

// setup application to use controller
const apiRouter = express.Router();
apiRouter.use("/auth", auth); //      authentication with sessions & cookies
apiRouter.use("/hotels", hotels); //  hotels route
apiRouter.use("/admin", admin); //    admin multiple routes
app.use("/api", apiRouter);

app.listen(ENV_APP_PORT_REST, startMyApp);
