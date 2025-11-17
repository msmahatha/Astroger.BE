import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return this.authProvider === 'local'; // Only required for local auth
    },
    minlength: 8  
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
    sparse: true // Allows null values but ensures uniqueness when present
  },
  profilePicture: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "none"],
    default: "male"
  },
  dateOfBirth: {
    type: Date,
    required: function() {
      return this.authProvider === 'local';
    }
  },
  timeOfBirth: {
    type: String,
    required: function() {
      return this.authProvider === 'local';
    }
  },
  placeOfBirth: {
    type: String,
    required: function() {
      return this.authProvider === 'local';
    }
  },
  currentLocation: {
    type: String,
    required: function() {
      return this.authProvider === 'local';
    }
  },
  maritalStatus: {
    type: String,
    enum: ["single", "married", "divorced", "widowed", "separated", "none"],
    default: "single"
  },
  religion: {
    type: String,
    enum: ["hindu", "muslim", "christian", "sikh", "jain", "buddhist", "none"],
    default: "hindu"
  },
  focusArea: {
    type: [String],            
    enum: [
      "relationship",
      "career",
      "business",
      "health & fitness",
      "family & children",
      "spiritual growth",
      "foreign settlement",
      "life purpose",
      "marital status"
    ],
    default: []               
  },
  purposeOfVisit: {
    type: String,
    enum: [
      "love",
      "marriage",
      "career",
      "health",
      "wealth",
      "peace of mind",
      "family",
      "other"
    ],
    default: "other" 
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;