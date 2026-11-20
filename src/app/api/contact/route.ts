import { categories } from "@/content/categories";
import { enquirySchema } from "@/lib/validators";
import { Resend } from "resend";

const hits = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;
const maxHits = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= maxHits) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!to || !from || !apiKey) {
    return Response.json(
      { ok: false, message: "Enquiries are temporarily unavailable." },
      { status: 503 },
    );
  }

  if (limited(clientIp(request))) {
    return Response.json(
      { ok: false, message: "Too many enquiries were sent from this network. Please try again later." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 30000) {
      return Response.json({ ok: false, message: "The enquiry is too long to send." }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, message: "The enquiry could not be read." }, { status: 400 });
  }

  if (payload && typeof payload === "object" && "website" in payload && String(payload.website ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const categoryNames = data.categories
    .map((slug) => categories.find((item) => item.slug === slug)?.name ?? slug)
    .join(", ");

  const text = [
    `Name: ${data.fullName}`,
    `Company / brand: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Type of business: ${data.businessType || "Not provided"}`,
    `Product categories: ${categoryNames || "Not provided"}`,
    `Estimated stage: ${data.stage || "Not provided"}`,
    "",
    "Project brief:",
    data.brief,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Project enquiry — ${data.company}`,
      text,
    });

    if (result.error) {
      return Response.json(
        { ok: false, message: "Your enquiry could not be sent. Please try again." },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { ok: false, message: "Your enquiry could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
