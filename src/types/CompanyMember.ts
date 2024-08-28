import { ExpertiseLevel } from "./enums/ExpertiseLevel";
import User from "./User";

export default interface CompanyMember extends Omit<User, 'organizations' | 'use_for_service'>  {
  member_type: 'admin' | 'member',
}