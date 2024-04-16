server:
- npm i
- npx sequelize db:create
- npx sequelize db:migrate
- npx sequelize db:seed:all
- npm run dev

client: 
- npm i
- npm run dev
