import { User } from './models';

export const USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@book.hu',
    role: 'admin',
    // bcrypt hash copied from server/docker-init/mongo-init.js (demo only)
    password: 'admin', 
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'dummy_user',
    email: 'dummy_user@book.hu',
    role: 'user',
    password: 'dummy_user',
    createdAt: new Date(),
  },
];