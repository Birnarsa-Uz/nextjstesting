"use client";
import { useState } from "react";

export default function FileUpload({ onUpload }: any) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // data.url ichida yuklangan faylning URL-manzili bor
      onUpload(data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Faylni Yuklash</button>
    </div>
  );
}
