import { Router } from 'express';
import StudentsController from '@/controllers/students.controller';
import { CreateStudentDto } from '@/dtos/students.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class StudentsRoute implements Routes {
  public path = '/students';
  public router = Router();
  public studentsController = new StudentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.studentsController.getStudents);

    this.router.get(`${this.path}/:id(\\d+)`, this.studentsController.getStudentById);

    this.router.post(`${this.path}`, validationMiddleware(CreateStudentDto, 'body'), this.studentsController.createStudent);

    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateStudentDto, 'body', true), this.studentsController.updateStudent);
    
    this.router.delete(`${this.path}/:id(\\d+)`, this.studentsController.deleteStudent);
  }
}

export default StudentsRoute;
