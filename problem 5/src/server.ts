import app from "./app";
import sequelize from "./util/database";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Sync models to DB (careful: { force: true } drops tables)
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
