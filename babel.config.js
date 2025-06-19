module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    // Añade esta parte para resolver el problema con el paquete debug
    overrides: [
      {
        test: "./node_modules/debug/src/node.js",
        presets: ["babel-preset-expo"],
        plugins: [
          "@babel/plugin-transform-member-expression-literals",
          "@babel/plugin-transform-property-literals",
        ],
      },
    ],
  };
};
