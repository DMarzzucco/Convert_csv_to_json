FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Instalar wait-for-it
RUN apt-get update && apt-get install -y curl
RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it

# Usar wait-for-it para esperar a que la base de datos esté disponible
COPY ./wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# Establecer la variable de entorno
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
# Ejecutar Prisma commands
# RUN /usr/local/bin/wait-for-it db:5432 -- npx prisma generate
# RUN /usr/local/bin/wait-for-it db:5432 -- npx prisma migrate deploy
# RUN /usr/local/bin/wait-for-it db:5432 -- npm run build


# RUN npx prisma generate

# RUN npx prisma migrate deploy

# RUN npm run build

EXPOSE 3001

# CMD [ "npm", "run", "start:prod" ]
CMD /usr/local/bin/wait-for-it db:5432 --timeout=60 --strict -- \
    npx prisma generate && \
    npx prisma migrate deploy && \  
    npm run start:prod


