import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "@shared/errors/AppError";

const client = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client.connect().then();

const redisLimiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: "RateLimiterRedis",
  points: 10,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await redisLimiter.consume(request.ip);

    next();
  } catch (error) {
    throw new AppError("Too many requests", 429);
  }
}
