import { asyncHandler } from '../utils/asyncHandler.js';
import { loginAdminService } from '../services/auth.service.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('email and password are required');
  }

  const result = await loginAdminService({ email, password });

  res.status(200).json({
    success: true,
    message: 'Admin logged in successfully',
    data: result,
  });
});
