export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || token !== 'admin-token') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      error: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  req.admin = { id: 'admin', role: 'admin' };
  return next();
}
