"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const Email = () => {
  const [formData, setFormData] = useState({
    contact: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.contact.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:gusti.fatu@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `From: ${formData.contact}\n\nMessage:\n${formData.message}`
      )}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          contact: "",
          subject: "",
          message: "",
        });
        setSubmitStatus('success');
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex items-center justify-center px-6" id="contact">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
          <motion.h2 
            className="text-[#06302b] text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
          >
            Send Message
          </motion.h2>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Contact Field */}
            <motion.div>
              <label 
                htmlFor="contact" 
                className="block text-[#06302b] text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
              >
                Your Email/Contact
              </label>
              <input
                type="email"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/20 border-2 border-[#06302b]/20 rounded-lg 
                           text-[#06302b] placeholder-[#095544]/60
                           focus:outline-none focus:border-[#06302b] focus:bg-white/30
                           transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </motion.div>

            {/* Subject Field */}
            <motion.div>
              <label 
                htmlFor="subject" 
                className="block text-[#06302b] text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/20 border-2 border-[#06302b]/20 rounded-lg 
                           text-[#06302b] placeholder-[#095544]/60
                           focus:outline-none focus:border-[#06302b] focus:bg-white/30
                           transition-all duration-300"
                placeholder="What's this about?"
              />
            </motion.div>

            {/* Message Field */}
            <motion.div>
              <label 
                htmlFor="message" 
                className="block text-[#06302b] text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/20 border-2 border-[#06302b]/20 rounded-lg 
                           text-[#06302b] placeholder-[#095544]/60 resize-none
                           focus:outline-none focus:border-[#06302b] focus:bg-white/30
                           transition-all duration-300"
                placeholder="Tell me about your project, ideas, or just say hello!"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div>
              <button
                type="submit"
                disabled={isSubmitting || !formData.contact.trim() || !formData.subject.trim() || !formData.message.trim()}
                className="w-full py-4 bg-[#06302b] text-white text-xl font-bold uppercase tracking-wide
                           rounded-lg hover:bg-[#095544] transform hover:scale-105
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-[#06302b] font-bold"
                style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
              >
                Message sent! Your email client should open shortly.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-600 font-bold"
                style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
              >
                Please fill in all required fields.
              </motion.div>
            )}
          </motion.form>

          {/* Footer Note */}
          <motion.div className="mt-6 text-center">
            <p className="text-[#095544] text-sm" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
              This form will open your default email client to send the message.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div>
            <h1
              className="text-[#06302b] text-5xl md:text-7xl font-bold uppercase tracking-wide mb-6"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              Get in Touch
            </h1>
            <p className="text-[#095544] text-xl md:text-2xl font-medium" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
              Have a project in mind? Let's talk about it!
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-6">
            <motion.div 
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#06302b] rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#06302b] text-lg font-bold" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  Email
                </h3>
                <p className="text-[#095544] text-base" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  gusti.fatu@gmail.com
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#06302b] rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#06302b] text-lg font-bold" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  Phone
                </h3>
                <p className="text-[#095544] text-base" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  +61 424381718
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#06302b] rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#06302b] text-lg font-bold" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  Location
                </h3>
                <p className="text-[#095544] text-base" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  Available worldwide
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#06302b] rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#06302b] text-lg font-bold" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  Response Time
                </h3>
                <p className="text-[#095544] text-base" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  Within 24 hours
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="bg-transparent backdrop-blur-sm rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-[#06302b] text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
              Ready to Start?
            </h3>
            <p className="text-[#095544] text-lg" style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
              I'm excited to hear about your project and help bring your ideas to life.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};