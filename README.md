### Real-Time Environmental Data Aggregation and Analysis Platform

# System Overview

The Real-Time Environmental Data Aggregation and Analysis Platform is a high-performance, cloud-powered application focused on collecting, analyzing, and visualizing environmental data. The platform continuously gathers weather and air quality metrics from multiple sources, such as IQAir and OpenAQ, across different regions and cities around the world. By transforming this data into actionable insights, the platform allows users to analyze complex environmental patterns and view trends through detailed visualizations.
Key Features of the Platform
Real-Time Data Collection
This system is designed to collect and aggregate environmental data every hour from multiple global sources, including IQAir and OpenAQ. The collected data includes critical metrics such as temperature, humidity, air quality index (AQI), and specific pollutants like PM2.5 and CO2. By pulling data from various cities worldwide, the platform ensures users have access to the most up-to-date information on global environmental conditions, offering a reliable foundation for analysis.
Advanced Data Analysis and Visualization
The platform offers advanced data analysis tools that enable users to detect trends in environmental conditions over time. With the help of powerful visualization features, users can observe patterns such as seasonal variations in air quality, fluctuations in pollutant concentrations, and comparisons of weather data across different regions. 
User-Driven Analysis
Users are empowered to conduct custom analyses based on their interests or needs. They can create personalized visualizations by plotting and comparing various environmental data points, such as tracking air quality trends, temperature fluctuations, and pollutant level changes over time. This flexibility allows users to dive deep into specific aspects of environmental health, identify emerging trends, and track anomalies that could suggest significant environmental shifts or impacts.
Data Storage and Management
The system efficiently stores vast amounts of real-time environmental data in scalable, secure storage solutions. By using AWS services like Amazon S3 and DynamoDB, the platform ensures high durability and quick access to data. This infrastructure supports large-scale data retrieval for analysis, enabling users to seamlessly access both historical and real-time data, which is crucial for performing long-term trend analyses and understanding how environmental conditions evolve over time.


# AWS Services Used
Amazon EC2
Purpose: Hosts the backend processing logic for data fetching, analysis, and visualization.
Functionality: Runs the main server for capturing and processing data from external APIs, handling the business logic.
Amazon S3 (not confirmed if we will use it)
Purpose: Stores large datasets collected from various sources, including historical weather and air quality data.
Functionality: Ensures durable storage for environmental data and static assets.
AWS Lambda
Purpose: Executes scheduled tasks to fetch and process data from external sources like IQAir and OpenAQ without needing a dedicated server.
Functionality: Run automated functions every hour to retrieve weather and air quality data, process it, and store it in DynamoDB.
Amazon DynamoDB
Purpose: Manages dynamic data like user preferences, session data, and custom settings for data visualizations.
Functionality: Offers a scalable NoSQL solution for user-specific settings and preferences.
Amazon CloudWatch
Purpose: Monitors platform performance and operational health.
Functionality: Tracks metrics and logs to detect performance issues, ensuring continuous uptime.
Application Load Balancer (ALB)
Purpose: Balances incoming traffic across multiple EC2 instances.
Functionality: Directs user requests to the most responsive instances, preventing overload and ensuring high availability.

# System Scaling
Scaling Users and Requests
Target Initial Capacity: Designed to support 1,000 concurrent users in its initial deployment, ensuring smooth operation under moderate traffic.
Traffic Capacity: Configured to handle up to 10,000 requests per hour, covering data fetching, analysis requests, and visualization rendering.
Scaling Strategy
Auto Scaling with EC2: AWS Auto Scaling dynamically adjusts the number of EC2 instances based on traffic levels, adding instances during high demand and reducing them when traffic decreases.
Load Balancing: The Application Load Balancer (ALB) distributes incoming requests to prevent overload, optimizing system performance and user experience.
Data Processing Volume
Database Scaling: DynamoDB offer automated scaling to meet fluctuating traffic demands.
Data Volume: Processes around 5-10 MB of data per hour, ensuring efficient management of high-frequency data for seamless user access and real-time analysis.



# 1. Real-Time Dashboard
Purpose: Provide users with an overview of current environmental conditions globally and in their selected regions.
Key Features:
Interactive Map: A global map highlighting air quality index (AQI) and weather metrics in different regions. Users can zoom in on specific cities or regions.
Real-Time Metrics: Display current temperature, humidity, AQI, and major pollutants (e.g., PM2.5, CO2) in a concise, visually appealing manner.
Alerts Section: Highlight anomalies like dangerously high AQI or sudden temperature spikes with warnings. (Maybe)
Customization: Allow users to toggle specific metrics (e.g., only air quality or weather) based on their preferences.

# 2. Historical Trends and Insights
Purpose: Enable users to analyze long-term environmental trends and draw actionable insights.
Key Features:
Date Range Selector: Users can choose specific time periods to visualize data trends (e.g., monthly, yearly, or custom date ranges).
Graphical Analysis Tools: Line graphs, bar charts, and scatter plots comparing various metrics (e.g., AQI trends vs. temperature).
Comparison Feature: Compare trends across multiple regions or cities to identify geographical variations in environmental data.
Export Options: Provide options to export data and visualizations as CSV or PNG files for offline analysis. (Maybe)




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
