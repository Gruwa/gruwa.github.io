import {IAddress} from './adress.interface';

export interface UserInterface {
  company_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  title?: string;
  about_me?: string;
  avatar?: string;
  created_date?: any;
  active?: boolean;
  _id?: string;
  address?: IAddress;
}

