//! src/database/database.providers.ts

import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [
  MongooseModule.forRoot(process.env.MONGODB_URI, {
  }),
];
