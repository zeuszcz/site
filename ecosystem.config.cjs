module.exports = {
  apps: [
    {
      name: 'site',
      cwd: '/home/i48ptgvnis/site',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
        SITE_STORAGE_ROOT: '/home/i48ptgvnis/site/storage',
      },
      max_memory_restart: '600M',
      watch: false,
      autorestart: true,
      out_file: '/home/i48ptgvnis/site/logs/out.log',
      error_file: '/home/i48ptgvnis/site/logs/err.log',
      merge_logs: true,
      time: true,
    },
  ],
};
