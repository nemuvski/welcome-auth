import {
  AuthError,
  User as FirebaseUser,
  signOut as firebaseSignOut,
  updateEmail,
  updatePassword,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification as firebaseSendEmailVerification,
} from 'firebase/auth';
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
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
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
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};

/**
 * ログアウト
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};

/**
 * アカウントの削除
 *
 * @param user ユーザー
 * @param password 現在のパスワード
 */
export const cancelUser = async (user: FirebaseUser, password: string) => {
  try {
    if (user.email) {
      const userCredential = await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, password)
      );
      await userCredential.user.delete();
    }
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};

/**
 * ユーザーのメールアドレスを変更
 *
 * @param user ユーザー
 * @param newEmail 新しいメールアドレス
 * @param password 現在のパスワード
 */
export const changeEmail = async (user: FirebaseUser, newEmail: string, password: string) => {
  try {
    if (user.email) {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
      await updateEmail(user, newEmail);
    }
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};

/**
 * ユーザーのパスワードを変更
 *
 * @param user ユーザー
 * @param currentPassword 現在のパスワード
 * @param newPassword 新しいパスワード
 */
export const changePassword = async (user: FirebaseUser, currentPassword: string, newPassword: string) => {
  try {
    if (user.email) {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
      await updatePassword(user, newPassword);
    }
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};

/**
 * メールアドレスの認証メールを送信する
 *
 * @param user ユーザー
 */
export const sendEmailVerification = async (user: FirebaseUser) => {
  try {
    await firebaseSendEmailVerification(user);
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};

/**
 * パスワード再設定の案内メールを送信する
 *
 * @param email メールアドレス
 */
export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new FirebaseAuthError(error as AuthError);
  }
};
