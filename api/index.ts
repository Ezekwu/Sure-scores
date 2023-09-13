import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
class Api {
  createUserWithEmailAndPassword (email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => user)
  }
}