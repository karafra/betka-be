import { Injectable } from '@nestjs/common';
import { PasswordRepository } from 'src/repository/password.repository';

@Injectable()
export class PasswordService {
  constructor(private readonly passwordsRepository: PasswordRepository) {}
}
