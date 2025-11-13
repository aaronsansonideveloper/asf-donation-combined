// used for pm2 deployment, after deployment, run pm2 start ecosystem.config.js --env dev

module.exports = {
  apps: [
    {
      name: "asf-donation-main-be",
      script: "./dist/apps/main-app/main.js",
      max_memory_restart: "320M",
      restart_delay: 2000,
    },
    {
      name: "asf-donation-webhook-be",
      script: "./dist/apps/webhook/main.js",
      max_memory_restart: "320M",
      restart_delay: 2000,
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
