const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://ideavalidator-v1.vercel.app"],
  })
);

app.use(bodyParser.json());

// Retrieving environment variables for Namecheap API authentication
const API_KEY_NAMECHEAP = process.env.API_KEY_NAMECHEAP;
const USERNAME_NAMECHEAP = process.env.USERNAME_NAMECHEAP;
const CLIENT_IP_NAMECHEAP = process.env.CLIENT_IP_NAMECHEAP;
// Determining API URL based on environment
const url =
  process.env.NODE_ENV == "development"
    ? "https://api.sandbox.namecheap.com/xml.response"
    : "https://api.namecheap.com/xml.response";

app.post("/domain", async (req, res) => {
  const { domain } = req.body;
  console.log(process.env.GOOGLE_API_KEY);

  // Making request to Namecheap API to check domain availability
  const { data } = await axios.get(
    `${url}?ApiUser=${USERNAME_NAMECHEAP}&ApiKey=${API_KEY_NAMECHEAP}&UserName=${USERNAME_NAMECHEAP}&ClientIp=${CLIENT_IP_NAMECHEAP}&Command=namecheap.domains.check&DomainList=${domain}`
  );

  res.json(data);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
