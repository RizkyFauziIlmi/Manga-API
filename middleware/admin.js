import dotenv from 'dotenv'

dotenv.config();

const adminKey = process.env.adminKey;

const adminMiddleware = (req, res, next) => {
  const headerAdminKey = req.get('adminKey');

  if (headerAdminKey === adminKey) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default adminMiddleware