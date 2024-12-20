import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModules } from '../../prisma/prisma.module';
import { usersValidator } from '../validator/users.validator';
import { CSVParserService } from './csv-parser.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModules],
      providers: [UsersService, usersValidator, CSVParserService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
