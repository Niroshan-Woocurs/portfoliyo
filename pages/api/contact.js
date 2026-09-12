export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formspreeKey =
    process.env.FORMSPREE_KEY ||
    process.env.NEXT_PUBLIC_FORMSPREE_KEY ||
    process.env.NEXT_PUBLIC_FORMSPREE_ID ||
    "mwlkaoza";

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await fetch(`https://formspree.io/f/${formspreeKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || "Portfolio Inquiry",
        message,
        _replyto: email,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return res.status(200).json({ success: true, message: "Message sent successfully" });
    } else {
      const errorMsg =
        (data.errors && data.errors.map((e) => e.message).join(", ")) ||
        "Formspree failed to send message.";
      return res.status(response.status || 400).json({ error: errorMsg });
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({
      error: "Failed to connect to contact service. Please try again later.",
    });
  }
}
