require('dotenv').config();

console.log('Checking environment variables:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set (length: ' + process.env.MONGO_URI.length + ')' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set (length: ' + process.env.JWT_SECRET.length + ')' : 'NOT SET');

if (!process.env.MONGO_URI) {
  console.error('\nERROR: MONGO_URI is not set. Please create a .env file with MONGO_URI=your_mongodb_connection_string');
}

if (!process.env.JWT_SECRET) {
  console.error('\nERROR: JWT_SECRET is not set. Please create a .env file with JWT_SECRET=your_secret_key');
}

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.log('\nExample .env file:');
  console.log('MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp');
  console.log('JWT_SECRET=your_secret_key_for_jwt_tokens');
} else {
  console.log('\nAll required environment variables are set!');
} 