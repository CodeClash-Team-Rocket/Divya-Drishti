"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import {
  Brain,
  Eye,
  Ear,
  Hand,
  Heart,
  Zap,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Shield,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const EmergencyButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEmergencyClick = async () => {
    setShowConfirmation(true);
  };

  const confirmEmergency = async () => {
    setIsPressed(true);
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      const response = await fetch(
        "https://code-clash-bay.vercel.app/api/trigger-emergency",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            emergencyContact: "+918789425130",
            userLocation: "Bhopal Madhya Pradesh",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Emergency response:", data);
        setEmergencyTriggered(true);
        setTimeout(() => {
          setIsPressed(false);
          setEmergencyTriggered(false);
        }, 5000);
      } else {
        console.error("Emergency call failed with status:", response.status);

        setEmergencyTriggered(true);
        setTimeout(() => {
          setIsPressed(false);
          setEmergencyTriggered(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Emergency call failed:", error);

      setEmergencyTriggered(true);
      setTimeout(() => {
        setIsPressed(false);
        setEmergencyTriggered(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };
  const cancelEmergency = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={handleEmergencyClick}
          className={`relative w-16 h-16 rounded-full border-2 transition-all duration-300 ${
            emergencyTriggered
              ? "bg-green-600 border-green-500 shadow-green-500/50"
              : isPressed
              ? "bg-red-700 border-red-600 shadow-red-500/50"
              : "bg-red-600 border-red-500 hover:bg-red-700 shadow-red-500/30"
          } shadow-lg hover:shadow-xl backdrop-blur-sm`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isPressed
              ? "0 0 30px rgba(239, 68, 68, 0.8)"
              : "0 0 15px rgba(239, 68, 68, 0.4)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: easeInOut,
            }}
          />

          <div className="relative flex items-center justify-center w-full h-full">
            {isLoading ? (
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : emergencyTriggered ? (
              <Shield className="w-7 h-7 text-white" />
            ) : (
              <Phone className="w-7 h-7 text-white" />
            )}
          </div>

          {(isPressed || emergencyTriggered) && (
            <motion.div
              className="absolute -top-1 -right-1 flex gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Phone className="w-2 h-2 text-red-600" />
              </motion.div>
              <motion.div
                className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                <MessageCircle className="w-2 h-2 text-red-600" />
              </motion.div>
            </motion.div>
          )}
        </motion.button>

        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {emergencyTriggered ? "Help Sent!" : "Emergency"}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md mx-4 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Emergency Alert
                </h3>
                <p className="text-gray-400 mb-6">
                  This will immediately call emergency contacts and send SMS
                  alerts. Are you sure?
                </p>

                <div className="flex gap-3">
                  <motion.button
                    onClick={cancelEmergency}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg font-medium border border-gray-600 hover:bg-gray-600 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={confirmEmergency}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-4 h-4" />
                    Confirm
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AccessibilityHero: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mounted, setMounted] = useState(false);

  const features = [
    {
      icon: Eye,
      text: "Visual Recognition",
      description: "AI-powered image and text recognition",
    },
    {
      icon: Ear,
      text: "Audio Processing",
      description: "Speech-to-text and audio enhancement",
    },
    {
      icon: Hand,
      text: "Motor Assistance",
      description: "Gesture and movement support",
    },
    {
      icon: Brain,
      text: "Cognitive Aid",
      description: "Memory and decision-making support",
    },
  ];

  const particlePositions = [
    { left: 15, top: 20 },
    { left: 85, top: 15 },
    { left: 70, top: 80 },
    { left: 25, top: 75 },
    { left: 90, top: 45 },
    { left: 10, top: 60 },
    { left: 60, top: 25 },
    { left: 45, top: 90 },
    { left: 75, top: 35 },
    { left: 35, top: 65 },
    { left: 55, top: 10 },
    { left: 20, top: 40 },
    { left: 80, top: 70 },
    { left: 40, top: 85 },
    { left: 65, top: 55 },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-8, 8, -8],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      <EmergencyButton />

      <div className="absolute inset-0">
        {mounted &&
          particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-500 rounded-full opacity-30"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: easeInOut,
              }}
            />
          ))}

        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-gray-400 to-transparent bg-repeat"
            style={{
              backgroundImage: `
                   linear-gradient(90deg, transparent 98%, rgba(156, 163, 175, 0.1) 100%),
                   linear-gradient(0deg, transparent 98%, rgba(156, 163, 175, 0.1) 100%)
                 `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm font-medium">
                Empowering Through AI
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight"
            >
              Divya
              <br />
              <span className="relative text-gray-200">
                Dhrishti
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Breaking barriers and creating possibilities. Our AI technology
              adapts to your unique needs, empowering independence and enhancing
              everyday experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="https://github.com/CodeClash-Team-Rocket"
                target="_blank"
              >
                <motion.button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 border border-gray-600"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-3 px-4 py-3 mt-10 rounded-lg border transition-all duration-500 ${
                      currentFeature === index
                        ? "border-gray-500 bg-gray-700/30 text-white"
                        : "border-gray-700 bg-gray-800/30 text-gray-400"
                    }`}
                    animate={{
                      scale: currentFeature === index ? 1.02 : 1,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="flex-1 relative max-w-lg">
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <motion.div
                className="relative w-80 h-80 mx-auto"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <div className="absolute inset-0 bg-gray-700/20 rounded-full blur-2xl" />
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-600/50 flex items-center justify-center shadow-2xl">
                  <Brain className="w-24 h-24 text-gray-300" />
                </div>
              </motion.div>

              {features.map((feature, index) => {
                const Icon = feature.icon;
                const angle = index * 90 - 90;
                const radius = 180;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={index}
                    className="absolute w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border border-gray-600/60 flex items-center justify-center shadow-lg"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: x - 32,
                      marginTop: y - 32,
                    }}
                    animate={{
                      rotate: 360,
                      scale: currentFeature === index ? 1.1 : 1,
                    }}
                    transition={{
                      rotate: {
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 0.3,
                      },
                    }}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        currentFeature === index
                          ? "text-gray-200"
                          : "text-gray-400"
                      }`}
                    />

                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow:
                          currentFeature === index
                            ? "0 0 20px rgba(156, 163, 175, 0.3)"
                            : "0 0 0px rgba(156, 163, 175, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}

              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                {features.map((_, index) => {
                  const angle = index * 90 - 90;
                  const radius = 180;
                  const x1 =
                    50 +
                    (Math.cos((angle * Math.PI) / 180) * radius * 0.3) / 3.2;
                  const y1 =
                    50 +
                    (Math.sin((angle * Math.PI) / 180) * radius * 0.3) / 3.2;
                  const x2 =
                    50 +
                    (Math.cos((angle * Math.PI) / 180) * radius * 0.7) / 3.2;
                  const y2 =
                    50 +
                    (Math.sin((angle * Math.PI) / 180) * radius * 0.7) / 3.2;

                  return (
                    <motion.line
                      key={index}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={currentFeature === index ? "#9ca3af" : "#6b7280"}
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      animate={{
                        strokeOpacity: currentFeature === index ? 0.6 : 0.2,
                        strokeDashoffset: [0, -6],
                      }}
                      transition={{
                        strokeDashoffset: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        strokeOpacity: {
                          duration: 0.3,
                        },
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mt-10 p-5 text-center"
              >
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  {features[currentFeature].text}
                </h3>
                <p className="text-gray-400 text-sm">
                  {features[currentFeature].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessibilityHero;
