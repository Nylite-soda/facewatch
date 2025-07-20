# FaceWatch: Real-Time Face Tracking & Video Recording

FaceWatch is a web application that uses your browser to perform live face detection from your webcam feed. You can also record the stream, including the face detection overlays, and save it directly to your browser's local storage.

![FaceWatch Screenshot](https://i.imgur.com/5v2hS6W.png)

## ✨ Key Features

- **Live Face Detection**: Uses `face-api.js` to draw bounding boxes around faces in real-time.
- **Video Recording**: Record the canvas stream with face detections and save it locally.
- **Local Playback**: Instantly watch, replay, and delete your recordings.
- **Responsive Design**: A clean, modern UI that works on both desktop and mobile.
- **Light & Dark Modes**: Toggle between light and dark themes for your comfort.
- **User-Controlled Permissions**: The app requests camera access on load and provides a manual reconnect option if permission is denied.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Mantine](https://mantine.dev/)
- **Face Detection**: [face-api.js](https://github.com/justadudewhohacks/face-api.js/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via PostCSS)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or newer) and a package manager like `pnpm`, `npm`, or `yarn` installed.

This project uses `pnpm`. You can install it via:

```bash
npm install -g pnpm
```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Nylite-soda/facewatch.git
    cd facewatch
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Application

To run the application in development mode:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page will auto-update as you edit the code.

## 📜 Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in development mode with Turbopack.
- `pnpm build`: Builds the app for production.
- `pnpm start`: Starts a production server.
- `pnpm lint`: Runs the Next.js linter to check for code quality issues.

## 📂 Project Structure

The project is organized as follows:

```
/
├── app/                # Main application pages and layout
├���─ components/         # Reusable React components
├── hooks/              # Custom React hooks for managing logic
├── lib/                # Utility functions and libraries
└── public/             # Static assets, including face-api.js models
```
