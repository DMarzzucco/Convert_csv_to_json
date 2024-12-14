import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { PrismaModules } from '../../prisma/prisma.module';
import { usersValidator } from '../validator/users.validator';
import { CSVParserService } from '../service/csv-parser.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

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
  let csvParserService: CSVParserService;

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
    })),
    findAll: jest.fn().mockResolvedValue([data]),
    findByQuerie: jest.fn().mockResolvedValue([data]),
    insertFile: jest.fn().mockResolvedValue({ message: "Upload File successfully from users/upload" }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      Nombre: "Walter Steiner",
      Edad: "34",
      Departamento: "Ventas",
      Email: "Wal@gmail.com",
      create_time: new Date(),
      update_time: new Date()
    }),
    remove: jest.fn().mockResolvedValue(undefined),
    removeAll: jest.fn().mockResolvedValue(undefined)
  }

  const mockValidator = {}

  const mockCSVPars = {
    downloadFile: jest.fn().mockRejectedValue("csv content"),
    parse: jest.fn().mockResolvedValue([data])
  }

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
    service = module.get<UsersService>(UsersService);
    csvParserService = module.get<CSVParserService>(CSVParserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // Create a user
  describe("create", () => {
    it("shold call userService.create and return the result", async () => {
      const result = { id: 1, Nombre: "Jorge Rial", Edad: "23", Departamento: "Ventas", Email: "Jorge@gmail.com" };

      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(await controller.create(data)).toEqual(result)
    })
  })
  // find User by ID
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
  // download CSV
  describe("downloadCSV", () => {
    it("shold call userService.findAll and csvParserService.downloadFile and return CSV content", async () => {
      const csvContent = "csv content";
      jest.spyOn(service, "findAll").mockResolvedValue([data]);
      jest.spyOn(csvParserService, "downloadFile").mockResolvedValue(csvContent);
      const res = {
        header: jest.fn(),
        send: jest.fn()
      };
      await controller.downloadCSV(res as any);
      expect(res.header).toHaveBeenCalledWith('Content-Type', 'text/csv')
      expect(res.header).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename=Userdata.csv');
      expect(res.send).toHaveBeenCalledWith(csvContent)
    });
    it("should throw InternalServerErrorException on Error", async () => {
      jest.spyOn(service, "findAll").mockRejectedValue(new Error('Database error'));
      const res = {
        header: jest.fn(),
        send: jest.fn(),
      };
      await expect(controller.downloadCSV(res as any)).rejects.toThrow(InternalServerErrorException);
    })
  })
  // upload file
  describe('uploadFile', () => {
    it('should call csvParserService.parse and userService.inserFile and return success message', async () => {

      const file = {
        mimetype: "text/csv",
        buffer: Buffer.from('some,csv,content')
      } as Express.Multer.File;
      const parseData = [{
        Nombre: 'John Doe',
        Edad: '30',
        Departamento: 'IT',
        Email: 'john.doe@example.com',
      }]

      jest.spyOn(csvParserService, "parse").mockResolvedValue(parseData)
      jest.spyOn(service, "insertFile").mockResolvedValue([data])

      const result = { message: "Upload File successfully from users/upload" };

      expect(await controller.uploadFile(file)).toEqual(result);
    })
  })
  // SearchByQuery
  describe("searchUserbyQuery", () => {
    it("should call userService.findByQuerie and return result", async () => {
      const result = [data];
      jest.spyOn(service, "findByQuerie").mockResolvedValue(result);
      expect(await controller.searchUserbyQuery("Walter")).toEqual(result)
    })
    it("should throw BadRequestException if query is missing", async () => {
      await expect(controller.searchUserbyQuery("")).rejects.toThrow(BadRequestException)
    })
  })
  // findAll
  describe("findAll", () => {
    it("should call userService.findAll and return result", async () => {
      const result = [data];
      jest.spyOn(service, "findAll").mockResolvedValue(result)
      expect(await controller.findAll()).toEqual(result)
    })
  })
  // update
  describe("update", () => {
    it("should call userService.update and return update user", async () => {
      const result = data
      jest.spyOn(service, "update").mockResolvedValue(result)
      expect(await controller.update("1", data)).toEqual(result)
    })
  })
  // remove
  describe("remove", () => {
    it("should call userService.remove and return succes", async () => {
      jest.spyOn(service, "remove").mockResolvedValue(undefined);
      expect(await controller.remove('1')).toBeUndefined();
    })
    it('should throw InternalServerErrorException on error', async () => {
      jest.spyOn(service, "remove").mockRejectedValue(new Error('Delete error'))
    })
  })
  // removeAll
  describe("removeAll", () => {
    it("should call userService.removeAll and return seccues", async () => {
      jest.spyOn(service, "removeAll").mockResolvedValue(undefined)
      expect(await controller.removeAll()).toBeUndefined()
    })
  })

});