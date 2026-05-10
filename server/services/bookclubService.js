const bookclubRepo = require('../repositories/bookclubRepository');
const categoryRepo = require('../repositories/categoryRepository');
const userRepo = require('../repositories/userRepository');

module.exports = {
  async findAll() {
    return await bookclubRepo.findAll();
  },

  async findMyBookclubs(userId) {
    return await bookclubRepo.findByMemberId(userId);
  },

  async findById(id) {
    const bookclub = await bookclubRepo.findById(id);

    if (!bookclub) {
      throw { status: 404, message: 'Bookclub not found.' };
    }

    return bookclub;
  },

  async create(data) {
    if (!data.name || data.name.trim() === '') {
      throw { status: 400, message: 'Bookclub name is required.' };
    }

    const payload = {
      name: data.name,
      description: data.description || '',
      monthlyBookId: data.monthlyBookId || null,
      books: Array.isArray(data.books) ? data.books : [],
      members: Array.isArray(data.members) ? data.members : [],
      createdAt: data.createdAt || new Date()
    };

    return await bookclubRepo.create(payload);
  },

  async update(id, data) {
    if (data.name !== undefined && data.name.trim() === '') {
      throw { status: 400, message: 'Bookclub name cannot be empty.' };
    }

    const updated = await bookclubRepo.update(id, data);

    if (!updated) {
      throw { status: 404, message: 'Bookclub not found.' };
    }

    return updated;
  },

  async delete(id) {
    const ok = await bookclubRepo.delete(id);

    if (!ok) {
      throw { status: 404, message: 'Bookclub not found.' };
    }

    return true;
  },

  async addMember(bookclubId, userId) {
    if (!userId) {
      throw { status: 400, message: 'User id is required.' };
    }

    const user = await userRepo.findById(userId);

    if (!user) {
      throw { status: 400, message: 'The specified user id does not exist.' };
    }

    const updated = await bookclubRepo.addMember(bookclubId, userId);

    if (!updated) {
      throw { status: 404, message: 'Bookclub not found.' };
    }

    return updated;
  },

  async removeMember(bookclubId, userId) {
    if (!userId) {
      throw { status: 400, message: 'User id is required.' };
    }

    const updated = await bookclubRepo.removeMember(bookclubId, userId);

    if (!updated) {
      throw { status: 404, message: 'Bookclub not found.' };
    }

    return updated;
  },

  async addBook(bookclubId, book) {
    if (!book.title || book.title.trim() === '') {
      throw { status: 400, message: 'Book title is required.' };
    }

    if (!book.author || book.author.trim() === '') {
      throw { status: 400, message: 'Book author is required.' };
    }

    if (!book.categoryId) {
      throw { status: 400, message: 'Category id is required.' };
    }

    const category = await categoryRepo.findById(book.categoryId);

    if (!category) {
      throw { status: 400, message: 'The specified category id does not exist.' };
    }

    const updated = await bookclubRepo.addBook(bookclubId, book);

    if (!updated) {
      throw { status: 404, message: 'Bookclub not found.' };
    }

    return updated;
  },

  async findBooksByCategory(bookclubId, categoryId) {
    const bookclub = await this.findById(bookclubId);

    if (!categoryId) {
      return bookclub.books || [];
    }

    return (bookclub.books || []).filter(book => String(book.categoryId) === String(categoryId));
  }
};