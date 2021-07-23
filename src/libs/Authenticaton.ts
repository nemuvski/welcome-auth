import { auth } from './Firebase';
import { FirebaseAuthError } from './FirebaseAuthError';

/**
 * 登録
 *
 * @param email
 * @param password
 */
export const signUp = async (email: string, password: string) => {
  try {
    return await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};

/**
 * ログイン
 *
 * @param email
 * @param password
 */
export const signIn = async (email: string, password: string) => {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};

/**
 * ログアウト
 */
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};
