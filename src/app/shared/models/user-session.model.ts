import { ERole } from '../utils/ERole';

export class UserSession {
  public role: ERole;
  public name: string;
  public avatar: string;
  public emailVerified: boolean;
  public socialAccountLogin: boolean;
  public email: string;
  public accessToken: string;
}
