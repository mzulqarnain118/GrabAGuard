module.exports = {
  apps: [{
    name: 'frontend',
    script: 'serve',
    args: '-s build',
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
