/* eslint-disable */
export enum ROL {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum DAY {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum FAMILYRELATION {
  FATHER,
  MOTHER,
  BROTHER,
  SISTER,
  GRANDFATHER,
  GRANDMOTHER,
  GRANDSON,
  GRANDDAUGHTER,
  AUNT,
  UNCLE,
  COUSIN,
  NEPHEW,
  NIECE,
  FRIEND,
  OTHER,
}

export interface IPath {
  name: string;
  href: string;
}
export interface IFamilyMember {
  id: number;
  type: FAMILYRELATION;
  userMember: {
    name: string;
  };
}
export interface IStudent {
  id: number;
  email: string;
  name: string;
  age: number;
  rol: string;
  image: string;
  gender: GENDER;
  rooms: IRoom[];
  familyMember: IFamilyMember[];
}
export interface IRoom {
  id: number;
  name: string;
  content: string;
  day: DAY;
  time: string;
  capacity: number;
  students: IStudent[] | null;
}

export interface IStatusAlert {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}
