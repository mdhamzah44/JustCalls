# Just Calls

Just Calls is a mobile application built with React Native and Expo that allows users to book home services such as appliance repair, cleaning, and maintenance.
As the developer behind Just Calls, I built a user-friendly platform launched in September 2023 that connects customers with reliable home services in Lucknow. My work empowers service professionals through technology, offering features for booking appliance repair and more, while supporting partners with training, credit, and product procurement.

## Features

- User authentication with phone number
- Browse various home services
- Book services with preferred date and time
- View booked services
- Manage user profile
- Payment integration with Razorpay

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Firebase account
- Razorpay account (for payment integration)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/mdhamzah44/JustCalls.git
   cd just-calls
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if you're using Yarn:
   ```
   yarn install
   ```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Phone Authentication in the Firebase console
   - Add your app to the Firebase project and download the configuration file
   - Create a `firebase.js` file in the project root and add your Firebase configuration

4. Set up Razorpay:
   - Create a Razorpay account and obtain your API key
   - Add the Razorpay API key to your app configuration

5. Start the development server:
   ```
   expo start
   ```

## Usage

After starting the development server, you can run the app on:

- iOS Simulator: Press `i` in the terminal or click "Run on iOS simulator" in the Expo DevTools
- Android Emulator: Press `a` in the terminal or click "Run on Android device/emulator" in the Expo DevTools
- Physical Device: Scan the QR code with the Expo Go app (Android) or the Camera app (iOS)

## Project Structure

```
just-calls/
├── assets/
├── components/
├── screens/
│ ├── MainScreen.js
│ ├── HomeScreen.js
│ ├── LoginScreen.js
│ ├── ItemScreen.js
│ ├── CartScreen.js
│ ├── BookingScreen.js
│ ├── PaymentScreen.js
│ ├── BookedServicesScreen.js
│ ├── UserProfileScreen.js
│ └── SettingsScreen.js
├── navigation/
├── services/
├── utils/
├── App.js
├── firebase.js
├── app.json
└── package.json
```


## Key Components

### MainScreen
The entry point of the app, featuring an animated logo and checking internet connectivity.

### HomeScreen
Displays available services, promotional banners, and a referral option.

### LoginScreen
Handles user authentication using phone number and OTP verification.

### ItemScreen
Shows details of selected services and allows adding items to the cart.

### CartScreen
Displays items in the cart and provides options to book or checkout.

### BookingScreen
Allows users to enter booking details such as address, preferred date, and time.

### PaymentScreen
Integrates with Razorpay for secure payment processing.

## Styling and Animations

The app uses a combination of React Native's StyleSheet and react-native-reanimated for animations to create a smooth and engaging user experience.

## State Management

The app uses React's Context API for managing global state, particularly for user authentication.

## Firebase Integration

Firebase is used for:
- Phone number authentication
- Storing and retrieving user data
- Managing service listings and bookings

## Razorpay Integration

Razorpay is integrated for secure and seamless payment processing within the app.

## Contributing

Contributions to Just Calls are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Troubleshooting

If you encounter any issues during setup or development, try the following:

1. Clear the Metro bundler cache:
   ```
   expo r -c
   ```

2. Ensure all dependencies are correctly installed:
   ```
   npm install
   ```

3. Verify that your Firebase configuration in `firebase.js` is correct.

4. For Android development, ensure that Android Studio and the necessary SDKs are properly set up.

5. For iOS development, make sure Xcode is up to date (for Mac users).

If problems persist, please open an issue in the GitHub repository.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mohd Hamzah - mhd123hamzah@gmail.com

Project Link: https://github.com/mdhamzah44/JustCalls.git

## Acknowledgements

- [Expo](https://expo.io/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase](https://firebase.google.com/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Razorpay React Native](https://github.com/razorpay/react-native-razorpay)
