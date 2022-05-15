import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateStudentDto } from '@/dtos/students.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Student } from '@/interfaces/students.interface';
import studentModel from '@/models/students.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public students = studentModel;

  public async signup(studentData: CreateStudentDto): Promise<Student> {
    if (isEmpty(studentData)) throw new HttpException(400, "You're not studentData");

    const findStudent: Student = this.students.find(student => student.email === studentData.email);
    if (findStudent) throw new HttpException(409, `You're email ${studentData.email} already exists`);

    const hashedPassword = await hash(studentData.password, 10);
    const createStudentData: Student = { id: this.students.length + 1, ...studentData, password: hashedPassword };

    return createStudentData;
  }

  public async login(studentData: CreateStudentDto): Promise<{ cookie: string; findStudent: Student }> {
    if (isEmpty(studentData)) throw new HttpException(400, "You're not studentData");

    const findStudent: Student = this.students.find(student => student.email === studentData.email);
    if (!findStudent) throw new HttpException(409, `You're email ${studentData.email} not found`);

    const isPasswordMatching: boolean = await compare(studentData.password, findStudent.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findStudent);
    const cookie = this.createCookie(tokenData);

    return { cookie, findStudent };
  }

  public async logout(studentData: Student): Promise<Student> {
    if (isEmpty(studentData)) throw new HttpException(400, "You're not studentData");

    const findStudent: Student = this.students.find(student => student.email === studentData.email && student.password === studentData.password);
    if (!findStudent) throw new HttpException(409, "You're not student");

    return findStudent;
  }

  public createToken(student: Student): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: student.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
