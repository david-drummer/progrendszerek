const ratingRepo = require('../repositories/ratingRepository');
const bookRepo = require('../repositories/bookclubRepository');

module.exports = {
  async findAll() {
    return await ratingRepo.findAll();
  },
  async findById(id) {
    const rating = await ratingRepo.findById(id);
    if (!rating) throw { status: 404, message: 'Rating not found.' };
    return rating;
  },
  async create(data) {
    if (!data.bookId) {
      throw { status: 400, message: 'bookId is required.' };
    }
    const book = await bookRepo.findById(data.bookId);
    if (!book) {
      throw { status: 400, message: 'The specified bookId does not exist.' };
    }
    if (typeof data.score !== 'number' || !Number.isInteger(data.score) || data.score < 1 || data.score > 5) {
      throw { status: 400, message: 'The score must be an integer between 1 and 5.' };
    }
    if (!data.userId) throw { status: 400, message: 'userId is required.' };
    return await ratingRepo.create(data);
  },

  async update(id, data, actor) {
    if (data.score !== undefined) {
      if (typeof data.score !== 'number' || !Number.isInteger(data.score) || data.score < 1 || data.score > 5) {
        throw { status: 400, message: 'The score must be an integer between 1 and 5.' };
      }
    }
    const existing = await ratingRepo.findById(id);
    if (!existing) throw { status: 404, message: 'Rating not found.' };
    // only owner can update (role-based checks removed)
    if (!idsEqual(actor.id, existing.userId)) {
      throw { status: 403, message: 'You are not the owner of this rating.' };
    }
    const updated = await ratingRepo.update(id, data);
    return updated;
  },
  async delete(id, actor) {
    const existing = await ratingRepo.findById(id);
    if (!existing) throw { status: 404, message: 'Rating not found.' };
    // allow admin to delete any rating, otherwise only owner can delete
    if (actor.role !== 'admin' && !idsEqual(actor.id, existing.userId)) {
      throw { status: 403, message: 'You are not the owner of this rating.' };
    }
    const ok = await ratingRepo.delete(id);
    if (!ok) throw { status: 404, message: 'Rating not found.' };
    return true;
  },
  async findByBookId(bookId) {
    return await ratingRepo.findByBookId(bookId);
  },
  async findByUserId(userId) {
    return await ratingRepo.findByUserId(userId);
  }
};

function idsEqual(a, b) {
  // both null/undefined
  if (!a && !b) return true;
  if (!a || !b) return false;
  const { ObjectId } = require('mongodb');
  try {
    const ao = new ObjectId(String(a));
    const bo = new ObjectId(String(b));
    return ao.equals(bo);
  } catch (e) {
    return String(a) === String(b);
  }
}