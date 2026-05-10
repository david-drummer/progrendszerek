const categoryRepo = require('../repositories/categoryRepository');
const bookclubRepo = require('../repositories/bookclubRepository');

module.exports = {
  async findAll() {
    return await categoryRepo.findAll();
  },

  async findById(id) {
    const cat = await categoryRepo.findById(id);
    if (!cat) throw { status: 404, message: 'Category not found.' };
    return cat;
  },

  async create(data) {
    if (!data.name || data.name.trim() === '') {
      throw { status: 400, message: 'Category name is required.' };
    }

    return await categoryRepo.create(data);
  },

  async update(id, data) {
    if (data.name !== undefined && data.name.trim() === '') {
      throw { status: 400, message: 'Category name cannot be empty.' };
    }

    const updated = await categoryRepo.update(id, data);

    if (!updated) throw { status: 404, message: 'Category not found.' };

    return updated;
  },

  async delete(id) {
    const books = await bookclubRepo.findBooksByCategoryId(id);

    if (books.length > 0) {
      throw {
        status: 409,
        message: 'Books belonging to this category exist in bookclubs, therefore it cannot be deleted.'
      };
    }

    const ok = await categoryRepo.delete(id);

    if (!ok) throw { status: 404, message: 'Category not found.' };

    return true;
  }
};