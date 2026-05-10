const userRepo = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

module.exports = {
  async findAll() {
    return await userRepo.findAll();
  },
  async findById(id) {
    const user = await userRepo.findById(id);
    if (!user) throw { status: 404, message: 'User not found.' };
    return user;
  },
  async create(data) {
    if (!data.username || data.username.trim() === '') {
      throw { status: 400, message: 'Username is required.' };
    }
    if (!data.email) {
      throw { status: 400, message: 'Email is required.' };
    }
    if (!data.password) {
      throw { status: 400, message: 'Password is required.' };
    }
    // E-mail egyediség
    const existing = await userRepo.findByEmail(data.email);
    if (existing) {
      throw { status: 409, message: 'The email already exists.' };
    }
    // Hash the password before creating the user
    const hashed = bcrypt.hashSync(data.password, 10);
    const toCreate = { ...data, password: hashed, role: data.role || 'user' };
    return await userRepo.create(toCreate);
  },
  async update(id, data) {
    if (data.username !== undefined && data.username.trim() === '') {
      throw { status: 400, message: 'Username cannot be empty.' };
    }
    // If updating password, hash it
    const updatedData = { ...data };
    if (updatedData.password) {
      updatedData.password = bcrypt.hashSync(updatedData.password, 10);
    }
    const updated = await userRepo.update(id, updatedData);
    if (!updated) throw { status: 404, message: 'User not found.' };
    return updated;
  },
  async changePassword(id, actor, currentPassword, newPassword) {
    // actor: { id }
    const user = await userRepo.findById(id);
    if (!user) throw { status: 404, message: 'User not found.' };
    // Only owner can change password (role-based checks removed)
    if (actor.id !== id) {
      throw { status: 403, message: 'You are not the owner of this user.' };
    }
    // Require currentPassword for owner
    if (!currentPassword) throw { status: 400, message: 'Current password is required.' };
    const ok = bcrypt.compareSync(currentPassword, user.password);
    if (!ok) throw { status: 401, message: 'Current password is incorrect.' };
    if (!newPassword) throw { status: 400, message: 'New password is required.' };
    const hashed = bcrypt.hashSync(newPassword, 10);
    const updated = await userRepo.update(id, { password: hashed });
    if (!updated) throw { status: 500, message: 'Error updating password.' };
    return { message: 'Password updated successfully.' };
  },
  async delete(id) {
    const ok = await userRepo.delete(id);
    if (!ok) throw { status: 404, message: 'User not found.' };
    return true;
  },
  async findByEmail(email) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw { status: 404, message: 'User not found.' };
    return user;
  }
};