import {UserInterface} from './../interfaces/user.interface';
import {CreateObject} from './object';
import {IAddress} from '../interfaces/adress.interface';

export class User extends CreateObject implements UserInterface {

  public first_name: string = '';
  public last_name: string = '';
  public email: string = '';
  public title: string = '';
  public company_name: string = '';
  public about_me: string = '';
  public address: IAddress;
  public avatar: string = '';
  public created_date: any;
  public active: boolean = true;
  public state: string = 'student';
}
