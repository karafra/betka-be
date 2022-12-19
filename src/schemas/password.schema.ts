import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type PasswordDocument = HydratedDocument<Password>;

@Schema({
  toObject: {
    transform: (_, ret) => {
      delete ret._id;
      return ret;
    },
  },
})
export class Password {
  @ApiProperty({
    type: String,
    description: 'Country code in ISO 3166-1 specification ',
  })
  @Prop({
    type: mongoose.Schema.Types.String,
  })
  public countryCode: string;
  @Prop({
    type: mongoose.Schema.Types.String,
  })
  @ApiProperty({
    type: String,
    description: 'Name of the country',
  })
  public country: string;
  @Prop({
    alias: 'Rank',
    type: mongoose.Schema.Types.String,
  })
  @ApiProperty({
    type: String,
    description: 'Password rank',
  })
  public rank: string;
  @Prop({
    alias: 'Password',
    type: mongoose.Schema.Types.String,
  })
  @ApiProperty({
    type: String,
    description: 'value descriptor of password (actual password)',
  })
  public password: string;
  @Prop({
    alias: 'User_count',
    type: mongoose.Schema.Types.String,
  })
  @ApiProperty({
    description: 'How many users use this password',
    type: Number,
  })
  public userCount: number;
  @Prop({
    alias: 'Time_to_crack',
    type: mongoose.Schema.Types.String,
  })
  @ApiProperty({
    type: String,
    description: 'Time it takes to crack this password',
  })
  public timeToCrack: string;
  @Prop({
    alias: 'Global_rank',
    type: mongoose.Schema.Types.Number,
  })
  @ApiProperty({
    description: 'Global rank of this password',
    type: Number,
  })
  public globalRank: number;
  @Prop({
    type: mongoose.Schema.Types.Number,
    alias: 'Time_to_crack_in_seconds',
  })
  @ApiProperty({
    description: 'Time it takes to crack this password converted to seconds',
    type: Number,
  })
  public timeToCrackInSeconds: number;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
