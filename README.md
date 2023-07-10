# TravelDiary

Welcome to TravelDiary, a Full Stack application designed to ignite your wanderlust and share your travel experiences with the world! Whether you're an avid globetrotter or a curious explorer, TravelDiary provides the perfect platform to document your adventures and discover new destinations. Powered by an impressive tech stack including MongoDB, Express.js, React.js, Node.js, Maps API, and Render, this project combines seamless functionality with stunning visuals.

## Features

- **User Authentication**: Sign up and log in to unlock a world of personalized features tailored just for you.
- **Create and Share**: Share your travel experiences by creating captivating entries complete with location details, descriptions, and mesmerizing images.
- **Discover New Places**: Immerse yourself in a collection of shared travel experiences from fellow explorers, inspiring your next unforgettable journey.
- **Interactive Maps**: With the integration of Maps API, explore interactive maps that showcase the exact locations of shared places, bringing your virtual exploration to life.
- **Responsive Design**: TravelDiary's user interface is meticulously crafted to ensure seamless access across all devices, allowing you to indulge in your travel passion anytime, anywhere.

## Getting Started

Embark on your TravelDiary journey by following these simple steps:

1. Clone the repository to your local machine using the following command:
   ```
   git clone https://github.com/ritik2358/TravelDiary.git
   ```
2. Navigate to the `Backend` directory:
   ```
   cd Backend
   ```

3. Install the required dependencies by running the following command:
   ```
   npm install
   ```
4. Set up the environment variables in a nodemon.json file like this :
   ```
   "env": {
        "DB_USER": "<your db user name",
        "DB_PASSWORD": "<your db password>",
        "DB_NAME": "<your db name>",
        "GOOGLE_API_KEY": "<your google api key",
        "JWT_KEY": "<your jwt key>"
    }
   ``` 
   Add this file in the root of Backend directory 
5. Start the Backend Server by running the following command:
   ```
   npm start
   ```

6. Navigate to the `Frontend` directory:
   ```
   cd Frontend
   ```

7. Install the required dependencies by running the following command:
   ```
   npm install
   ```
8. Set up the environment variables in a .env file like this:
   ```
   REACT_APP_GOOGLE_API_KEY=<your google api key>
   REACT_APP_BACKEND_URL=<your backend url>
   REACT_APP_ASSET_URL=<your asset url>
   ```
    Add this file in the root of Frontend directory 
   
9. Finally, start the Frontend of the Application:
   ```
   npm start
   ```

10. Open your browser and visit `http://localhost:3000` to access the captivating world of TravelDiary.

## Contributing

We believe that collaborative efforts make every adventure even more remarkable. Therefore, we wholeheartedly welcome your contributions to enhance the TravelDiary experience. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request detailing your changes.

## Tech Stack

TravelDiary harnesses the power of cutting-edge technologies to deliver an immersive and delightful experience:

- **MongoDB**: A versatile NoSQL database to securely store user information, travel entries, and other essential data.
- **Express.js**: A robust web application framework for Node.js, empowering the server-side API with efficient handling of HTTP requests and responses.
- **React.js**: A dynamic JavaScript library that enables the creation of captivating user interfaces, forming the heart of TravelDiary's client-side application.
- **Node.js**: A lightning-fast JavaScript runtime environment, enabling server-side code execution for TravelDiary's seamless functionality.
- **Maps API**: Leveraging an intuitive API, TravelDiary integrates interactive maps and geolocation services to provide an immersive exploration experience.
- **Render**: A powerful deployment platform that hosts and deploys TravelDiary, ensuring smooth performance and reliability.

## Contact

We're here to assist you on your TravelDiary journey! If you have any questions, suggestions, or just want to share your travel stories, feel free to reach out to us at [ritikraj2358@outlook.com](mailto:ritikraj2358@outlook.com).

Get ready to embark on a world of enchanting destinations and unforgettable memories with TravelDiary! Happy travels!
