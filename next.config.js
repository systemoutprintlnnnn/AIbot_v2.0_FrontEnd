/** @type {import('next').NextConfig} */

// const PUBLIC_API_HOST_URL = process.env.PUBLIC_API_HOST_URL || "http://localhost:8090";

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    }
}

module.exports = nextConfig
