import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PasswordRepository } from 'src/repository/password.repository';

@ApiTags('options')
@Controller('api/options')
export class OptionsController {
  constructor(
    private readonly passwordRepository: PasswordRepository,
  ) {
  }
  
  @Get('countries')
  @ApiOkResponse({
    description: 'On operation success',
    status: HttpStatus.OK,
  })
  async getCountryOptions() {
    return this.passwordRepository.getDistinctCountries();
  }
}