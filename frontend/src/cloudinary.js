const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Uploads a single file to Cloudinary and returns its secure URL.
export const uploadImage = async (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', `products/${userId}`);

  const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Image upload failed');

  const data = await res.json();
  return data.secure_url;
};

// Uploads multiple files in parallel and returns an array of secure URLs.
export const uploadImages = (files, userId) =>
  Promise.all(files.map((file) => uploadImage(file, userId)));
