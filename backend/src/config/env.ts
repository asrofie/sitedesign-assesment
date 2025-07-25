import dotenv from "dotenv";
import path from "path";

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

console.log(`Loaded env file: ${envPath}`);

interface EnvConfig {
  NODE_ENV: string;
  JWT_EXPIRY: string;
}


const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "24h",
};

console.log(`Loaded environment: ${env.NODE_ENV}`);

export default env;
