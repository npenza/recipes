/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
          },
          {
            protocol: 'https',
            hostname: 'tailwindui.com',
          },
          {
            protocol: 'https',
            hostname: 'assets.epicurious.com',
          },
        ],
      },
};

export default config;
