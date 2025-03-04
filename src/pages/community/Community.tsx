import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Calendar, Heart, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const POSTS = [
  {
    id: 1,
    author: {
      name: "Ayşe Yılmaz",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "@ayseyilmaz"
    },
    content: "Yeni tamamladığım yağlı boya çalışmam. Düşüncelerinizi paylaşırsanız sevinirim!",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=2070",
    likes: 45,
    comments: 12,
    shares: 5,
    time: "2 saat önce"
  },
  {
    id: 2,
    author: {
      name: "Mehmet Demir",
      avatar: "https://i.pravatar.cc/150?img=2",
      username: "@mehmetdemir"
    },
    content: "Bu hafta sonu düzenleyeceğim dijital sanat workshop'una hepinizi bekliyorum!",
    likes: 32,
    comments: 8,
    shares: 15,
    time: "5 saat önce"
  }
];

const EVENTS = [
  {
    id: 1,
    title: "Dijital Sanat Festivali",
    date: "1 Mart 2024",
    location: "Sanat Merkezi, İstanbul",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=2070",
    attendees: 120
  },
  {
    id: 2,
    title: "Portre Çizim Workshop'u",
    date: "15 Mart 2024",
    location: "Online",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2070",
    attendees: 45
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1515169273894-7e876dcf13da?auto=format&fit=crop&q=80&w=2070")',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px] py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Sanat Topluluğu</h1>
              <p className="text-white/90">
                Diğer sanatçılarla etkileşime geçin, ilham alın ve paylaşın
              </p>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
                <TabsTrigger value="feed">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Akış
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="w-4 h-4 mr-2" />
                  Etkinlikler
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {/* Create Post */}
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white/70 justify-start hover:bg-white/10"
                      >
                        Bir şeyler paylaşın...
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {POSTS.map(post => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>
                              {post.author.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{post.author.name}</CardTitle>
                            <CardDescription className="text-white/70">
                              {post.author.username} · {post.time}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{post.content}</p>
                        {post.image && (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img 
                              src={post.image} 
                              alt="Post" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex gap-6">
                        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                          <Share2 className="w-4 h-4 mr-2" />
                          {post.shares}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                {EVENTS.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm overflow-hidden">
                      <div className="relative aspect-[2/1]">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {event.date} · {event.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-white/70">
                          <Users className="w-4 h-4" />
                          {event.attendees} katılımcı
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-white/20 hover:bg-white/30">
                          Katıl
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
