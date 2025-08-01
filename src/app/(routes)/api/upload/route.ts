// src/app/(routes)/api/upload/route.ts

import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/config";
import { Readable } from "stream"; // Import the Readable class

// --- CRITICAL FIX: Convert the Web Stream to a Node.js Readable Stream ---
// The Pinata SDK is expecting a Node.js stream with an 'on' method.
// Convert the web ReadableStream to an async iterable for Node.js compatibility.
async function* streamToAsyncIterable(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const readableNodeStream = Readable.from(
      streamToAsyncIterable(file.stream())
    );

    // Use pinFileToIPFS with the now-compatible stream
    const uploadData = await pinata.pinFileToIPFS(readableNodeStream, {
      pinataMetadata: { name: file.name },
      pinataOptions: {
        cidVersion: 0,
      },
    });

    if (!uploadData || !uploadData.IpfsHash) {
      throw new Error("Pinata upload failed with no CID");
    }

    const fileUrl = `https://gateway.pinata.cloud/ipfs/${uploadData.IpfsHash}`;

    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.error("Error during Pinata upload:", e);
    // You can also return a more specific error message from the caught error object
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
