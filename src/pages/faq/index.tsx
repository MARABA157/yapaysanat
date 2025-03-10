import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Sanat Galerisi'ne nasıl üye olabilirim?",
    answer: "Ana sayfadaki 'Üye Ol' butonuna tıklayarak veya doğrudan kayıt sayfasına giderek üyelik formunu doldurabilirsiniz. E-posta adresinizi doğruladıktan sonra hesabınız aktif hale gelecektir."
  },
  {
    question: "Sanat eserlerini nasıl satın alabilirim?",
    answer: "Beğendiğiniz sanat eserinin detay sayfasında 'Satın Al' butonuna tıklayarak satın alma işlemini başlatabilirsiniz. Ödeme işlemi için kredi kartı veya banka havalesi seçeneklerini kullanabilirsiniz."
  },
  {
    question: "Kendi sanat eserlerimi nasıl yükleyebilirim?",
    answer: "Sanatçı profilinize giriş yaptıktan sonra 'Eser Yükle' butonunu kullanarak eserlerinizi platforma yükleyebilirsiniz. Eserlerinizin başlığı, açıklaması ve fiyatı gibi detayları da ekleyebilirsiniz."
  },
  {
    question: "Ödeme yöntemleri nelerdir?",
    answer: "Platformumuzda kredi kartı, banka havalesi ve dijital cüzdan gibi çeşitli ödeme yöntemlerini kullanabilirsiniz. Tüm ödemeler güvenli bir şekilde işleme alınmaktadır."
  },
  {
    question: "İade ve değişim politikanız nedir?",
    answer: "Dijital sanat eserleri için iade söz konusu değildir. Fiziksel eserler için, teslim tarihinden itibaren 14 gün içinde iade talebinde bulunabilirsiniz. Eser hasarsız ve orijinal ambalajında olmalıdır."
  },
  {
    question: "Sanat eserlerinin kargo süreci nasıl işliyor?",
    answer: "Fiziksel sanat eserleri özel olarak paketlenerek, sigortalı kargo ile gönderilmektedir. Kargo süreci ortalama 3-5 iş günü sürmektedir. Eserinizin konumunu takip numarası ile takip edebilirsiniz."
  },
  {
    question: "Sanatçılarla nasıl iletişime geçebilirim?",
    answer: "Sanatçıların profil sayfalarında bulunan 'İletişim' butonu üzerinden mesaj gönderebilirsiniz. Ayrıca sanat eseri detay sayfalarında da sanatçıya soru sorma seçeneği bulunmaktadır."
  },
  {
    question: "Sanat eserleri için sertifika sunuyor musunuz?",
    answer: "Evet, tüm orijinal sanat eserleri için dijital ve basılı orijinallik sertifikası sağlıyoruz. Bu sertifikalar eserin özgünlüğünü ve sanatçısını belgelemektedir."
  }
];

function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h1>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden"
              initial={false}
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center bg-gray-900 hover:bg-gray-800 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg font-medium text-left">{item.question}</span>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-900/50"
                  >
                    <p className="px-6 py-4 text-gray-300">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
