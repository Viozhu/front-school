/* eslint-disable */
export enum ROL {
  STUDENT,
  TEACHER,
  ADMIN,
}

export enum GENDER {
  MALE,
  FEMALE,
  OTHER,
}

export enum DAY {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
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
  studentId: IStudent[] | null;
}
