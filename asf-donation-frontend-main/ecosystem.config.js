// used for pm2 deployment, after deployment, run pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: "scaling-frontend", 
      script: "pnpm run start",
      max_memory_restart: '200M',
      restart_delay: 2000,
      exec_mode: 'cluster',
      instances: 4,
    },
  ],
};
