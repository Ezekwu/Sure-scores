export default interface User {
  email: string,
  id: string,
  name: string,
  phone: string,
  use_for_service: string,
  user_role: string,  
  organizations : string[],
}