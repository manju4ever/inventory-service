import config from 'config';

export const getEnvValue = (key) => {
    return config.util.getEnv(key) && config.util.getEnv(key).toString().toLocaleLowerCase();
}