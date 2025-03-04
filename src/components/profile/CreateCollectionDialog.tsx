import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(3, 'Koleksiyon adı en az 3 karakter olmalıdır'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').optional(),
  isPrivate: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

interface CreateCollectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateCollectionDialog({ open, onOpenChange, onSuccess }: CreateCollectionDialogProps) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const [preview, setPreview] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      isPrivate: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (!user) return

    try {
      setLoading(true)

      const { error } = await supabase.from('collections').insert({
        name: values.name,
        description: values.description,
        is_private: values.isPrivate,
        user_id: user.id,
        cover_image: coverImage,
      })

      if (error) throw error

      toast({
        title: 'Başarılı',
        description: 'Koleksiyon başarıyla oluşturuldu',
      })

      form.reset()
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating collection:', error)
      toast({
        title: 'Hata',
        description: 'Koleksiyon oluşturulurken bir hata oluştu',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Koleksiyon Oluştur</DialogTitle>
          <DialogDescription>
            Sanat eserlerinizi düzenlemek için yeni bir koleksiyon oluşturun.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Koleksiyon Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Koleksiyonunuza bir isim verin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Koleksiyonunuz hakkında kısa bir açıklama yazın"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>En fazla 500 karakter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Gizli Koleksiyon</FormLabel>
                    <FormDescription>
                      Koleksiyonu sadece siz görebilirsiniz
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kapak Görseli</FormLabel>
                  <FormControl>
                    <Input 
                      id="cover" 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  {preview && (
                    <div className="mt-2">
                      <img 
                        src={preview} 
                        alt="Önizleme" 
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                İptal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Oluşturuluyor...' : 'Oluştur'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCollectionDialog
