import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'; // Use a secure secret in production

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  userType: string;
}

export function verifyAuthHeader(authHeader?: string): AuthUser {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (_err) {
    throw new Error('Invalid or expired token');
  }
} 