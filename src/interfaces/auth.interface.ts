import { Request } from 'express';
import { Student } from '@/interfaces/students.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithStudent extends Request {
  student: Student;
}
