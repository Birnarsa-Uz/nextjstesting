"use client";
import React, { useState } from "react";

export default function FileUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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
