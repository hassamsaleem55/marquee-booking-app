// import { useState } from 'react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you'd send this to your backend
//     console.log('Contact form submitted:', formData);
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 5000);
//   };

//   return (
//     <div className="section-padding">
//       <div className="container-custom max-w-4xl">
//         <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
//             <p className="text-gray-600 mb-6">
//               Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//             </p>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold mb-2">Email</h3>
//                 <p className="text-gray-600">info@marquee-booking.com</p>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-2">Phone</h3>
//                 <p className="text-gray-600">+1 (555) 123-4567</p>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-2">Address</h3>
//                 <p className="text-gray-600">123 Event Street<br />City, State 12345</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             {submitted ? (
//               <div className="text-center py-8">
//                 <div className="text-green-500 text-4xl mb-4">✓</div>
//                 <p className="text-lg font-semibold">Thank you for your message!</p>
//                 <p className="text-gray-600">We'll get back to you soon.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Phone</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Subject *</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Message *</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows="5"
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <button type="submit" className="w-full btn-primary">
//                   Send Message
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass = "w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm text-stone-800 rounded-none";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-900 mb-2";

  return (
    <div className="section-padding bg-stone-50">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Connect</span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">Get in Touch</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-serif text-stone-900 mb-6">Concierge Service</h2>
            <p className="text-stone-500 font-light mb-10 leading-relaxed">
              Our team is at your disposal to discuss your upcoming event. Whether you have specific questions or need guidance on our collections, we are here to assist.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center mr-6 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-1">Email</h3>
                  <p className="text-stone-500 font-serif text-lg">concierge@marquee.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center mr-6 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-1">Phone</h3>
                  <p className="text-stone-500 font-serif text-lg">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center mr-6 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-1">Location</h3>
                  <p className="text-stone-500 font-serif text-lg">123 Grand Ave, Beverly Hills, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium p-10">
            {submitted ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-900 text-gold-500 mb-6">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-2">Message Sent</h3>
                <p className="text-stone-500 font-light">We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><label className={labelClass}>Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Subject *</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>Message *</label><textarea name="message" value={formData.message} onChange={handleChange} rows="5" required className={inputClass} /></div>
                <button type="submit" className="w-full btn-primary mt-4">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;