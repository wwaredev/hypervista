
// Polyfill for process.env in browser environment
if (typeof window !== 'undefined' && !window.process) {
  window.process = {} as NodeJS.Process;
  window.process.env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
}

export {};
