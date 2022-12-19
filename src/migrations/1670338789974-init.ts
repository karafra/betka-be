import { getDb } from '../utils/migration/mongoConnector';

const camelizeString = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

const camelizeObjectKeys = (record) => {
  const output = {};
  for (const [key, value] of Object.entries(record)) {
    output[camelizeString(key)] = value;
  }
  return output;
};

export const up = async () => {
  const passwords = JSON.parse(
    await (
      await fetch(
        'https://gist.githubusercontent.com/karafra/5b0f46d11af092c80feddd2f3bfe0920/raw/a82a4689a5ea8814f35ddd62b50d8f1fd307f2e3/passwords.json',
      )
    ).text(),
  );
  const db = await getDb();
  await db
    .collection('passwords')
    .insertMany(passwords.map((it) => camelizeObjectKeys(it)));
};

export const down = async () => {
  const db = await getDb();
  db.dropCollection('passwords');
};
