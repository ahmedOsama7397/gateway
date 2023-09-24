import express from "express";
import config from "./config";
// import { heathCheck } from "./routes/check";
import cors from "cors";
// import { entityRoute } from "./routes/entities/entity";
// import userRoutes from "./routes/user/userRoutes";
// import settingsRoutes from "./routes/settings/settingsRoutes";
// import settingListRoutes from "./routes/settings/settingListRoutes";
// import settingEntitiesRoutes from "./routes/settings/settingEntitiesRoutes";
// import settingEntitieTabsRoutes from "./routes/settings/settingEntitieTabsRoutes";
import adminUserRoutes from "./console/routes/user/adminUsersRoutes";
// import { treeRoute } from "./routes/trees/tree";
// import { menuRoute } from "./routes/menus/menu";
// import { adRoute } from "./routes/types/ads/ad";
// import { entityTypeRoute } from "./routes/types/entities/entity";
// import { profileRoute } from "./routes/types/profiles/profile";
// import { tagRoute } from "./routes/tags/tag";
// import productsPlatfromRoutes from "./routes/products/productsPlatfromRoutes";
// import productsPaymentMethodRoutes from "./routes/products/productsPaymentMethodRoutes";
// import { featuresRoute } from "./routes/features/features";
// import { featuresListRoute } from "./routes/features_list/features_list";
// import { GeoRouter } from "./routes/geo/geoRoutes";
// import { authAdminRoute } from "./routes/auth/authAdminRoutes";
// import DBConnection from "./config/DBConnection";
// import badgesRoutes from "./routes/userPage/badges/badgesRoutes";
// import industriesRoutes from "./routes/userPage/industries/industriesRoutes";
// import pageRouter from "./routes/userPage/page/page";
// import addressesRoute from "./routes/userPage/pages/addressesRoute";
// import activitiesRoutes from "./routes/userPage/activities/activitiesRoutes";
// import categoriesRoutes from "./routes/userPage/categories/categoriesRoutes";

const bodyParser = require("body-parser");
const morgan = require("morgan");

const port = process.env.PORT || config.dev.port;

const app = express();
app.use(cors());

// DBConnection();

app.use(bodyParser.json("application/json"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("<h1 >Gateway Express</h1>");
});

// app.use(heathCheck);

// //entity routes
// app.use(entityRoute);
// app.use(treeRoute);
// app.use(menuRoute);
// app.use(adRoute);
// app.use(entityTypeRoute);
// app.use(profileRoute);
// app.use(tagRoute);
// app.use(featuresRoute);
// app.use(featuresListRoute);
// // app.use(errorRoute);

// //admin users routes
app.use(adminUserRoutes);
// app.use(authAdminRoute);

// //users routes
// app.use(userRoutes);
// app.use(GeoRouter);

// //settings routes
// app.use(settingsRoutes);
// app.use(settingListRoutes);
// app.use(settingEntitiesRoutes);
// app.use(settingEntitieTabsRoutes);

// //products routes
// app.use(productsPlatfromRoutes);
// app.use(productsPaymentMethodRoutes);

// // activities
// app.use(activitiesRoutes);
// app.use(badgesRoutes);
// app.use(categoriesRoutes);
// app.use(industriesRoutes);
// app.use(pageRouter);
// app.use(addressesRoute);

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
