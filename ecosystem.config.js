module.exports = {
  apps: [{
    name: 'bihesewa.com',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/bihesewa.com',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: '3001'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: '3001'
    },
    error_file: '/var/log/bihesewa-com-error.log',
    out_file: '/var/log/bihesewa-com-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    time: true
  }]
};

