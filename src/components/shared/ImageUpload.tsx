import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  initialImage?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageChange,
  initialImage,
  className = '',
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
          setPreview(reader.result as string);
          onImageChange(file);
        };
        
        reader.readAsDataURL(file);
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-gray-300 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive
              ? 'Resmi buraya bırakın...'
              : 'Resim yüklemek için tıklayın veya sürükleyin'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF, WEBP (maks. 5MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto object-cover"
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
