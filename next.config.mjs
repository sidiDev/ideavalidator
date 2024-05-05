/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    API_KEY_NAMECHEAP: process.env.API_KEY_NAMECHEAP,
    USERNAME_NAMECHEAP: process.env.USERNAME_NAMECHEAP,
    CLIENT_IP_NAMECHEAP: process.env.CLIENT_IP_NAMECHEAP,

    API_KEY_GODADDY: process.env.API_KEY_GODADDY,
    API_SECRET_GODADDY: process.env.API_SECRET_GODADDY,
  },
};

export default nextConfig;
