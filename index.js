require("dotenv").config();

const server = require("./src");
const PORT = process.env.PORT || 3500;

server.listen(PORT, async () => {})
