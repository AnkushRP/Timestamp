// index.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp endpoint
app.get("/api/:date?", (req, res) => {
  let date;
  const dateParam = req.params.date;

  if (!dateParam) {
    // Handle empty date parameter (current time)
    date = new Date();
  } else {
    // Check if it's a Unix timestamp (number)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Successful response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port ' + listener.address().port);
});
