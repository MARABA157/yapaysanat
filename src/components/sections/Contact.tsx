import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-16 bg-muted/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-3xl font-bold mb-6">İletişime Geçin</h2>
              <p className="text-muted-foreground mb-8">
                Sorularınız için bize ulaşın. En kısa sürede size dönüş yapacağız.
              </p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Ad Soyad
                    </label>
                    <Input id="name" placeholder="Ad Soyad" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-posta
                    </label>
                    <Input id="email" type="email" placeholder="E-posta" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Konu
                  </label>
                  <Input id="subject" placeholder="Konu" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mesaj
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınız..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Gönder
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-6">İletişim Bilgileri</h2>
            
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">E-posta</h3>
                  <p className="text-muted-foreground">info@sanatgalerisi.com</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <p className="text-muted-foreground">+90 (212) 123 45 67</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Adres</h3>
                  <p className="text-muted-foreground">
                    Sanat Sokak No: 1<br />
                    Beyoğlu, İstanbul
                  </p>
                </div>
              </div>
            </Card>

            {/* Harita */}
            <Card className="p-6">
              <div className="aspect-video w-full bg-muted rounded-lg">
                {/* Buraya harita komponenti eklenecek */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Harita
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
