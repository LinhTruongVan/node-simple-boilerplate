import redis from "redis";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";

import { UserModel, TokenPayload } from "../models/user";
import logger from "./logger";

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = parseInt(process.env.JWT_EXPIRES_IN);

const client = redis.createClient();
client.on("error", function(err) {
  logger.error("Redis error", err);
  process.exit();
});

const createTokenRedisKey = (userId: string, tokenId: string) => `user:${userId}:jwt:${tokenId}`;

const createTokenAsync = async (user: UserModel) => {
  const tokenId = uuidv4();
  const tokenPayload: TokenPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
    jti: tokenId
  };
  const token = jwt.sign(tokenPayload, jwtSecret, {
    expiresIn: jwtExpiresIn
  });
  const redisKey = createTokenRedisKey(user.id, tokenId);
  return new Promise<string>((resolve, reject) => {
    client.set(redisKey, "1", "EX", jwtExpiresIn, err => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const validateTokenAsync = async (token: string) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(
      token,
      jwtSecret,
      {
        ignoreExpiration: true
      },
      (err, tokenPayload: TokenPayload) => {
        if (err) {
          return resolve(undefined);
        }
        const redisKey = createTokenRedisKey(tokenPayload.id, tokenPayload.jti);
        client.exists(redisKey, (err, numberOfTokens) => {
          if (err || !numberOfTokens) {
            return reject(undefined);
          }
          return resolve(tokenPayload);
        });
      }
    );
  });
};

const invalidateTokenAsync = async (token: string) => {
  return new Promise<void>((resolve, reject) => {
    jwt.verify(
      token,
      jwtSecret,
      {
        ignoreExpiration: true
      },
      (err, tokenPayload: TokenPayload) => {
        if (err) {
          return resolve();
        }
        const redisKey = createTokenRedisKey(tokenPayload.id, tokenPayload.jti);
        client.del(redisKey, err => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }
    );
  });
};

export default {
  createTokenAsync,
  validateTokenAsync,
  invalidateTokenAsync
};
