import bcrypt from "bcrypt-nodejs";

const ROUNDS = 10;

const hashPasswordAsync = async (plainText: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(ROUNDS, (err, salt) => {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(plainText, salt, undefined, (err, hash) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  });
};

const comparePasswordAsync = async (plainText: string, hash: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(plainText, hash, (err: Error, isMatch: boolean) => {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

export default {
  hashPasswordAsync,
  comparePasswordAsync
};
