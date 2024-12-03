

# Family Web App

**Family Web App** is a web-based platform designed to help families organize and store contact information for their members. This application enables families to manage essential data, including names, emails, phone numbers, and photos of family members. It also supports a "profile" section where members can update their information, and a real-time database sync feature powered by Firebase.

The web app allows users to:
- View and manage a list of family members.
- Update profile information such as name, phone, email, and more.
- Search and filter family members based on various fields (e.g., name, phone number).
- View each family member's profile and update their information as needed.

## Features
- **Real-Time Database**: All data is stored in Firebase's Realtime Database and can be updated or fetched in real-time.
- **User Profiles**: Each family member can create and edit their profile, including a picture, contact details, and personal information.
- **Search Functionality**: Members can be filtered by their name, email, mobile, or other fields.
- **Editable Information**: Family members can update their personal details (except their user ID and timestamps).
- **Responsive Design**: The app is responsive and works on all devices, including desktops, tablets, and mobiles.
- **Built with React and Firebase**: This app is built using React for the frontend and Firebase for the backend (database and authentication).

## Technology Stack
- **Frontend**: React, React Router, React Icons
- **Backend**: Firebase Realtime Database, Firebase Authentication
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: React Hooks
- **Other**: React Toastify for notifications, React Hook Form for form handling

## Setup

To run this project locally, follow these steps:

### 1. Clone the Repository
Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/sadu24/Family-Website.git
```

### 2. Install Dependencies
Navigate to the project directory and install the required dependencies:
```bash
cd family-web-app
npm install
```

### 3. Setup Firebase
You need to have a Firebase account and create a new Firebase project to use the Realtime Database and Authentication.
- Go to the [Firebase Console](https://console.firebase.google.com/), create a new project, and enable Firebase Authentication (for email/password login) and Realtime Database.
- Get your Firebase config object and replace the existing Firebase config in `firebase/FirebaseConfig.js`.

### 4. Run the Development Server
Once the dependencies are installed and Firebase is set up, run the app with the following command:
```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

## Directory Structure

Here is an overview of the project structure:

```
family-web-app/
│
├── public/                    # Static files like images, icons
├── src/                       # All source code
│   ├── components/            # Reusable components like Navbar, MemberCard, etc.
│   ├── firebase/              # Firebase configuration and services
│   ├── pages/                 # Main app pages like Home, Profile
│   ├── App.js                 # Root component with routing
│   └── index.js               # Main entry point for React app
│
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite configuration for the app
├── .gitignore                 # Git ignore file
├── package.json               # Project dependencies and scripts
└── README.md                  # Project README
```

## Key Components

### 1. **Home Page** (`Home.js`)
The home page displays the list of family members, with options to search and filter the data. It uses Firebase Realtime Database to fetch and display data, and allows members to be shuffled and displayed randomly.

### 2. **Member Profile Page** (`Profile.js`)
Each family member has a profile page where they can update their personal information, including their name, mobile number, and WhatsApp number. The profile can be edited using a form, and updates are reflected in real-time in the Firebase database.

### 3. **Navbar** (`Navbar.js`)
The navigation bar allows users to search for family members by name, mobile number, or email. It also includes a user profile dropdown, where users can sign out.

### 4. **AllMembers Component** (`AllMembers.js`)
Displays a list of family members based on filtered search results.

## Development Scripts

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Dependencies

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **React Icons**: For using customizable icons in the app.
- **React Firebase Hooks**: A set of hooks to interact with Firebase services.
- **React Hook Form**: For handling forms with easy validation and state management.
- **React Toastify**: For showing notifications on actions like profile update.
- **Tailwind CSS**: A utility-first CSS framework for fast UI development.
- **DaisyUI**: A plugin for Tailwind CSS that adds beautiful UI components.

### Backend
- **Firebase**: Firebase Realtime Database and Authentication services.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

**Developed by**: Monjel Morshed Sabbir
