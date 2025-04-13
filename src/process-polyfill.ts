
// Polyfill for process.env in browser environment
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {
      NODE_ENV: import.meta.env.MODE || 'development',
    },
  };
}

export {};
