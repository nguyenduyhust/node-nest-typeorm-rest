### development
docker-compose up
yarn install
yarn setup
yarn start:dev

### production
docker-compose -f docker-compose.prod.yaml --env-file=.env.prod up

swagger: http://localhost:3000/doc/#/