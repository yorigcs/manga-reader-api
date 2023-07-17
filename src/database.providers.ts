import { DataSource } from 'typeorm';
import config from './configuration/env.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        ...config().database,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
