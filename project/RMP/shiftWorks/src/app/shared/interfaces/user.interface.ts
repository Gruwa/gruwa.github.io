import {
    IJobTitle,
    ILocation,
    IStation
} from './form.interface';

/**
 * Export interface IUser
 */

export interface IUser extends IUserSkills {
    name: string;
    lastName: string;
    email: any;
    phone: any;
}

/**
 * Export interface IUserSkills
 */

export interface IUserSkills {
    stations?: Array<IStation>;
    locations?: Array<ILocation>;
    jobsTitle?: Array<IJobTitle>;
}
