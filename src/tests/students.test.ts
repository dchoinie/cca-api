import request from 'supertest';
import App from '../app';
import { CreateStudentDto } from '../dtos/students.dto';
import { Student } from '../interfaces/students.interface';
import studentModel from '../models/students.model';
import StudentRoute from '../routes/students.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Students', () => {
  describe('[GET] /students', () => {
    it('response statusCode 200 / findAll', () => {
      const findStudent: Student[] = studentModel;
      const studentsRoute = new StudentRoute();
      const app = new App([studentsRoute]);

      return request(app.getServer()).get(`${studentsRoute.path}`).expect(200, { data: findStudent, message: 'findAll' });
    });
  });

  describe('[GET] /students/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const studentId = 1;
      const findStudent: Student = studentModel.find(student => student.id === studentId);
      const studentsRoute = new StudentRoute();
      const app = new App([studentsRoute]);

      return request(app.getServer()).get(`${studentsRoute.path}/${studentId}`).expect(200, { data: findStudent, message: 'findOne' });
    });
  });

  describe('[POST] /students', () => {
    it('response statusCode 201 / created', async () => {
      const studentData: CreateStudentDto = {
        email: 'example@email.com',
        password: 'password',
      };
      const studentsRoute = new StudentRoute();
      const app = new App([studentsRoute]);

      return request(app.getServer()).post(`${studentsRoute.path}`).send(studentData).expect(201);
    });
  });

  describe('[PUT] /students/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const studentId = 1;
      const studentData: CreateStudentDto = {
        email: 'example@email.com',
        password: 'password',
      };
      const studentsRoute = new StudentRoute();
      const app = new App([studentsRoute]);

      return request(app.getServer()).put(`${studentsRoute.path}/${studentId}`).send(studentData).expect(200);
    });
  });

  describe('[DELETE] /students/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const studentId = 1;
      const deleteStudent: Student[] = studentModel.filter(student => student.id !== studentId);
      const studentsRoute = new StudentRoute();
      const app = new App([studentsRoute]);

      return request(app.getServer()).delete(`${studentsRoute.path}/${studentId}`).expect(200, { data: deleteStudent, message: 'deleted' });
    });
  });
});
