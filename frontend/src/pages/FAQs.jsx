// import { useEffect, useState } from 'react';
// import { cmsAPI } from '../utils/api';

// const FAQs = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [openIndex, setOpenIndex] = useState(null);

//   useEffect(() => {
//     const fetchFAQs = async () => {
//       try {
//         const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
//         const response = await cmsAPI.getFAQs(params);
//         setFaqs(response.data.faqs || []);
//       } catch (error) {
//         console.error('Error fetching FAQs:', error);
//       }
//     };
//     fetchFAQs();
//   }, [selectedCategory]);

//   const categories = ['all', 'general', 'booking', 'pricing', 'services', 'venue'];

//   return (
//     <div className="section-padding">
//       <div className="container-custom max-w-4xl">
//         <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                 selectedCategory === cat
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div key={faq._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <button
//                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                 className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
//               >
//                 <span className="font-semibold text-lg">{faq.question}</span>
//                 <svg
//                   className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               {openIndex === index && (
//                 <div className="px-6 py-4 border-t bg-gray-50">
//                   <p className="text-gray-700">{faq.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {faqs.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No FAQs available in this category.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FAQs;


import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';
import { ChevronDown } from 'lucide-react';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const response = await cmsAPI.getFAQs(params);
        setFaqs(response.data.faqs || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, [selectedCategory]);

  const categories = ['all', 'general', 'booking', 'pricing', 'services', 'venue'];

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Inquiries</span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">Frequently Asked Questions</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-transparent text-stone-500 border-stone-200 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="bg-white border border-stone-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center group"
              >
                <span className={`font-serif text-lg text-stone-900 transition-colors ${openIndex === index ? 'text-gold-600' : 'group-hover:text-gold-600'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-gold-500' : ''}`} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-8 pb-8 pt-2">
                  <p className="text-stone-500 font-light leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-400 font-serif italic">No FAQs available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;