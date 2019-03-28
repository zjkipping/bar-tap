import { BaseUser, EmployeesUser, ConsumerUser, AdminUser } from '@types';
import { EMPLOYEES_USER_TYPE, CONSUMER_USER_TYPE, OWNER_USER_TYPE } from './constants';

export function isEmployeesUser(user: BaseUser | undefined): user is EmployeesUser {
  return !!user && user.type === EMPLOYEES_USER_TYPE;
}

export function isConsumerUser(user: BaseUser | undefined): user is ConsumerUser {
  return !!user && user.type === CONSUMER_USER_TYPE;
}

export function isAdminUser(user: BaseUser | undefined): user is AdminUser {
  return !!user && user.type === OWNER_USER_TYPE;
}
