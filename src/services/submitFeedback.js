const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

export async function submitFeedback(payload) {
  if (!WEBHOOK_URL) {
    throw new Error("Webhook URL is not configured. Check your .env file.");
  }

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // The response had no JSON body. That's fine, we fall back to the status code.
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (status ${response.status}).`);
  }

  return data;
}