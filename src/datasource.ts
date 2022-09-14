import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'offers',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
});
