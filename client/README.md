## User Management API

This is an application with a basic interface made with [Next.js 14](https://nextjs.org/docs/)
and [TailwindCSS](https://tailwindcss.com/) that allows you to upload a CSV file, edit it based on CRUD operations and
you can download the file again.

<p align="center">
  <a href="https://nextjs.org/docs/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWOYMtSMKxVApuqB5E7IjY9KuS15wUF4jtYg&s" width="100" alt="NextJS Logo" style="border-radius:19px" /></a>
  <a href="https://tailwindcss.com/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" width="110" alt="TailwindCSS Logo" style="border-radius:19px; margin-left:10px" /></a>
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-3521774-2945272.png" width="110" alt="TypeScript" style="border-radius:19px; margin-left:10px" /></a>
</p>

> [!NOTE]
> Before starting the application you must start the server along with the database, for this you must use Docker to start the database ``` docker-compose up db ``` and for the server you must enter its folder ```./Server``` and follow the procedures indicated in the documentation.

## Getting Started

Run the development server:

```bash
# para 
$ npm run dev

# copile the code
$ npm run build

# if you don't have NodeJS in your local machine, you can starting with docker.
$ docker-compose up client  
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

- Nodejs (optional)
- Nestjs (optional)
- Docker

## License

Made by Dario Marzzucco.
