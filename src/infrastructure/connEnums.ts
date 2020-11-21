import dotenv = require('dotenv');
dotenv.config();
export const connections = {
  localhost: {
    type: 'postgres',
    host: 'localhost',
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    port: 5432,
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    },
    logging: true
  },
  test: {
    type: 'postgres',
    host: 'host.test.com',
    username: 'postgres',
    password: 'postgres',
    database: 'examplo',
    port: 5432,
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    },
    logging: true
  },
  development: {
    type: 'postgres',
    host: `${process.env.SERVICE_NAME}-db`,
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    port: 5432,
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'migrations',
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    },
    logging: true
  },
  homologation: {
    type: 'postgres',
    username: 'postgres',
    password: 'password',
    database: 'example',
    host: 'host.homo.com',
    port: 5432,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'migrations',
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    }
  },
  production: {
    type: 'postgres',
    username: 'postgres',
    password: 'password',
    database: 'example',
    host: 'host.prod.com',
    port: 5432,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'migrations',
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    }
  }
};