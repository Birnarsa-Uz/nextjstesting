"use client";
import { useState } from "react";
import FileUpload from "./components/FileUpload";

export default function HomePage() {
  const [uploadedUrl, setUploadedUrl] = useState("");

  return (
    <main>
      <h1>Profil Rasm Yuklash</h1>
      <FileUpload onUpload={(url: any) => setUploadedUrl(url)} />
      {uploadedUrl && (
        <div>
          <p>Yuklangan fayl URL: {uploadedUrl}</p>
          <img src={uploadedUrl} alt="Profil rasm" width={200} />
        </div>
      )}
    </main>
  );
}
