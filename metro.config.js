// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  // Soluciona problemas con paquetes que no son compatibles con web
  net: require.resolve("node-libs-browser/mock/net"),
  tls: require.resolve("node-libs-browser/mock/tls"),
};
module.exports = config;
