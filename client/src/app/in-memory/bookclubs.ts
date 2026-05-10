import { Bookclub } from './models';

export const BOOKCLUBS: Bookclub[] = [
  {
    id: '1',
    name: 'The Reading Circle',
    description:
      'An open and friendly book club for anyone who enjoys getting lost in a good story. Whether you’re a casual reader or a dedicated bookworm, you’re welcome to join us for relaxed discussions, shared ideas, and a love of books in all genres.',
    monthlyBookId: '1',
    books: [
      {
        id: '1',
        title: 'Lord of the Rings: The fellowship of the ring',
        author: 'J. R. R. Tolkien',
        categoryId: '1',
        publishedAt: '1954-07-29',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'The Martian',
        author: 'Andy Weir',
        categoryId: '3',
        publishedAt: '2011-02-24',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Death of a Salesman',
        author: 'Arthur Miller',
        categoryId: '2',
        publishedAt: '1949-02-10',
        createdAt: new Date().toISOString(),
      },
    ],
    members: [
      {
        userId: '1',
        joinedAt: new Date().toISOString(),
      },
      {
        userId: '2',
        joinedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'The Book Nook Club',
    description:
      'A warm and welcoming space for readers who love curling up with a good book. Whether you enjoy quiet classics or exciting new stories, this club is all about sharing thoughts, discovering hidden gems, and enjoying the comfort of reading together.',
    monthlyBookId: '3',
    books: [
      {
        id: '1',
        title: 'Lord of the Rings: The fellowship of the ring',
        author: 'J. R. R. Tolkien',
        categoryId: '1',
        publishedAt: '1954-07-29',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'The Martian',
        author: 'Andy Weir',
        categoryId: '3',
        publishedAt: '2011-02-24',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Death of a Salesman',
        author: 'Arthur Miller',
        categoryId: '2',
        publishedAt: '1949-02-10',
        createdAt: new Date().toISOString(),
      },
    ],
    members: [
      {
        userId: '1',
        joinedAt: new Date().toISOString(),
      },
      {
        userId: '2',
        joinedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
];