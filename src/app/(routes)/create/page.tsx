"use client";
import { postEntry } from "@/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { CloudUploadIcon, SendIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((url) => {
          setImageUrl(url);
          setIsUploading(false);
        });
      });
    }
  }, [file]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 space-y-6 hover-lift">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-serif">Create New Post</h1>
          <p className="text-muted-foreground">
            Share your moment with the world
          </p>
        </div>

        <form
          action={async (data) => {
            const id = await postEntry(data);
            router.push(`/posts/${id}`);
            router.refresh();
          }}
        >
          <input type="hidden" name="image" value={imageUrl} />

          <div className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium mb-2">Photo</label>
              <div className="relative">
                <div className="min-h-64 border-2 border-dashed border-border rounded-lg relative overflow-hidden bg-muted/50 hover-lift-sm">
                  {imageUrl ? (
                    <div className="relative w-full h-full image-hover">
                      <img
                        src={imageUrl}
                        className="w-full max-h-96 object-contain rounded-lg"
                        alt="Uploaded image"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageUrl("");
                          setFile(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors hover-lift-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <input
                        onChange={(ev) => setFile(ev.target.files?.[0] || null)}
                        className="hidden"
                        type="file"
                        accept="image/*"
                        ref={fileInRef}
                      />
                      <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center mb-4">
                        {isUploading
                          ? "Uploading..."
                          : "Click to upload an image"}
                      </p>
                      <Button
                        disabled={isUploading}
                        onClick={() => fileInRef?.current?.click()}
                        type="button"
                        variant="surface"
                        className="btn btn-secondary hover-lift-sm"
                      >
                        {isUploading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Uploading...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <CloudUploadIcon className="w-4 h-4" />
                            <span>Choose Image</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <TextArea
                name="description"
                className="min-h-24 resize-none"
                placeholder="Write a caption..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              disabled={!imageUrl || isUploading}
              className="btn btn-primary px-8 py-3 hover-lift-sm"
            >
              <SendIcon className="w-4 h-4 mr-2" />
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
