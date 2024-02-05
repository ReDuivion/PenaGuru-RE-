// Your Next.js function file

import { corsHeaders } from "../middleware/cors";

// Your Next.js function definition
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', '*').end();
  }

  try {
    // Your function logic here
    const { name } = req.body;
    const data = {
      message: `Hello ${name}!`,
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
