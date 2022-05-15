import { NextFunction, Request, Response } from 'express';
import { CreateStudentDto } from '@/dtos/students.dto';
import { RequestWithStudent } from '@interfaces/auth.interface';
import { Student } from '@/interfaces/students.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentData: CreateStudentDto = req.body;
      const signUpStudentData: Student = await this.authService.signup(studentData);

      res.status(201).json({ data: signUpStudentData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentData: CreateStudentDto = req.body;
      const { cookie, findStudent } = await this.authService.login(studentData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findStudent, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithStudent, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentData: Student = req.student;
      const logOutStudentData: Student = await this.authService.logout(studentData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutStudentData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
