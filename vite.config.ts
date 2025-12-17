import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - nodemailer runs only in the Node (dev server) environment
import nodemailer from "nodemailer";

type BookingPayload = {
  fullName: string;
  email: string;
  phone?: string;
  services: string[];
  pricingTier: string;
  preferredContact: "phone" | "email";
  timeframe: string;
  message?: string;
};

function buildBookingEmailHtml(data: BookingPayload, logoUrl: string) {
  const { fullName, email, phone, services, pricingTier, preferredContact, timeframe, message } =
    data;

  const servicesList =
    Array.isArray(services) && services.length
      ? services.map((s) => `<li>${s}</li>`).join("")
      : "<li>No services selected</li>";

  const safeMessage =
    message && message.trim().length
      ? message.replace(/\n/g, "<br />")
      : "No additional message provided.";

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>New Booking Request</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(15,23,42,0.12);">
              <tr>
                <td style="padding:24px 24px 16px 24px; background:linear-gradient(135deg,#020617,#0f172a);">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="left">
                        <img src="${logoUrl}" alt="Windhoek CV Writers" style="height:52px; display:block;" />
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:16px;">
                        <h1 style="margin:0; font-size:22px; line-height:1.3; color:#e5e7eb; font-weight:600;">
                          New Booking Request
                        </h1>
                        <p style="margin:8px 0 0 0; font-size:14px; color:#9ca3af;">
                          A new client has submitted a booking form on your website.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#111827;">
                    <tr>
                      <td style="padding-bottom:16px;">
                        <h2 style="margin:0 0 8px 0; font-size:18px; font-weight:600; color:#111827;">
                          Client Details
                        </h2>
                        <table cellpadding="0" cellspacing="0" style="width:100%; font-size:14px; color:#111827;">
                          <tr>
                            <td style="padding:4px 0; width:160px; color:#6b7280;">Full name</td>
                            <td style="padding:4px 0; font-weight:500;">${fullName}</td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0; width:160px; color:#6b7280;">Email</td>
                            <td style="padding:4px 0;">
                              <a href="mailto:${email}" style="color:#0ea5e9; text-decoration:none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0; width:160px; color:#6b7280;">Phone / WhatsApp</td>
                            <td style="padding:4px 0;">${phone || "Not provided"}</td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0; width:160px; color:#6b7280;">Preferred contact</td>
                            <td style="padding:4px 0; text-transform:capitalize;">${preferredContact}</td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0; width:160px; color:#6b7280;">Timeframe</td>
                            <td style="padding:4px 0;">${timeframe}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:16px 0;">
                        <h2 style="margin:0 0 8px 0; font-size:18px; font-weight:600; color:#111827;">
                          Requested Services
                        </h2>
                        <ul style="margin:0; padding-left:18px; color:#111827;">
                          ${servicesList}
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:16px 0;">
                        <h2 style="margin:0 0 8px 0; font-size:18px; font-weight:600; color:#111827;">
                          Selected CV Package
                        </h2>
                        <p style="margin:0; padding:10px 12px; border-radius:8px; background-color:#f1f5f9; border:1px solid #e5e7eb;">
                          ${pricingTier}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:16px 0 8px 0;">
                        <h2 style="margin:0 0 8px 0; font-size:18px; font-weight:600; color:#111827;">
                          Additional Information
                        </h2>
                        <p style="margin:0; padding:10px 12px; border-radius:8px; background-color:#f9fafb; border:1px solid #e5e7eb; line-height:1.6;">
                          ${safeMessage}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 24px 20px 24px; background-color:#f9fafb; border-top:1px solid #e5e7eb;">
                  <p style="margin:0; font-size:12px; color:#9ca3af; text-align:center;">
                    This email was generated from the booking form on your Windhoek CV Writers website.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: Number(env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  const bookingEmailPlugin: Plugin = {
    name: "booking-email-endpoint",
    configureServer(server) {
      server.middlewares.use("/api/booking", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", async () => {
          try {
            const data = JSON.parse(body || "{}") as Partial<BookingPayload>;

            if (
              !data.fullName ||
              !data.email ||
              !Array.isArray(data.services) ||
              data.services.length === 0 ||
              !data.pricingTier
            ) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Missing required fields" }));
            }

            const logoUrl =
              env.BOOKING_LOGO_URL ||
              "https://cv.owellgraphics.com/assets/logo-B_KM6Ec3.png";

            const html = buildBookingEmailHtml(data as BookingPayload, logoUrl);

            await transporter.sendMail({
              from: `"Windhoek CV Writers" <${env.SMTP_USER}>`,
              to: "windhoekcvwriters@gmail.com",
              replyTo: data.email,
              subject: `New booking from ${data.fullName} – ${data.pricingTier}`,
              html,
              text: `New booking request from ${data.fullName} (${data.email})`,
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (error) {
            console.error("Error handling booking request:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to send booking email" }));
          }
        });
      });
    },
  };

  return {
  server: {
    host: "::",
    port: 8080,
  },
    plugins: [react(), bookingEmailPlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
