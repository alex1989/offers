export const getEnv = (key: string, defaultValue = ''): string => {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  return value;
};

export const getEnvNumber = (key: string, defaultValue = 0): number => {
  const value: string = getEnv(key);
  return !isNaN(parseFloat(value)) && !isNaN(Number(value))
    ? Number(value)
    : defaultValue;
};

export const getEnvBoolean = (key: string, defaultValue = false) => {
  const value: string = getEnv(key);
  return value === '' ? defaultValue : value === 'true';
};

export const getEnvObject = (key: string, defaultValue: object = null) => {
  const value: string = getEnv(key);
  if (!value) {
    return defaultValue;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return defaultValue;
  }
};
