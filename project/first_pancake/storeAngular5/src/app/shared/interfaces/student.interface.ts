import {IAddress} from './adress.interface';

export interface IStudent {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  created_date?: any;
  active?: boolean;
  _id?: string;
  address?: IAddress;
}

