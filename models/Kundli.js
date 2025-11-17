// import mongoose from 'mongoose';

// const planetSchema = new mongoose.Schema({
//   name: String,
//   longitude: Number,
//   sign: String,
//   degree: Number,
//   retrograde: Boolean,
//   house: Number,
//   nakshatra: String,
//   pada: Number
// }, { _id: false });

// const houseSchema = new mongoose.Schema({
//   number: Number,
//   longitude: Number,
//   sign: String,
//   degree: Number
// }, { _id: false });

// const aspectSchema = new mongoose.Schema({
//   between: [String],
//   type: String,
//   angle: Number
// }, { _id: false });

// const chartSchema = new mongoose.Schema({
//   place: String,
//   timezone: String,
//   julian_day: Number,
//   ascendant: Number,
//   mc: Number,
//   planets: {
//     type: Map,
//     of: planetSchema
//   },
//   houses: {
//     type: Map,
//     of: houseSchema
//   },
//   aspects: [aspectSchema]
// }, { _id: false });

// const kundliSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false // Optional for anonymous access
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   birth_date: {
//     type: String,
//     required: true
//   },
//   birth_time: {
//     type: String,
//     required: true
//   },
//   place: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'],
//     required: true
//   },
//   chart: chartSchema,
//   responseTime: {
//     type: Number, // in milliseconds
//     default: 0
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'success', 'failed'],
//     default: 'pending'
//   },
//   errorMessage: {
//     type: String,
//     default: ''
//   }
// }, {
//   timestamps: true
// });

// // Indexes for faster queries
// kundliSchema.index({ userId: 1, createdAt: -1 });
// kundliSchema.index({ name: 1, birth_date: 1 });

// export default mongoose.model('Kundli', kundliSchema);






import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
  name: String,
  longitude: Number,
  sign: String,
  degree: Number,
  retrograde: Boolean,
  house: Number,
  nakshatra: String,
  pada: Number
}, { _id: false });

const houseSchema = new mongoose.Schema({
  number: Number,
  longitude: Number,
  sign: String,
  degree: Number
}, { _id: false });

const aspectSchema = new mongoose.Schema({
  between: [String],
  type: String,
  angle: Number
}, { _id: false });

const chartSchema = new mongoose.Schema({
  place: String,
  timezone: String,
  julian_day: Number,
  ascendant: Number,
  mc: Number,
  planets: {
    type: Map,
    of: planetSchema
  },
  houses: {
    type: Map,
    of: houseSchema
  },
  aspects: [aspectSchema]
}, { _id: false });

const kundliSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  birth_date: {
    type: String,
    required: true
  },
  birth_time: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: false
  },
  longitude: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  chart: chartSchema,
  responseTime: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  errorMessage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for faster queries
kundliSchema.index({ userId: 1, createdAt: -1 });
kundliSchema.index({ name: 1, birth_date: 1 });

export default mongoose.model('Kundli', kundliSchema);