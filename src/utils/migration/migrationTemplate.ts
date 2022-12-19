// @ts-ignore
import { getDb } from '../utils/migration/mongoConnector';

export const up = async () => {
  const db = await getDb();
  /*
      Code your update script here!
    */
};

export const down = async () => {
  /*
      Code your update script here!
    */
};
