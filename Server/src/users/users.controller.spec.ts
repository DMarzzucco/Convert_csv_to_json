import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModules } from '../prisma/prisma.module';
import { usersValidator } from './validator/users.validator';
import { CSVParserService } from './service/csv-parser.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService
  const data = {
    id: 1,
    Nombre: 'John Doe',
    Edad: '30',
    Departamento: 'HR',
    Email: 'johndoe@example.com',
    create_time: new Date(),
    update_time: new Date(),
  }

  const mockUser = {

    create: jest.fn().mockImplementation((name: string) => ({
      id: 1,
      Nombre: "Jorge Rial",
      Edad: "23",
      Departamento: "Ventas",
      Email: "Jorge@gmail.com",
      create_time: new Date(),
      update_time: new Date(),
    })),

    findOne: jest.fn().mockImplementation((id: number) => ({
      id: 1,
      Nombre: "Jorge Rial",
      Edad: "23",
      Departamento: "Ventas",
      Email: "Jorge@gmail.com",
      create_time: new Date(),
      update_time: new Date(),
    }))
  }

  const mockValidator ={}

  const mockCSVPars = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUser },
        { provide: usersValidator, useValue: mockValidator },
        { provide: CSVParserService, useValue: mockCSVPars },
      ],
      imports: [PrismaModules],
      exports: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {

    it("shold call userService.create and return the result", async () => {
      const result = { id: 1, Nombre: "Jorge Rial", Edad: "23", Departamento: "Ventas", Email: "Jorge@gmail.com" };

      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(await controller.create(data)).toEqual(result)
    })
  })

  describe("finOne", () => {
    it("should call userService.finOne and return the result", async () => {
      const result = {
        id: 1,
        Nombre: "Jorge Rial",
        Edad: "23",
        Departamento: "Ventas",
        Email: "Jorge@gmail.com",
        create_time: new Date(),
        update_time: new Date(),
      };

      jest.spyOn(service, "findOne").mockResolvedValue(result)
    })
  })

});