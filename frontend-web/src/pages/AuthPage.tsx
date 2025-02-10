import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Send, Bot } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState <{ userName: string, password: string }>({
        userName: "",
        password: "",
    });
    const [errors, setErrors] = useState<{ userName?: string; password?: string }>({});
    const [messages, setMessages] = useState([
        { type: 'bot', content: 'Hello! 👋 I can help you with login and account creation. What do you need help with?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const validateForm = () => {
        const newErrors : Record<string, string> = {};
        if (!formData.userName) {
            newErrors.userName = "Username is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
        }
    };
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if ((errors as Record<string, string>)[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    const getBotResponse = (userMessage: string) => {
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('password')) {
            return "To reset your password, click the 'Forgot Password' link below the login form. Make sure your new password is at least 8 characters long!";
        } else if (lowerMessage.includes('account') || lowerMessage.includes('sign up')) {
            return "To create a new account, click the 'Sign Up' button at the top of the form. You'll need to choose a username and a secure password.";
        } else if (lowerMessage.includes('help') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            return "I can help you with:\n- Password reset\n- Account creation\n- Login problems\nWhat would you like to know more about?";
        }
        return "I'm not sure about that. Try asking about password reset, account creation, or type 'help' for more options.";
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: inputMessage.trim() }]);

        // Simulate bot response with typing delay
        setTimeout(() => {
            const botResponse = getBotResponse(inputMessage);
            setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
        }, 1000);

        setInputMessage('');
    };

    const handleKeyPress = (e : React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="flex w-full max-w-6xl mx-4">
                {/* Login Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-1/2 bg-gray-800 rounded-l-xl p-8"
                >
                    <div className="flex mb-8 rounded-lg p-1 bg-gray-700">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-md transition-colors ${
                                isLogin ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-md transition-colors ${
                                !isLogin ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Username</label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="Enter your username"
                            />
                            {errors.userName && (
                                <p className="text-red-500 text-sm">{errors.userName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white pr-10"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            {isLogin ? "Login" : "Sign Up"}
                        </button>
                    </form>
                </motion.div>

                {/* Chatbot */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex w-1/2 bg-gray-800 rounded-r-xl border-l border-gray-700"
                >
                    <div className="flex flex-col w-full">
                        {/* Chat Header */}
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center space-x-3">
                                <Bot className="w-8 h-8 text-purple-400" />
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Support Bot</h2>
                                    <p className="text-sm text-gray-400">Ask me anything about login</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            <AnimatePresence>
                               <div className='h-[200px] overflow-y-auto'>
                               {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg ${
                                                message.type === 'user'
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-gray-700 text-gray-200'
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </motion.div>
                                ))}
                               </div>
                            </AnimatePresence>
                        </div>

                        {/* Chat Input */}
                        <div className="p-6 border-t border-gray-700">
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;