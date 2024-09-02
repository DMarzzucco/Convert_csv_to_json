## User Management CSV

![Mi genial imagen](img/Application.jpg)


This is an application to upload CSV files and manage them. You can easily delete, update or add new data within the file.

<p align="center">
  <a href="https://nextjs.org/docs/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWOYMtSMKxVApuqB5E7IjY9KuS15wUF4jtYg&s" width="100" alt="NextJS Logo" style="border-radius:19px" /></a>
  <a href="https://tailwindcss.com/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" width="110" alt="TailwindCSS Logo" style="border-radius:19px; margin-left:10px" /></a>
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-3521774-2945272.png" width="100" alt="TypeScript" style="border-radius:19px; margin-left:10px" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://cdn.iconscout.com/icon/free/png-256/free-postgresql-3521647-2945091.png" width="105" alt="PostgreSQL logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/prisma.png" width="106" alt="Prisma Logo" /></a>
</p>



> [!IMPORTANT]
> Follow the steps stated in the documentation to avoid having any problems. If you have any questions, you can consult the documentation of the respective services. ```./client ``` for the front-end and ```./server``` for the back-end.

## API Documentation
The API is documented using Swagger. You can access the full documentation by visiting Port: [/api/#/](http://localhost:3001/api/#/)
on your server after launching the application.

>[!NOTE]
> In order for the file to be uploaded and modified, it must comply with these columns.

```SQL
ID | Nombre | Departamento | Edad | Email
```
In case you want to modify the columns, you can enter the ``./Server/Prisma`` folder and change as needed.

## Intall and Run 

```bash
$ docker-compose up 
```


Port App: [3000](http://localhost:3000/)

## Requirements

- Nodejs (optional)
- Nestjs (optional)
- Docker

## License

Made by Dario Marzzucco.
