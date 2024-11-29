import express from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create DynamoDB service object
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * Fetch data from DynamoDB tables based on city, start date, and end date.
 * @param {string} city - Name of the table (city) to fetch data from. If empty, fetch data from all cities.
 * @param {string} startDate - Start date for the data range (inclusive).
 * @param {string} endDate - End date for the data range (inclusive).
 * @returns {Promise<Array>} - Returns the fetched data as an array.
 */
const fetchData = async (city, startDate, endDate) => {
  const allCities = [
    "Abbottabad", "bahawalpur", "Charsadda", "Faislabad", "Haripur", 
    "Islamabad", "Karachi", "Lahore", "Lodhran", "Mananwala", "mangla", 
    "MohmandAgency", "Multan", "Peshawar", "Rawalpindi", "Rojhan", 
    "Sialkot", "Sukkur"
  ];

  const citiesToQuery = city ? [city] : allCities;
  const results = [];

  try {
    for (const cityName of citiesToQuery) {
      const params = {
        TableName: cityName,
        FilterExpression: "#ts BETWEEN :startDate AND :endDate",
        ExpressionAttributeNames: {
          "#ts": "PollutionTimestamp",
        },
        ExpressionAttributeValues: {
          ":startDate": startDate,
          ":endDate": endDate,
        },
      };

      const data = await dynamoDB.scan(params).promise();
      results.push(...data.Items);
    }

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from DynamoDB");
  }
};

// API endpoint to fetch data using URL parameters
app.get('/fetch-data/:city/:startDate/:endDate', async (req, res) => {
    const { city, startDate, endDate } = req.params;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Start date and end date are required." });
    }
  
    try {
      const data = await fetchData(city === "all" ? "" : city, startDate, endDate);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});