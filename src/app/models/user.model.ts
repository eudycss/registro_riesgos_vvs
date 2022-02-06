export interface User{
  id: number,
  name: string,
  lastname: string,
  email: string,
  active: boolean,
  username: string
}

export interface CreateUser extends Omit<User, 'id'>{
  role: number,
  password: string,
  confirmPassword:string
}
