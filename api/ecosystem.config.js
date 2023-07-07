module.exports = [
    {
      script: 'build/index.js',
      name: 'api',
      exec_mode: 'cluster',
      instances: "max",
    },
  ];