import { SocialUser } from "@abacritt/angularx-social-login";

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
  GoogleUserId:string
  Gender: number;
  UserType: number;
  ProfilePic: string;
  GoogleUser: SocialUser;
}
