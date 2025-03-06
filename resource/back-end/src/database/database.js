
const mongoose = require('mongoose');

const ConnectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;  // Lấy chuỗi kết nối MongoDB từ biến môi trường
    
    // Kiểm tra nếu uri là undefined
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    db.on('reconnected', () => {
      console.log('Reconnected to MongoDB');
    });

    db.on('error', error => {
      console.log('MongoDB connection error', error);
      mongoose.disconnect();  // Nếu có lỗi, ngắt kết nối
    });

    db.on('disconnected', () => {
      console.log('MongoDB connection is disconnected');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
}

module.exports = ConnectDB;
