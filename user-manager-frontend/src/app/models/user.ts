export interface User {
  username: string;
  password: string;
}

// TODO: change name?
export interface ApplicationUser extends User {
  firstname: string
  lastname: string
}
