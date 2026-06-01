import { Admin } from '../models/admin.model.js';

export async function loginAdminService({ email, password }) {
  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (!admin || admin.password !== password) {
    const error = new Error('Invalid admin credentials');
    error.statusCode = 401;
    error.code = 'UNAUTHORIZED';
    throw error;
  }

  return {
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
    },
    token: 'admin-token',
  };
}
