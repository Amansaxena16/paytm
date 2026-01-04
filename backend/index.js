const express = require('express');
const app = express();
const usersRoutes = require("./routes/users");
const accountsRoutes = require("./routes/accounts");
const cors = require("cors");

// Cors  
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routing structure
app.use("/api/user", usersRoutes);
app.use("/api/account", accountsRoutes);

app.listen(3001, () => {
    console.log('server is running on 3001 port!!');
});
