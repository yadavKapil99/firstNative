import "dotenv/config"; // keep this at the top
import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { connectDB } from "./src/config/db.js";
import { PORT } from "./src/config/config.js";
import { registerRoutes } from "./src/routes/index.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    const app = fastify();

    app.register(fastifySocketIO, {
      cors: {
        origin: "*",
      },
      pingInterval: 10000,
      pingTimeout: 5000,
      transports: ["websocket"],
    });

    await registerRoutes(app);

    app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`App is running on http://localhost:${PORT}`);
      }
    });

    app.ready().then(() => {
      app.io.on("connection", (socket) => {
        console.log("A User Connected");

        socket.on("joinRoom", (orderId) => {
          socket.join(orderId);
          console.log(`User joined room ${orderId}`);
        });

        socket.on("disconnect", () => {
          console.log("User Disconnected");
        });
      });
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
