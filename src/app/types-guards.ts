import { BaseUser, EmployeesUser } from '@types';
import { EMPLOYEES_USER_TYPE } from './constants';

export function isEmployeesUser(user: BaseUser | undefined): user is EmployeesUser {
  return !!user && user.type === EMPLOYEES_USER_TYPE;
}
