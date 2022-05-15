import { NextFunction, Request, Response } from 'express';
import { CreateStudentDto } from '@dtos/students.dto';
import { Student } from '@interfaces/students.interface';
import studentService from '@services/students.service';

class StudentsController {
  public studentService = new studentService();

  public getStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStudentsData: Student[] = await this.studentService.findAllStudent();

      res.status(200).json({ data: findAllStudentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStudentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentId = Number(req.params.id);
      const findOneStudentData: Student = await this.studentService.findStudentById(studentId);

      res.status(200).json({ data: findOneStudentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentData: CreateStudentDto = req.body;
      const createStudentData: Student = await this.studentService.createStudent(studentData);

      res.status(201).json({ data: createStudentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentId = Number(req.params.id);
      const studentData: CreateStudentDto = req.body;
      const updateStudentData: Student[] = await this.studentService.updateStudent(studentId, studentData);

      res.status(200).json({ data: updateStudentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentId = Number(req.params.id);
      const deleteStudentData: Student[] = await this.studentService.deleteStudent(studentId);

      res.status(200).json({ data: deleteStudentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentsController;
