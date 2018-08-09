module.exports = {
    webpack: function (config, env) {
      return config;
    },
    jest: function (config) {
      config.testEnvironment = "node";
  
      config.transformIgnorePatterns = [
        "/node_modules/(?!(ol|labelgun|mapbox-to-ol-style|ol-mapbox-style)/).*/"
      ];
  
      config.coveragePathIgnorePatterns = [
        "/node_modules/",
        "env-setup.js"
      ];
  
      config.snapshotSerializers = [
          "enzyme-to-json/serializer"
      ];
      return config;
    }
  }