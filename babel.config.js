const path = require(`path`);
// eas update
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
   
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      ['module:react-native-dotenv'],
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.jsx",
            ".android.jsx",
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx",
          ],
          root: ["."],
          alias: {
            "@components": "./src/shared/components",
            "@hooks": "./src/shared/hooks",
            "@utils": "./src/shared/utils",
            "@decorators": "./src/shared/decorators",
            "@api": "./src/services/API",
            "@providers": "./src/providers",
            "@redux": "./src/redux",
            "@assets": "./src/assets",
            "@styles": "./src/shared/styles",
            "@layouts": "./src/shared/layouts",
            "@lang": "./src/lang",
          },
        },
      ],
    ],
  };
};
