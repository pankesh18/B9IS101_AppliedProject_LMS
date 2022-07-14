export class UserProfile {
  userinfo?: {
      sub: string;
      email: string;
      name: string;
      picture: string;
  }
}



export class LMSUser {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  password:string
  Gender: number;
  UserType: number;

}
