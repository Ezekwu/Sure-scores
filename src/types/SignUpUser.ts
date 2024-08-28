import { ExpertiseLevel } from "./enums/ExpertiseLevel";
import { Gender } from "./enums/Gender";

export default interface SignUpUser {
  email: string
  password: string;
  name: string;
  phone: string;
  company_field: string;
  company_name: string;
  use_for_service: string;
  user_role: string;
  level: ExpertiseLevel,
  birthday: Date;
  gender: Gender;
}