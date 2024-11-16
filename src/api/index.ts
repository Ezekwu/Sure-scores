import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, getDocs, setDoc, addDoc, collection, deleteDoc, QueryConstraint, query, orderBy, where } from 'firebase/firestore';
import db from './firebaseConfig';
import { CookieValueTypes } from 'cookies-next';
import { getCookie } from 'cookies-next';
import User from '@/src/types/User';
import CustomEventType from '@/src/types/CustomEvent';
import EventResponse from '@/src/types/EventResponse';
import Company from '@/src/types/Company';
import CompanyMember from '@/src/types/CompanyMember';
import CompanyRef from '@/src/types/CompanyRef';
import Project from '../types/Project';

const auth = getAuth();
const provider = new GoogleAuthProvider();
const activeCompanyId = getCookie('active_companyId');


class ApiService {
  async createUserWithEmailAndPassword (email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)
  }

  async loginUserWithEmaiAndPassword (email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)
  }

  SignUpWithGoogle () {
    return signInWithPopup(auth, provider)
    .then(({ user }) => user)
  }

  createOrUpdateUser (data: User) {
    return this.setDoc('users', data.id, data)
  }

  getUser (userId:CookieValueTypes):Promise<User> {
    return this.getDoc('users', userId!)
  }

  createCompany(data: Company): Promise<Company> {
    return this.addDoc('companies', data)
  }

  createCompanyRef(companyRef: CompanyRef, companyId: string) {
    return this.setDoc('companyRefs', companyId, companyRef)
  }

  getCompany(companyId: CookieValueTypes): Promise<Company> {
    return this.getDoc('companies', companyId!)
  }

  getCompanyRef(companyId: CookieValueTypes): Promise<CompanyRef> {
    return this.getDoc('companyRefs', `${companyId}`)
  }

  getCompaniesRef(orgIds: string[]): Promise<CompanyRef[]> {    
    return this.getDocs('companyRefs', [where('__name__', 'in', orgIds), ] )
  }

  addMember(member: CompanyMember, companyId: string
  ) {
    return this.setDoc(`companies/${companyId}/members`, member.id, member )
  }

  getMembers(companyId: CookieValueTypes):Promise<CompanyMember[]>{
    return this.getDocs(`companies/${companyId}/members`)
  }

  getMember(companyId: CookieValueTypes, memberId: string): Promise<CompanyMember> {
    return this.getDoc(`companies/${companyId}/members`, memberId)
  }


  getEvents (companyId:CookieValueTypes): Promise<EventResponse[]> {
    return this.getDocs(`companies/${companyId}/events`, [orderBy('created_at', 'desc'), ])
  }

  addEvent (data: CustomEventType) {
    return this.addDoc(`companies/${activeCompanyId}/events`, data)
  }

  updateEvent (data: CustomEventType) {    
    return this.setDoc(`companies/${activeCompanyId}/events`, data.id, data)
  }

  deleteEvent(eventId: string) {
    return this.deleteDoc(`companies/${activeCompanyId}/events`, eventId)
  }

  getProjects(): Promise<Project[]> {
    return this.getDocs(`companies/${activeCompanyId}/projects`)
  }

  getProject(projectId: string): Promise<Project> {
    return this.getDoc(`companies/${activeCompanyId}/projects`, projectId)
  } 

  addProject(project: Project) {    
    return this.addDoc(`companies/${activeCompanyId}/projects`, project)
  }

  // serializeFields<T extends DocumentData>(fileldsToserialize: (keyof T)[]): FirestoreDataConverter<T> {
  //   return {
  //     toFirestore(data: WithFieldValue<T>) {
  //       return data;
  //     },

  //     fromFirestore(snapshot) {
  //       const data = snapshot.data() as T;

  //       fileldsToserialize.forEach((field) => {
  //         if (data[field] as unknown instanceof Timestamp) {
  //           data[field] = data[field].toDate().toDateString(); 
  //         }
  //       });
  //       return data as T;
  //     },
  //   };
  // }


  async doesDocumentExist(  
    collectionName: string,
    id: string
  ) {
    const docRef = doc(db, collectionName, id );
    const docSnap = await getDoc(docRef);

    return docSnap.exists()
  }

  private async getDoc<T> (
    collectionName: string,
    id: string,
  ): Promise<T> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
  

    if(docSnap.exists()){
      return docSnap.data() as T
    } else {
      throw new Error('Document not found')
    }  
  }

  private async getDocs<T>(collectionName: string, queryConstraints?: QueryConstraint[]): Promise<T[]> {
    const collectionRef = collection(db, collectionName)
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

  private async addDoc<T extends { id?: string }>(collectionName: string, data: T):Promise<T> {
    const docRef = await addDoc(collection(db, collectionName), data);
    const docId = docRef.id;
    const dataWithId = {...data, id: docId};

     await setDoc(docRef, dataWithId) 
     return dataWithId 
  }

  private async deleteDoc(collectionName: string, id: string) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

const Api = new ApiService();
export {Api}