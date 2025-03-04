// jest.config.ts
import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Ensure the correct test environment
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json", // Point to the correct tsconfig file
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_API_BASE_URL:
                      "https://prueba-tecnica-api-tienda-moviles.onrender.com",
                  },
                },
              },
            },
          ],
        },
      },
    ], // Process TypeScript files with ts-jest
  },
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts", // Point to your setup file
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Handle path aliases (if you use them)
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
};

export default config;
