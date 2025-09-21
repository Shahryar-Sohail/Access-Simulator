import express from "express";
import employeeRoute from "./src/routes/employee.js";
import simulateRoute from "./src/routes/simulate.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

//Showing employee data
app.use("/employees", employeeRoute);
//Showing simulation data
app.use("/simulate", simulateRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


