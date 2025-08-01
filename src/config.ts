// src/config.ts

import PinataClient from "@pinata/sdk";

// It's crucial to check that your PINATA_JWT environment variable is set
const pinataJwt = process.env.PINATA_JWT;

if (!pinataJwt) {
  throw new Error("PINATA_JWT environment variable not set.");
}

const pinata = new PinataClient({ pinataJWTKey: pinataJwt });

export { pinata };
