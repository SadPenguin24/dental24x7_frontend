export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: Date;
}

export interface ProfileData {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  birthday: Date | undefined;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
}

export interface DentistData {
  id: string;
  name: string;
  bio: string;
  specialty: string;
  image: string;
}

export interface DentistDataList {
  dentists: DentistData[] | undefined;
  dentist: DentistData | undefined;
}

export interface AppointmentData {
  id: string;
  status: string;
  service: string;
  date: Date;
  time: string;
  userId: string;
  dentistId: string;
  User: User;
  Dentist: DentistData;
}

export interface AppointmentInput {
  status: string;
  service: string;
  date: Date;
  time: string;
  userId: string;
  dentistId: string;
}

export interface AppointmentDataList {
  appointments: AppointmentData[] | undefined;
  appointment: AppointmentData | undefined;
}
