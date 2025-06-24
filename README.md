# Divya Drishti 🌟

> **Empowering Independence Through AI-Powered Accessibility Solutions**

Divya Drishti is an innovative accessibility platform designed to enhance independence and quality of life for people with disabilities. Built for the CodeClash Hackathon, this Next.js application leverages cutting-edge machine learning models and real-time communication to create a comprehensive support system.

## 🎯 Mission

Breaking barriers through technology - Divya Drishti aims to create a more inclusive world where disabilities don't limit possibilities.

## ✨ Key Features

### 🤖 AI-Powered Models
- **Visual Recognition AI**: Advanced computer vision for real-time object detection, text-to-speech conversion, and navigation assistance
- **Cognitive Support System**: Personalized memory assistance, task guidance, and adaptive learning for cognitive challenges

### 🆘 Emergency SOS System
- **Instant Emergency Response**: One-touch SOS activation
- **Automatic Location Sharing**: Sends current GPS coordinates to emergency contacts
- **Voice-Enabled Calls**: AI voice assistant provides location details during emergency calls
- **Multi-Channel Alerts**: Simultaneous SMS and voice call notifications to loved ones

### 🎨 User Experience
- **Accessible Design**: WCAG compliant interface with high contrast and screen reader support
- **Responsive Layout**: Optimized for all devices and assistive technologies
- **Smooth Animations**: Engaging micro-interactions powered by Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, accessible icons

### Backend & APIs
- **Node.js** - Server-side runtime
- **Twilio API** - Voice calls and SMS messaging
- **Geolocation API** - Real-time location tracking

### AI/ML Integration
- **Computer Vision Models** - Object detection and scene analysis
- **Natural Language Processing** - Voice interaction and text processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Twilio account for communication features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/divya-drishti.git
   cd divya-drishti
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Twilio SDK**
   ```bash
   npm install twilio
   ```

4. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
divya-drishti/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
│   ├── ui/                # UI components
│   ├── MLModelsShowcase.tsx
│   └── SOSButton.tsx
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── api/                   # API routes and handlers
```


## 📱 Features Demo

### Visual Recognition AI
- Real-time object detection and classification
- Text-to-speech conversion for written content
- Scene description with contextual awareness
- Navigation assistance with obstacle detection

### Sign Language Detection System

- Real-time sign language recognition and translation
- Text-to-speech conversion for sign language output
- Multi-language sign language support (ASL, BSL, ISL)
- Gesture-based emergency signal detection

### SOS Emergency System
- One-touch emergency activation
- Automatic location detection and sharing
- Voice calls with AI-generated location announcements
- SMS alerts with GPS coordinates

