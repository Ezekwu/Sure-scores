import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, getDocs, setDoc, addDoc, collection,  updateDoc, deleteDoc, QueryConstraint, query, orderBy} from 'firebase/firestore';
import db from './firebaseConfig';
import { CookieValueTypes } from 'cookies-next';
import User from '@/types/User';
import CustomEventType from '@/types/CustomEvent';
import EventResponse from '@/types/EventResponse';

const auth = getAuth();
const provider = new GoogleAuthProvider();
  
class Api {
  async createUserWithEmailAndPassword (email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)
  }

  loginUserWithEmaiAndPassword (email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)

  }

  SignUpWithGoogle () {
    return signInWithPopup(auth, provider)
    .then(({ user }) => user)
  }

  createOrUpdateUserDetails (data: User) {
    return this.setDoc('users', data.id, data)
  }

  getUser (userId:CookieValueTypes):Promise<User> {
    return this.getDoc('users', userId!)
  }

  getEvents (): Promise<EventResponse[]> {
    return this.getDocs('events', [orderBy('created_at', 'desc')])
  }

  addEvent (data: CustomEventType) {
    return this.addDoc('events', data)
  }

  updateEvent (data: CustomEventType) {    
    return this.setDoc('events', data.id, data)
  }

  deleteEvent(eventId: string) {
    return this.deleteDoc('events', eventId)
  }

  private async getDoc<T> (
    collectionName: string,
    id: string,
  ): Promise<T> {
    const docRef = doc(db, collectionName, id );
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      return docSnap.data() as T
    } else {
      throw new Error('Document not found')
    }  
  }

  private async getDocs<T>(collectionName: string, queryConstraints?: QueryConstraint[]): Promise<T[]> {
    const collectionRef = collection(db, collectionName);
    const q = queryConstraints ? query(collectionRef, ...queryConstraints) : collectionRef;
    
    const querySnapshot = await getDocs(q);
    const docs: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
    return docs;
  }

  private async setDoc(
    collectionName: string,
    id: string,
    data: unknown,
  ) {
    return await setDoc(doc(db, collectionName, id), data);
  }

  private async addDoc(collectionName: string, data: unknown) {
    const docRef = await addDoc(collection(db, collectionName), data);
    const docId = docRef.id;
    return await updateDoc(docRef, {id: docId})
  }

  private async deleteDoc(collectionName: string, id: string) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new Api();