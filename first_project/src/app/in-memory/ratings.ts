import { Rating } from './models';

export const RATINGS: Rating[] = [
  {
    id: '1',
    userId: '2',
    bookId: '1',
    bookclubId: '1',
    score: 5,
    comment:
      'An unforgettable journey that blends rich world-building with deep friendships—every chapter pulls you further into Middle-earth.',
    createdAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    bookId: '2',
    bookclubId: '1',
    score: 5,
    comment:
      'A perfect mix of science, humor, and survival—Mark Watney’s problem-solving mindset makes this one of the most engaging space stories I’ve ever read.',
    createdAt: new Date(),
  },
];