const dbModule = require('../db');
const { ObjectId } = require('mongodb');

async function collection() {
  const db = dbModule.getDb();
  return db.collection('bookclubs');
}

module.exports = {
  async findAll() {
    const col = await collection();
    const docs = await col.find({}).toArray();
    return docs.map(toPublic);
  },

  async findById(id) {
    const col = await collection();

    const oid = toObjectId(id);
    if (oid) {
      const doc = await col.findOne({ _id: oid });
      if (doc) return toPublic(doc);
    }

    const doc = await col.findOne({ id: String(id) });
    return toPublic(doc);
  },

  async findByMemberId(userId) {
    const col = await collection();

    console.log('SEARCH MEMBER USER ID:', userId);

    const docs = await col.find({
      'members.userId': String(userId)
    }).toArray();

    console.log('FOUND BOOKCLUBS:', docs.length);

    return docs.map(toPublic);
  },

  async create(data) {
    const col = await collection();

    const doc = {
      name: data.name,
      description: data.description || '',
      monthlyBookId: data.monthlyBookId || null,
      books: Array.isArray(data.books) ? data.books : [],
      members: Array.isArray(data.members) ? data.members : [],
      createdAt: data.createdAt || new Date()
    };

    const res = await col.insertOne(doc);
    const created = await col.findOne({ _id: res.insertedId });

    return toPublic(created);
  },

  async update(id, data) {
    const col = await collection();
    const filter = buildIdFilter(id);
    if (!filter) return null;

    const patch = { ...data };

    delete patch.id;
    delete patch._id;

    const res = await col.findOneAndUpdate(
      filter,
      { $set: patch },
      { returnDocument: 'after' }
    );

    return toPublic(res.value || res);
  },

  async delete(id) {
    const col = await collection();
    const filter = buildIdFilter(id);
    if (!filter) return false;

    const res = await col.deleteOne(filter);
    return res.deletedCount > 0;
  },

  async addMember(bookclubId, userId) {
    const col = await collection();
    const filter = buildIdFilter(bookclubId);
    if (!filter) return null;

    const member = {
      userId: String(userId),
      joinedAt: new Date()
    };

    const res = await col.findOneAndUpdate(
      filter,
      {
        $addToSet: {
          members: member
        }
      },
      { returnDocument: 'after' }
    );

    return toPublic(res.value || res);
  },

  async removeMember(bookclubId, userId) {
    const col = await collection();
    const filter = buildIdFilter(bookclubId);
    if (!filter) return null;

    const res = await col.findOneAndUpdate(
      filter,
      {
        $pull: {
          members: { userId: String(userId) }
        }
      },
      { returnDocument: 'after' }
    );

    return toPublic(res.value || res);
  },

  async addBook(bookclubId, book) {
    const col = await collection();
    const filter = buildIdFilter(bookclubId);
    if (!filter) return null;

    const newBook = {
      id: book.id || new ObjectId().toString(),
      title: book.title,
      author: book.author,
      categoryId: book.categoryId,
      publishedAt: book.publishedAt ? new Date(book.publishedAt) : null,
      createdAt: new Date()
    };

    const res = await col.findOneAndUpdate(
      filter,
      {
        $push: {
          books: newBook
        }
      },
      { returnDocument: 'after' }
    );

    return toPublic(res.value || res);
  },

  async findBooksByCategoryId(categoryId) {
  const col = await collection();

  const docs = await col.find({
    'books.categoryId': String(categoryId)
  }).toArray();

  const books = [];

  docs.forEach(bookclub => {
    (bookclub.books || []).forEach(book => {
      if (String(book.categoryId) === String(categoryId)) {
        books.push({
          ...book,
          bookclubId: bookclub.id || bookclub._id?.toString(),
          bookclubName: bookclub.name
        });
      }
    });
  });

  return books;
}
};

function toPublic(doc) {
  if (!doc) return null;

  const out = { ...doc };

  if (out._id) {
    out.id = out._id.toString();
    delete out._id;
  } else if (out.id) {
    out.id = String(out.id);
  }

  return out;
}

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

function buildIdFilter(id) {
  const oid = toObjectId(id);

  if (oid) {
    return {
      $or: [
        { _id: oid },
        { id: String(id) }
      ]
    };
  }

  return { id: String(id) };
}