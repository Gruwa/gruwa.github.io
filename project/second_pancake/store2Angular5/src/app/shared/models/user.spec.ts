import * as faker from 'faker';
import {IAddress} from '../interfaces/adress.interface';
import {UserModel} from './user';
import * as Type from '../interfaces/tab.interface';

describe('UserModel', () => {
  let first_name: string;
  let last_name: string;
  let email: string;
  let title: string;
  let company_name: string;
  let about_me: string;
  let address: IAddress;
  let avatar: string;
  let created_date: any;
  let active: boolean;
  let state: Type.tabTypes;

  beforeEach(() => {
    first_name = faker.name.firstName();
    last_name = faker.name.lastName();
    email = faker.internet.email();
    title = faker.lorem.word();
    company_name = faker.company.companyName();
    about_me = faker.lorem.sentence();
    created_date = faker.date.past();
    avatar = faker.internet.url();
    active = true;
    state = 'students';
    address = {
      'city': faker.address.city(),
      'country': faker.address.country()
    };
  });

  it('has a valid model', () => {
    let user = new UserModel(first_name, last_name, email, title, company_name, about_me, address,
      avatar, created_date, active, state);

    expect(user.first_name).toEqual(first_name);
    expect(user.last_name).toEqual(last_name);
    expect(user.email).toEqual(email);
    expect(user.title).toEqual(title);
    expect(user.company_name).toEqual(company_name);
    expect(user.about_me).toEqual(about_me);
    expect(user.address).toEqual(address);
    expect(user.created_date).toEqual(created_date);
    expect(user.avatar).toEqual(avatar);
    expect(user.active).toEqual(active);
    expect(user.state).toEqual(state);
  });
});
