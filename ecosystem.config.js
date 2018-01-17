module.exports = {
  apps: [{
    name: 'sasweb',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'light.subuya.org',
      ref: 'origin/master',
      repo: 'git@home.subuya.org:sas/sasweb.git',
      path: '/home/ubuntu/sasweb',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
