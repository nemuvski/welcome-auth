import firebase from 'firebase/app';
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

/**
 * アカウントの削除
 *
 * @param user ユーザー
 * @param password 現在のパスワード
 */
export const cancelUser = async (user: firebase.User, password: string) => {
  try {
    if (user.email) {
      const authCredential = firebase.auth.EmailAuthProvider.credential(user.email, password);
      const userCredential = await user.reauthenticateWithCredential(authCredential);
      await userCredential.user?.delete();
    }
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};

/**
 * ユーザーのメールアドレスを変更
 *
 * @param user ユーザー
 * @param newEmail 新しいメールアドレス
 * @param password 現在のパスワード
 */
export const changeEmail = async (user: firebase.User, newEmail: string, password: string) => {
  try {
    if (user.email) {
      const authCredential = firebase.auth.EmailAuthProvider.credential(user.email, password);
      const userCredential = await user.reauthenticateWithCredential(authCredential);
      await userCredential.user?.updateEmail(newEmail);
    }
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};

/**
 * ユーザーのパスワードを変更
 *
 * @param user ユーザー
 * @param currentPassword 現在のパスワード
 * @param newPassword 新しいパスワード
 */
export const changePassword = async (user: firebase.User, currentPassword: string, newPassword: string) => {
  try {
    if (user.email) {
      const authCredential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      const userCredential = await user.reauthenticateWithCredential(authCredential);
      await userCredential.user?.updatePassword(newPassword);
    }
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};

/**
 * メールアドレスの認証メールを送信する
 *
 * @param user ユーザー
 */
export const sendEmailVerification = async (user: firebase.User) => {
  try {
    await user.sendEmailVerification();
  } catch (error) {
    throw new FirebaseAuthError(error);
  }
};
