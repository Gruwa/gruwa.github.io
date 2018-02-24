import {IStudent} from './student.interface';

export interface ILecturer extends IStudent{
  title?: string;
  company_name?: string;
  about_me?: string;
}

