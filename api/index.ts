import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc ,setDoc } from 'firebase/firestore';
import db from './firebaseConfig';

import User from '@/types/User';

const auth = getAuth();
class Api {
  
  createUserWithEmailAndPassword (email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)
  }

  createOrUpdateUserDetails (data: User) {
    return this.setDoc('user', data.id, data)
  }

  private  setDoc (
    collectionName: string,
    id: string,
    data: unknown,
  ): Promise<unknown> {
    return  setDoc(doc(db, collectionName, id), data);
  }
}

export default new Api();