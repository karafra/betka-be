import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Password } from 'src/schemas/password.schema';

export class PasswordRepository {
  private readonly logger = new Logger(PasswordRepository.name);

  constructor(
    @InjectModel(Password.name)
    private readonly passwordModel: Model<Password>,
  ) {}

  async getDistinctCountries() {
    return this.passwordModel.find().distinct('country');
  }

  async getPasswordByCrackTime(crackTime: number, greater = false) {
    this.logger.debug(
      `Retrieving passwords with worse crack time than ${crackTime}`,
    );
    const passwords = await this.passwordModel
      .find({
        timeToCrackInSeconds: {
          $gte: crackTime,
        }
          ? greater
          : {
              $lte: crackTime,
            },
      })
      .transform((doc) => doc.map((doc) => doc.toObject()));
    this.logger.debug(`Retrieved ${passwords.length} passwords`);
    return passwords;
  }

  async getAll() {
    this.logger.debug('Retrieving all passwords that are in the database');
    const allPasswords = await this.passwordModel.find();
    this.logger.debug(`Found ${allPasswords.length}`);
    return allPasswords;
  }

  async getPage(startIndex: number, endIndex: number) {
    const pageSize = endIndex - startIndex;
    if (pageSize < 0) {
      return undefined;
    }
    this.logger.debug(
      `Retrieving ${pageSize} passwords (startIndex: ${startIndex} endIndex: ${endIndex}`,
    );
    const passwords = await this.passwordModel
      .find()
      .skip(startIndex)
      .limit(pageSize)
      .transform((doc) => doc.map((doc) => doc.toObject()));
    this.logger.debug(`Passwords ${passwords.length} successfully retrieved`);
    return passwords;
  }

  async getByCountry(country: string) {
    this.logger.debug(`Retrieving all passwords from '${country}'`);
    const passwords = await this.passwordModel
      .find({
        country: {
          $regex: new RegExp('^' + country + '$', 'i'),
        },
      })
      .transform((doc) => doc.map((doc) => doc.toObject()));
    this.logger.debug(`Found ${passwords.length} passwords from '${country}'`);
    return passwords;
  }

  async getTopBy(parameterName: string, amount: number) {
    this.logger.debug(
      `Retrieving top ${amount} passwords by parameter '${parameterName}`,
    );
    const filter = {};
    filter[parameterName] = {
      $ne: null,
    };
    const sortFilter = {};
    sortFilter[parameterName] = 1;

    const agregation = await this.passwordModel.aggregate([
      {
        $match: {
          globalRank: {
            $ne: null,
          },
        },
      },
      {
        $sort: {
          globalRank: -1,
        },
      },
      {
        $group: {
          _id: `$${parameterName}`,
          param: {
            $max: `$${parameterName}`,
          },
          doc: {
            $addToSet: '$$ROOT',
          },
        },
      },
      {
        $sort: {
          param: 1,
        },
      },
      {
        $limit: amount,
      },
    ]);
    const passwords = agregation.map((it) => it.doc[0]);
    this.logger.debug(`Successfully retrieved ${passwords.length} passwords`);
    return passwords;
  }
}
