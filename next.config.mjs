/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // For Google AUTH
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // For Namecheap
    API_KEY_NAMECHEAP: process.env.API_KEY_NAMECHEAP,
    USERNAME_NAMECHEAP: process.env.USERNAME_NAMECHEAP,
    CLIENT_IP_NAMECHEAP: process.env.CLIENT_IP_NAMECHEAP,

    // For AI
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,

    // For Google ads
    GOOGLE_API_DEV_TOKEN: process.env.GOOGLE_API_DEV_TOKEN,
    GOOGLE_API_CUSTOMER_ID: process.env.GOOGLE_API_CUSTOMER_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_API_PRIVATE_KEY: process.env.GOOGLE_API_PRIVATE_KEY,
    GOOGLE_API_CLIENT_EMAIL: process.env.GOOGLE_API_CLIENT_EMAIL,
    GOOGLE_API_TOKEN_CLAIM_CUB: process.GOOGLE_API_TOKEN_CLAIM_CUB,
  },
};

export default nextConfig;
