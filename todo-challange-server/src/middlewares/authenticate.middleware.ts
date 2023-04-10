import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/jwt-payload';

/**
 * Middleware for authenticating jwt token
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}  {void}
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Get auth Header
  const authHeader = req.headers.authorization;
  
  // Check authorization
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }
  
  // Verify token
  jwt.verify(authHeader, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    const token = decoded as JWTPayload;

    // Set userId inside locals of res for backend usage
    res.locals.userId = token.id;
    next();
  });
};