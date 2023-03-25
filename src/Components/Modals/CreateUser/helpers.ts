import { ROL, GENDER } from '@/interface';

export const selectOptionsRol = [
  {
    label: 'Students',
    value: ROL.STUDENT,
  },
  {
    label: 'Teachers',
    value: ROL.TEACHER,
  },
  {
    label: 'Admins',
    value: ROL.ADMIN,
  },
];

export const selectOptionsGender = [
  {
    label: 'Male',
    value: GENDER.MALE,
  },
  {
    label: 'Female',
    value: GENDER.FEMALE,
  },
  {
    label: 'Other',
    value: GENDER.OTHER,
  },
];
