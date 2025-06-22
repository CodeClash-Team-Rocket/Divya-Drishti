"use client";
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Eye,
  Volume2,
  Hand,
  Brain,
  Users,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

interface ModelInfo {
  id: string;
  title: string;
  description: string;
  features: string[];
  accuracy: string;
  videoPlaceholder: string;
}

const MLModelsShowcase: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const stats: Stat[] = [
    {
      id: "1",
      label: "People Helped",
      value: 150,
      suffix: "+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "2",
      label: "Model Accuracy",
      value: 96,
      suffix: "%",
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: "3",
      label: "Success Rate",
      value: 94,
      suffix: "%",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: "4",
      label: "Awards Won",
      value: 8,
      suffix: "+",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const models: ModelInfo[] = [
    {
      id: "1",
      title: "Visual Recognition AI",
      description:
        "Advanced computer vision model that helps visually impaired individuals navigate their environment by identifying objects, reading text, and describing scenes in real-time.",
      features: [
        "Real-time object detection and classification",
        "Text-to-speech conversion for written content",
        "Scene description with contextual awareness",
        "Navigation assistance with obstacle detection",
      ],
      accuracy: "97.2%",
      videoPlaceholder: "Visual Recognition Demo",
    },
    {
      id: "2",
      title: "Cognitive Support System",
      description:
        "AI-powered cognitive aid that assists individuals with memory and decision-making challenges through personalized reminders, task guidance, and adaptive learning.",
      features: [
        "Personalized memory assistance and reminders",
        "Step-by-step task guidance and breakdown",
        "Adaptive learning based on user patterns",
        "Emergency detection and response system",
      ],
      accuracy: "94.8%",
      videoPlaceholder: "Cognitive Aid Demo",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const CountUpAnimation: React.FC<{ value: number; suffix: string }> = ({
    value,
    suffix,
  }) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
      if (isStatsInView) {
        const duration = 2000;
        const increment = value / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isStatsInView, value]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100">
      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent"
            >
              Empowering Lives Through AI
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Our cutting-edge machine learning models are making a real
              difference in the lives of people with disabilities
            </motion.p>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    isStatsInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  className="text-gray-400 mb-4 flex justify-center"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUpAnimation value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Models Showcase Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Our AI Models in Action
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              See how our advanced machine learning models are breaking barriers
              and creating possibilities
            </motion.p>
          </motion.div>

          <div className="space-y-32">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Video Section */}
                <motion.div
                  variants={itemVariants}
                  className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
                  >
                    <div className="aspect-video bg-gray-700/50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            {index === 0 ? (
                              <Eye className="w-8 h-8 text-gray-400" />
                            ) : (
                              <Brain className="w-8 h-8 text-gray-400" />
                            )}
                          </motion.div>
                        </div>
                        <p className="text-gray-300 font-medium">
                          {model.videoPlaceholder}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Interactive Demo Coming Soon
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-medium">
                          Live Demo
                        </span>
                      </div>
                      <div className="bg-gray-500/20 px-4 py-2 rounded-full">
                        <span className="text-gray-300 font-semibold">
                          Accuracy: {model.accuracy}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Text Section */}
                <motion.div
                  variants={itemVariants}
                  className={`${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold mb-6 text-white"
                      whileHover={{ scale: 1.02 }}
                    >
                      {model.title}
                    </motion.h3>

                    <motion.p
                      className="text-lg text-gray-300 mb-8 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {model.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <h4 className="text-xl font-semibold mb-4 text-gray-300">
                        Key Features:
                      </h4>
                      <motion.ul className="space-y-3">
                        {model.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.8 + featureIndex * 0.1,
                              duration: 0.4,
                            }}
                            className="flex items-start space-x-3 text-gray-300"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 90 }}
                              className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-200 rounded-full mt-2 flex-shrink-0"
                            ></motion.div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="mt-8"
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(156, 163, 175, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-700/20 to-gray-800/20 backdrop-blur-sm border border-gray-500/30 rounded-3xl p-12"
          >
            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to Experience Our AI Solutions?
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8"
            >
              Join our community and discover how AI can enhance independence
              and quality of life
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-400 text-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MLModelsShowcase;
