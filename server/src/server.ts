import app from './index';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
