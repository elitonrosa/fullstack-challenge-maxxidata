import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import * as path from 'path';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../..') + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/*{.ts,.js}'],
  migrationsRun: true,
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);
