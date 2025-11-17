# Astrolozee Backend (Node.js + Express)

Node.js backend service for Astrolozee application. Handles user authentication, proxies requests to Python AI service, and manages Kundli generation.

## 🚀 Deployment to Render

### Prerequisites
- GitHub account
- Render account (free tier available)
- MongoDB Atlas cluster
- Google Maps API key

### Deployment Steps

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub account
   - Select repository: `msmahatha/Astroger.BE`
   - Branch: `main`

2. **Configure Service**
   - Render will auto-detect `render.yaml`
   - Service Name: `astrolozee-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   In Render dashboard, add these environment variables:

   **Required:**
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Secret key for JWT token generation (e.g., `your-secret-key-here`)
   - `ASTRO_API_KEY` - API key for Python service (default: `supersecret@123A$trolzee`)
   
   **Optional:**
   - `GOOGLE_API_KEY` - For Google Maps Places API
   - `ASTRO_API_URL` - Python API URL (default: `https://astroger2-0.onrender.com`)
   - `PORT` - Port number (default: `5000`)

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Wait for "Your service is live 🎉" message

### Environment Variables Details

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# Python AI Service
ASTRO_API_URL=https://astroger2-0.onrender.com
ASTRO_API_KEY=supersecret@123A$trolzee

# Google Maps
GOOGLE_API_KEY=your-google-api-key

# Server
PORT=5000
```

## 🔗 API Endpoints

### Health Check
- `GET /` - Returns backend status

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Astrology
- `POST /api/astro/ask` - Ask astrology questions (with RAG)

### Kundli
- `POST /api/kundli/generate` - Generate Kundli chart

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env file with required variables
cp .env.example .env

# Start development server
npm run dev
```

## 📦 Tech Stack

- **Runtime**: Node.js 20.15.1
- **Framework**: Express 5.1.0
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **HTTP Client**: Axios
- **CORS**: Enabled for frontend origins

## 🔒 Security

- JWT-based authentication
- Secure cookie handling
- CORS configured for specific origins
- Environment variables for sensitive data
- Bcrypt password hashing

## 📝 Notes

- Free tier on Render spins down after inactivity
- First request may take 30-60 seconds to wake up
- Production URL: Will be `https://astrolozee-backend.onrender.com` (or your chosen name)

## 🐛 Troubleshooting

**MongoDB Connection Failed:**
- Verify MONGO_URI is correct
- Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
- Ensure database user has read/write permissions

**Python API Not Responding:**
- Verify ASTRO_API_URL points to deployed Python service
- Check ASTRO_API_KEY matches Python service configuration

**CORS Errors:**
- Update `corsOptions` in `index.js` to include your frontend URL
