import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Ta7dCiMmxrf3@ep-square-lake-ahxagu7k-pooler.c-3.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require',
  },
});
