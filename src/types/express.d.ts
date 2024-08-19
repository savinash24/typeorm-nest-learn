// src/types/express.d.ts
import { Request } from 'express';
import { DataSource } from 'typeorm'; // Adjust based on your actual DataSource import

declare global {
  namespace Express {
    interface Request {
      dataSource?: DataSource;
    }
  }
}
