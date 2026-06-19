import { useState } from "react";
import { uploadImages } from "../cloudinary";
import { useAuth } from "../context/AuthContext";

const ImageUploader = ({ onUploadComplete, maxImages = 3 }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    try {
      setLoading(true);

      const urls = await uploadImages(files, user?._id || "guest");

      setPreviewUrls(urls);

      onUploadComplete(urls);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />

      {loading && <p className="text-blue-700">Uploading images...</p>}

      <div className="grid grid-cols-3 gap-2">
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Preview ${index}`}
            className="w-full h-24 object-cover rounded-lg border"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
