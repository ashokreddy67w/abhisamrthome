import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend/WhatsApp
    const msg = `Hi ABHEE! I'm ${form.name} from ${form.phone}. I'm interested in ${form.service}. ${form.message}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-container py-16 sm:py-20 lg:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-400 text-sm sm:text-base font-medium mb-3"
          >
            GET IN TOUCH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Start Your Smart Home Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Book a free consultation. Our experts will visit your home and design the perfect smart system for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Info Cards */}
            {[
              { icon: '📞', title: 'Call Us', content: '+91  92486 83744', href: 'tel:+919248683744' },
              { icon: '💬', title: 'WhatsApp', content: '+91  92486 83744', href: 'https://wa.me/919248683744' },
              { icon: '✉️', title: 'Email', content: 'info@abheesmarthome.com', href: 'mailto:info@abheesmarthome.com' },
              { icon: '📍', title: 'Location', content: 'Lakshmipuram , Guntur, Andhra Pradesh – 522 001', href: '#' },
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 sm:p-5 bg-gray-800/50 border border-white/10 hover:border-gold-500/30 rounded-xl transition-colors block"
              >
                <span className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-gold-400 font-medium text-xs sm:text-sm mb-0.5">{item.title}</div>
                  <div className="text-white text-sm sm:text-base">{item.content}</div>
                </div>
              </motion.a>
            ))}

            {/* Map Embed */}
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
              <iframe
                title="ABHEE Smart Home Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60998.55!2d80.36!3d16.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f9bd0e2b1b21%3A0x0!2sGuntur%2C+Andhra+Pradesh!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0 filter grayscale"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-6">Book Free Consultation</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <span className="text-5xl block mb-4">✅</span>
                  <h4 className="text-white font-semibold text-lg mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-sm">We'll contact you within 2 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Rajesh Kumar"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91  92486 83744"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Service Required</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-gray-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option>Home Automation</option>
                      <option>CCTV Systems</option>
                      <option>Home Theater</option>
                      <option>Smart Lighting</option>
                      <option>Smart Security</option>
                      <option>Audio Solutions</option>
                      <option>Projectors</option>
                      <option>Solar Fencing</option>
                      <option>Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Message</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project or requirements..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-700 text-gray-900 px-6 py-4 rounded-xl text-sm sm:text-base font-bold hover:opacity-90 transition-opacity"
                  >
                    📅 Book Free Consultation
                  </button>

                  <p className="text-gray-500 text-xs text-center">
                    We'll contact you within 2 hours. Your information is 100% secure.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
