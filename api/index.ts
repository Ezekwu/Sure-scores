import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from './firebaseConfig';

import User from '@/types/User';

const auth = getAuth();
class Api {
  createUserWithEmailAndPassword (email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)
  }

  loginUserWithEmaiAndPassword (email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
    .then(({user})=> user)

  }

  createOrUpdateUserDetails (data: User) {
    return this.setDoc('user', data.id, data)
  }

  getUser (userId:string) {
    return this.getDoc('user', userId)
  }

  private  setDoc (
    collectionName: string,
    id: string,
    data: unknown,
  ): Promise<unknown> {
    return  setDoc(doc(db, collectionName, id), data);
  }

  private async getDoc<T> (
    collectionName: string,
    id: string,
  ): Promise<T> {
    const docRef = doc(db, collectionName, id );
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      return docSnap.data as T
    } else {
      throw new Error('Document not found')
    }
     
  }
}

export default new Api();