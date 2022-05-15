import { hash } from 'bcrypt';
import { CreateStudentDto } from '@/dtos/students.dto';
import { HttpException } from '@exceptions/HttpException';
import { Student } from '@/interfaces/students.interface';
import studentModel from '@/models/students.model';
import { isEmpty } from '@utils/util';

class StudentService {
  public students = studentModel;

  public async findAllStudent(): Promise<Student[]> {
    const students: Student[] = this.students;
    return students;
  }

  public async findStudentById(studentId: number): Promise<Student> {
    const findStudent: Student = this.students.find(student => student.id === studentId);
    if (!findStudent) throw new HttpException(409, "You're not student");

    return findStudent;
  }

  public async createStudent(studentData: CreateStudentDto): Promise<Student> {
    if (isEmpty(studentData)) throw new HttpException(400, "You're not studentData");

    const findStudent: Student = this.students.find(student => student.email === studentData.email);
    if (findStudent) throw new HttpException(409, `Your email ${studentData.email} already exists`);

    const hashedPassword = await hash(studentData.password, 10);
    const createStudentData: Student = { id: this.students.length + 1, ...studentData, password: hashedPassword };
    this.students = [...this.students, createStudentData];

    return createStudentData;
  }

  public async updateStudent(studentId: number, studentData: CreateStudentDto): Promise<Student[]> {
    if (isEmpty(studentData)) throw new HttpException(400, "You're not studentData");

    const findStudent: Student = this.students.find(student => student.id === studentId);
    if (!findStudent) throw new HttpException(409, "You're not student");

    const hashedPassword = await hash(studentData.password, 10);
    const updateStudentData: Student[] = this.students.map((student: Student) => {
      if (student.id === findStudent.id) student = { id: studentId, ...studentData, password: hashedPassword };
      return student;
    });

    return updateStudentData;
  }

  public async deleteStudent(studentId: number): Promise<Student[]> {
    const findStudent: Student = this.students.find(student => student.id === studentId);
    if (!findStudent) throw new HttpException(409, "You're not student");

    const deleteStudentData: Student[] = this.students.filter(student => student.id !== findStudent.id);
    return deleteStudentData;
  }
}

export default StudentService;
