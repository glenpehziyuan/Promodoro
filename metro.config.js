// from https://stackoverflow.com/questions/72179070/react-native-bundling-failure-error-message-while-trying-to-resolve-module-i

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    //added this
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
    },
  };