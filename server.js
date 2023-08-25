const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// # 1) Define the security scheme type (HTTP bearer)
// components:
//   securitySchemes:
//     bearerAuth:            # arbitrary name for the security scheme
// type: http
// scheme: bearer
// bearerFormat: JWT    # optional, arbitrary value for documentation purposes
// # 2) Apply the security globally to all operations
// security:
//   - bearerAuth: []         # use the same name as above

connectDb();
const app = express();
const port = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        bearerAuth: {
                  type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      title: "Keeper API Documentation",
      version: "1.0.0",
      description: "A simple Contact Management API",
      contact: {
        email: "creatorgod003@gmail.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./controller/*.js", "./models/SwaggerSchema.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    origin: "*",
  })
);
// below is the middle ware which parses the client information to json format
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
