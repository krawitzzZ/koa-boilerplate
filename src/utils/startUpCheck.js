const requiredEnvVars = [];

export default () => requiredEnvVars.every(key => Boolean(process.env[key]));
