import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = join(
  __dirname,
  '..',
  '..',
  process.env.CONFIG_FILE || 'config.yml',
);

const ENCODING = 'utf-8';

const getEnvVarValue = (value: string): string | undefined => {
  const paramsPattern = /\${(.*?)}/;
  const param = String(value).match(paramsPattern);
  if (param !== null) {
    return process.env[param[1]];
  }
  return null;
};

const replaceEnvVars = (obj: any): void => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'object') {
      const value = getEnvVarValue(obj[key]);
      if (value !== null) {
        obj[key] = value;
      }
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceEnvVars(obj[key]);
    }
  });
};

export default () => {
  const yamlRecord = yaml.load(
    readFileSync(YAML_CONFIG_FILENAME, ENCODING),
  ) as Record<string, any>;
  replaceEnvVars(yamlRecord);
  return yamlRecord;
};
