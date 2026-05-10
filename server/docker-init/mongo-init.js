// MongoDB initialization script for bookdb
// This script is executed by the official MongoDB image during container initialization.

db = db.getSiblingDB('bookdb');

// Users with pre-hashed bcrypt passwords
db.users.insertMany([
  {
    id: '1',
    username: 'admin',
    email: 'admin@book.hu',
    role: 'admin',
    password: '$2b$10$Up/Osf7dCvLKl44nFXjNN.JHSlwa1MuKpLVKam00wdzzENAK0wehO',
    createdAt: new Date()
  },
  {
    id: '2',
    username: 'dummy_user',
    email: 'dummy_user@book.hu',
    role: 'user',
    password: '$2b$10$.xvXB6AlCOO2GSBrltBclOvw3y.ufJEGrNXTJUiAOA1gXwNsyHRE6', 
    createdAt: new Date()
  },
    {
    id: '3',
    username: 'admin2',
    email: 'admin2@book.hu',
    role: 'admin',
    password: '$2b$10$Up/Osf7dCvLKl44nFXjNN.JHSlwa1MuKpLVKam00wdzzENAK0wehO',
    createdAt: new Date()
  }
]);

// Categories
db.categories.insertMany([
  { id: '1', name: 'Fantasy', description: 'Stories set in imaginary worlds featuring magic and mythical creatures' },
  { id: '2', name: 'Drama', description: 'Realistic stories focused on emotions and human relationships' },
  { id: '3', name: 'Sci-fi', description: 'Stories based on scientific and technological concepts, often set in the future or in space' },
  { id: '4', name: 'Western', description: 'Stories set in the Wild West featuring cowboys, duels, and frontier life' }
]);

// Ratings
db.ratings.insertMany([
  {
    id: '1',
    userId: '2',
    bookId: '1',
    bookclubId: '1',
    score: 5,
    comment: 'An unforgettable journey that blends rich world-building with deep friendships—every chapter pulls you further into Middle-earth.',
    createdAt: new Date()
  },
  {
    id: '2',
    userId: '1',
    bookId: '2',
    bookclubId: '1',
    score: 5,
    comment: 'A perfect mix of science, humor, and survival—Mark Watney’s problem-solving mindset makes this one of the most engaging space stories I’ve ever read.',
    createdAt: new Date()
  },

  // Additional ratings for Book 1 (The Fellowship of the Ring)
  {
    id: '3',
    userId: '1',
    bookId: '1',
    bookclubId: '1',
    score: 5,
    comment: 'Tolkien creates a breathtaking world full of adventure, loyalty, and unforgettable characters.',
    createdAt: new Date()
  },
  {
    id: '4',
    userId: '2',
    bookId: '1',
    bookclubId: '1',
    score: 4,
    comment: 'A beautifully written fantasy epic with rich lore and an incredible sense of atmosphere.',
    createdAt: new Date()
  },

  // Additional ratings for Book 2 (The Martian)
  {
    id: '5',
    userId: '2',
    bookId: '2',
    bookclubId: '1',
    score: 5,
    comment: 'Smart, funny, and intensely suspenseful—science has never been this entertaining.',
    createdAt: new Date()
  },
  {
    id: '6',
    userId: '1',
    bookId: '2',
    bookclubId: '1',
    score: 4,
    comment: 'A highly engaging survival story that balances technical detail with humor and heart.',
    createdAt: new Date()
  }
]);

db.bookclubs.insertMany([
{ id: '1',
  name: 'The Reading Circle',
  description: 'An open and friendly book club for anyone who enjoys getting lost in a good story. Whether you’re a casual reader or a dedicated bookworm, you’re welcome to join us for relaxed discussions, shared ideas, and a love of books in all genres.',
  monthlyBookId: '1',
books: [
{
    id: '1',
    title: 'Lord of the Rings: The fellowship of the ring',
    author: 'J. R. R. Tolkien',
    categoryId: '1',
    publishedAt: new Date('1954-07-29'),
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'The Martian',
    author: 'Andy Weir',
    categoryId: '3',
    publishedAt: new Date('2011-02-24'),
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Death of a Salesman',
    author: 'Arthur Miller',
    categoryId: '2',
    publishedAt: new Date('1949-02-10'),
    createdAt: new Date()
  }
],
  members: [
    {
        userId: '1',
        joinedAt: new Date()
    },
        {
        userId: '2',
        joinedAt: new Date()
    }
  ],
  createdAt: new Date()
},
{ id: '2',
  name: 'The Book Nook Club',
  description: 'A warm and welcoming space for readers who love curling up with a good book. Whether you enjoy quiet classics or exciting new stories, this club is all about sharing thoughts, discovering hidden gems, and enjoying the comfort of reading together.',
  monthlyBookId: '3',
  books: [
    {
    id: '1',
    title: 'Lord of the Rings: The fellowship of the ring',
    author: 'J. R. R. Tolkien',
    categoryId: '1',
    publishedAt: new Date('1954-07-29'),
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'The Martian',
    author: 'Andy Weir',
    categoryId: '3',
    publishedAt: new Date('2011-02-24'),
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Death of a Salesman',
    author: 'Arthur Miller',
    categoryId: '2',
    publishedAt: new Date('1949-02-10'),
    createdAt: new Date()
  }
  ],

  members: [
    {
        userId: '1',
        joinedAt: new Date()
    },
        {
        userId: '2',
        joinedAt: new Date()
    }
  ],
  createdAt: new Date()
}
]);


print('Mongo init script finished.');