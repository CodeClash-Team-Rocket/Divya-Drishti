"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Play, ArrowRight, Heart, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold"
          >
            AI Accessibility
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-6"
          >
            <Link
              href="#models"
              className="hover:text-blue-400 transition-colors"
            >
              Models
            </Link>
            <Link
              href="#impact"
              className="hover:text-blue-400 transition-colors"
            >
              Impact
            </Link>
            <Link
              href="#contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              AI for Everyone
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              Empowering disabled individuals through cutting-edge machine
              learning models that break barriers and create inclusive digital
              experiences.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Explore Models <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3"
              >
                View on GitHub <Github className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="flex justify-center mb-2">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-blue-400">2</div>
                <div className="text-gray-400">AI Models</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-blue-400">1000+</div>
                <div className="text-gray-400">Lives Impacted</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="flex justify-center mb-2">
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-blue-400">95%</div>
                <div className="text-gray-400">Accuracy Rate</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Model 1 Section */}
      <section id="models" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-400">
                Sign Language Recognition
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Our advanced computer vision model recognizes American Sign
                Language (ASL) gestures in real-time, enabling seamless
                communication between deaf and hearing individuals. Built with
                state-of-the-art deep learning techniques for 99% accuracy.
              </p>
              <div className="flex gap-4 mb-8">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                  Computer Vision
                </span>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                  Real-time
                </span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  TensorFlow
                </span>
              </div>
            </div>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  ASL Recognition Demo
                </h3>
                <p className="text-gray-400">
                  Real-time sign language detection and translation
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Model 2 Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <Card className="bg-gray-800 border-gray-700 lg:order-1">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Voice Synthesis Demo
                </h3>
                <p className="text-gray-400">
                  AI-powered speech generation for communication
                </p>
              </CardContent>
            </Card>
            <div className="lg:order-2">
              <h2 className="text-4xl font-bold mb-6 text-purple-400">
                Voice Synthesis for Speech Impaired
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                An innovative text-to-speech model that generates
                natural-sounding voices for individuals with speech impairments.
                Features personalized voice cloning and emotion-aware synthesis
                to maintain individual expression and personality.
              </p>
              <div className="flex gap-4 mb-8">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Play className="mr-2 h-4 w-4" />
                  Listen Demo
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  NLP
                </span>
                <span className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm">
                  Voice Cloning
                </span>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                  PyTorch
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Making a Real Impact
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Our AI models are actively being used by organizations and
              individuals worldwide, breaking down communication barriers and
              creating more inclusive environments.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    50+
                  </div>
                  <div className="text-gray-300">Educational Institutions</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    25+
                  </div>
                  <div className="text-gray-300">Healthcare Facilities</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    100+
                  </div>
                  <div className="text-gray-300">Community Centers</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4">AI Accessibility</div>
          <p className="text-gray-400 mb-6">
            Building a more inclusive future through artificial intelligence
          </p>
          <div className="flex justify-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
