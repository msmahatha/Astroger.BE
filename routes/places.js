// // server/routes/places.js
// const express = require('express');
// const router = express.Router();
// const fetch = require('node-fetch');

// router.get('/autocomplete', async (req, res) => {
//   try {
//     const { input } = req.query;
    
//     if (!input) {
//       return res.status(400).json({ error: 'Input parameter is required' });
//     }

//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyAoBl7NNCqtw_7g9K7bWrPq1m3ZI6P2_g8&types=geocode`
//     );
    
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching places:', error);
//     res.status(500).json({ error: 'Failed to fetch location suggestions' });
//   }
// });

// module.exports = router;