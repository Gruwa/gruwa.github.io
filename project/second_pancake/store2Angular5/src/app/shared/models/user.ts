import {UserInterface} from './../interfaces/user.interface';
import {IAddress} from '../interfaces/adress.interface';
import * as Types from '../interfaces/tab.interface';

export class UserModel implements UserInterface {

  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public title: string,
    public company_name: string,
    public about_me: string,
    public address: IAddress,
    public avatar: string,
    public created_date: any,
    public active: boolean,
    public state: Types.tabTypes
  ) { }

  // public first_name: string = '';
  // public last_name: string = '';
  // public email: string = '';
  // public title: string = '';
  // public company_name: string = '';
  // public about_me: string = '';
  // public address: IAddress;
  // public avatar: string = '';
  // public created_date: any;
  // public active: boolean = true;
  // public state: Type.tabTypes = 'students';
}
