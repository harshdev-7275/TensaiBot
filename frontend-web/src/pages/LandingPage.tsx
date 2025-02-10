"use client"

import { motion } from "framer-motion"
import { Book, Brain, MessageSquare, Sparkles, Trophy, Users } from "lucide-react"
import { useNavigate } from "react-router"

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <>
      <section className="relative px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Learn Smarter with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your personal AI mentor that adapts to your learning style and helps you master any subject through
              interactive conversations.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={()=> navigate("/auth")} className="bg-purple-600 cursor-pointer hover:bg-purple-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                Start Learning
              </button>
              <button className="border border-purple-600 hover:border-purple-500 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose TensaiBot?</h2>
            <p className="text-gray-300">Experience the future of personalized learning</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
                title: "Interactive Learning",
                description: "Engage in natural conversations with our AI to learn any subject effectively",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-purple-400" />,
                title: "Adaptive Learning",
                description: "AI that adapts to your learning style and pace for optimal results",
              },
              {
                icon: <Book className="h-8 w-8 text-purple-400" />,
                title: "Comprehensive Library",
                description: "Access a vast library of subjects and learning materials",
              },
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Community Learning",
                description: "Connect with other learners and share knowledge",
              },
              {
                icon: <Trophy className="h-8 w-8 text-purple-400" />,
                title: "Progress Tracking",
                description: "Monitor your learning progress with detailed analytics",
              },
              {
                icon: <Brain className="h-8 w-8 text-purple-400" />,
                title: "Smart Recommendations",
                description: "Get personalized content recommendations based on your interests",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage

