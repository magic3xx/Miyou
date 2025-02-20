export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://miyou-smoky.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle Preflight (OPTIONS) Request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Your API Logic Here
  res.status(200).json({ message: "CORS issue fixed!" });
}
