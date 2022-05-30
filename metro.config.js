// from https://stackoverflow.com/questions/72179070/react-native-bundling-failure-error-message-while-trying-to-resolve-module-i
// with reference to https://facebook.github.io/metro/docs/configuration/#merging-configurations

// module.exports = {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: true,
//         },
//       }),
//     },
//     //added this
//     resolver: {
//       sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
//     },
//   };

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;