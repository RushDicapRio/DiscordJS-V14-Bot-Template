const client = require("../../index");
const colors = require("colors");

module.exports = {
  name: "ready.js"
};

client.once('ready', async () => {
  console.log("\n" + `[PRET] ${client.user.tag} est prêt et prêt à partir .`.brightGreen);
})