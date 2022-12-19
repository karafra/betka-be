import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PasswordRepository } from 'src/repository/password.repository';
import { Password } from 'src/schemas/password.schema';

@ApiTags('Passwords')
@Controller('api/passwords')
export class PasswordController {
  constructor(private readonly passwordRepository: PasswordRepository) {}

  @ApiOperation({
    description: 'Retrieves all passwords',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'On operation success',
    type: Password,
    isArray: true,
  })
  @Get('all')
  async getAllPasswords() {
    return await this.passwordRepository.getAll();
  }

  @ApiOperation({
    description: 'Retrieves all passwords between start and end indices',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'On invalid bounding indices are provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'On operation success',
    type: Password,
    isArray: true,
  })
  @Get('paginated')
  async getPasswordPage(
    @Query('start') startIndex: number,
    @Query('end') endIndex: number,
  ) {
    const passwords = await this.passwordRepository.getPage(
      startIndex,
      endIndex,
    );
    if (!passwords) {
      throw new HttpException(
        'Start must be smaller than end',
        HttpStatus.BAD_REQUEST,
      );
    }
    return passwords;
  }

  @ApiOperation({
    description:
      'Retrieves all passwords with matching country. Country is case insensitive',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'On operation success',
    type: Password,
    isArray: true,
  })
  @Get('country/:country')
  async getByCountry(@Param('country') country: string) {
    return await this.passwordRepository.getByCountry(country);
  }

  @ApiOperation({
    description:
      'Retrieves all passwords with crack time better than the one provided.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'On operation success',
    type: Password,
    isArray: true,
  })
  @Get('crack-time/:crackTime')
  async getByCrackTime(
    @Param('crackTime', new ParseIntPipe()) crackTime: number,
  ) {
    return this.passwordRepository.getPasswordByCrackTime(crackTime);
  }

  @ApiQuery({
    name: 'amount',
    description: 'How many objects is to be returned (default 10)',
    required: false,
  })
  @ApiQuery({
    name: 'distinct',
    description: 'Weather entries are to be distinct by field (default "true")',
    required: false,
  })
  @Get('top-by/:parameterName')
  async getTopByParameter(
    @Param('parameterName') parameter: string,
    @Query('amount') amount = 10,
    @Query('distinct') distinct = true,
  ) {
    return this.passwordRepository.getTopBy(parameter, amount);
  }
}
