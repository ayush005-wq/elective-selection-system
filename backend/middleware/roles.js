const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  
  // HOD can only access their branch
  if (req.user.role === 'hod' && req.user.branch !== req.params.branch) {
    return res.status(403).json({ error: 'Branch access denied' });
  }
  
  next();
};
