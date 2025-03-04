import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutContainer = 'py-16 bg-background';
const AboutContent = 'text-center mb-12';
const AboutHeader = '';
const AboutTitle = 'text-3xl font-bold mb-4';
const AboutDescription = 'text-muted-foreground max-w-2xl mx-auto';
const FeaturesGrid = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
const FeatureCard = 'p-6';
const FeatureIcon = 'w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4';
const FeatureTitle = 'text-lg font-semibold mb-2';
const FeatureDescription = 'text-muted-foreground';
const TeamSection = 'text-center mt-12';
const TeamGrid = '';
const TeamMemberCard = '';
const TeamMemberImage = '';
const TeamMemberName = '';
const TeamMemberRole = '';

const features = [
  {
    icon: '🎨',
    title: 'AI Destekli Üretim',
    description: 'En son yapay zeka teknolojileri ile sanat eserleri oluşturun.',
  },
  {
    icon: '🌐',
    title: 'Global Erişim',
    description: 'Dünyanın her yerinden sanatçılar ve sanatseverlerle buluşun.',
  },
  {
    icon: '🔒',
    title: 'Güvenli Platform',
    description: 'Blockchain tabanlı güvenlik ile eserlerinizi koruyun.',
  },
  {
    icon: '💡',
    title: 'Yaratıcı Topluluk',
    description: 'İlham verici sanatçılarla etkileşime geçin ve deneyim paylaşın.',
  },
  {
    icon: '📱',
    title: 'Modern Arayüz',
    description: 'Kullanıcı dostu ve responsive tasarım ile her cihazda mükemmel deneyim.',
  },
  {
    icon: '🚀',
    title: 'Sürekli Gelişim',
    description: 'Düzenli güncellemeler ve yeni özellikler ile her zaman güncel kalın.',
  },
];

const teamMembers = [
  {
    name: 'Ali Yılmaz',
    role: 'Kurucu & CEO',
    image: '/team/ali.jpg',
  },
  {
    name: 'Ayşe Demir',
    role: 'Sanat Direktörü',
    image: '/team/ayse.jpg',
  },
  {
    name: 'Mehmet Kaya',
    role: 'Baş Geliştirici',
    image: '/team/mehmet.jpg',
  },
  {
    name: 'Zeynep Öz',
    role: 'AI Uzmanı',
    image: '/team/zeynep.jpg',
  },
];

export default function About() {
  return (
    <section className={AboutContainer}>
      <Container>
        <div className={AboutContent}>
          <motion.h2 
            className={AboutTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hakkımızda
          </motion.h2>
          <motion.p
            className={AboutDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sanat Galerisi, yapay zeka ve sanatı bir araya getirerek yeni nesil bir sanat deneyimi sunuyor. 
            Amacımız, sanatçıları ve sanatseverleri modern teknolojilerle buluşturarak yaratıcılığın 
            sınırlarını genişletmek.
          </motion.p>
        </div>

        <div className={FeaturesGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={FeatureCard}>
                <div className={FeatureIcon}>{feature.icon}</div>
                <h3 className={FeatureTitle}>{feature.title}</h3>
                <p className={FeatureDescription}>{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className={TeamSection}>
          <motion.h2 
            className={AboutTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ekibimiz
          </motion.h2>
          <motion.p
            className={AboutDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tutkulu ve deneyimli ekibimizle size en iyi deneyimi sunmak için çalışıyoruz.
          </motion.p>

          <div className={TeamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={TeamMemberImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <h4 className={TeamMemberName}>{member.name}</h4>
                <p className={TeamMemberRole}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
