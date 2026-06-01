import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY || 're_CcmJ8A2Q_76YM1RjQZycWVcuyXyku7R9s'
const TO_EMAIL = process.env.VITE_CONTACT_EMAIL || 'shadabsayyed1932@gmail.com'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function buildEmail(name: string, email: string, phone: string, service: string, message: string): string {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const year = new Date().getFullYear()
  const safeMsg = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>')

  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>',
    '<body bgcolor="#0C0C0C" style="margin:0;padding:0;background-color:#0C0C0C;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0C0C0C" style="background-color:#0C0C0C;">',
    '<tr><td align="center" style="padding:40px 16px;">',
    '<table role="presentation" width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">',

    '<tr><td bgcolor="#B600A8" style="background-color:#B600A8;height:5px;font-size:1px;line-height:1px;">&nbsp;</td></tr>',

    '<tr><td bgcolor="#0C0C0C" style="background-color:#0C0C0C;padding:40px 44px 32px 44px;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>',
    '<td><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>',
    '<td bgcolor="#B600A8" style="background-color:#B600A8;padding:8px 14px;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#ffffff;">S</span></td>',
    '<td style="padding-left:12px;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#6B7B8A;">SHADAB SAYYED</span></td>',
    '</tr></table></td>',
    '<td align="right"><span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#3D4E5A;">' + date + '</span></td>',
    '</tr></table>',
    '<p style="margin:32px 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:#B600A8;">New Enquiry</p>',
    '<h1 style="margin:0 0 20px 0;font-family:Arial,Helvetica,sans-serif;font-size:38px;font-weight:900;text-transform:uppercase;color:#D7E2EA;letter-spacing:-1px;">' + name + '</h1>',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>',
    '<td bgcolor="#B600A8" style="background-color:#B600A8;padding:7px 18px;">',
    '<span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#ffffff;">' + (service || 'General Enquiry') + '</span>',
    '</td></tr></table>',
    '</td></tr>',

    '<tr><td bgcolor="#222222" style="background-color:#222222;height:1px;font-size:1px;line-height:1px;">&nbsp;</td></tr>',

    '<tr><td bgcolor="#0C0C0C" style="background-color:#0C0C0C;padding:32px 44px;">',
    '<p style="margin:0 0 20px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:#3D4E5A;">Contact Details</p>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">',
    '<tr>',
    '<td width="47%" bgcolor="#141414" style="background-color:#141414;padding:20px;vertical-align:top;"><p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3D4E5A;">Name</p><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:900;text-transform:uppercase;color:#D7E2EA;">' + name + '</p></td>',
    '<td width="6%" style="padding:0 8px;">&nbsp;</td>',
    '<td width="47%" bgcolor="#141414" style="background-color:#141414;padding:20px;vertical-align:top;"><p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3D4E5A;">Email</p><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#B600A8;word-break:break-all;">' + email + '</p></td>',
    '</tr>',
    '<tr><td colspan="3" style="height:8px;">&nbsp;</td></tr>',
    '<tr>',
    '<td width="47%" bgcolor="#141414" style="background-color:#141414;padding:20px;vertical-align:top;"><p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3D4E5A;">Phone</p><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:900;color:#D7E2EA;">' + (phone || '&mdash;') + '</p></td>',
    '<td width="6%" style="padding:0 8px;">&nbsp;</td>',
    '<td width="47%" bgcolor="#141414" style="background-color:#141414;padding:20px;vertical-align:top;"><p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3D4E5A;">Service</p><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:900;text-transform:uppercase;color:#D7E2EA;">' + (service || '&mdash;') + '</p></td>',
    '</tr>',
    '</table></td></tr>',

    '<tr><td bgcolor="#222222" style="background-color:#222222;height:1px;font-size:1px;line-height:1px;">&nbsp;</td></tr>',

    '<tr><td bgcolor="#0C0C0C" style="background-color:#0C0C0C;padding:32px 44px;">',
    '<p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:#3D4E5A;">Message</p>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>',
    '<td width="3" bgcolor="#B600A8" style="background-color:#B600A8;width:3px;font-size:1px;">&nbsp;</td>',
    '<td style="padding-left:20px;"><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.8;color:#8A9BAA;font-style:italic;">' + safeMsg + '</p></td>',
    '</tr></table></td></tr>',

    '<tr><td bgcolor="#0C0C0C" style="background-color:#0C0C0C;padding:8px 44px 44px 44px;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>',
    '<td bgcolor="#B600A8" style="background-color:#B600A8;">',
    '<a href="mailto:' + email + '" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#ffffff;text-decoration:none;padding:16px 32px;">Reply to ' + name.split(' ')[0] + '</a>',
    '</td></tr></table></td></tr>',

    '<tr><td bgcolor="#080808" style="background-color:#080808;padding:20px 44px;">',
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2A3540;">Shadab Sayyed &middot; Portfolio &middot; ' + year + '</p>',
    '</td></tr>',

    '<tr><td bgcolor="#B600A8" style="background-color:#B600A8;height:5px;font-size:1px;line-height:1px;">&nbsp;</td></tr>',

    '</table></td></tr></table></body></html>',
  ].join('\n')
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'contact-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }
          res.setHeader('Content-Type', 'application/json')
          try {
            const raw = await readBody(req)
            const body = JSON.parse(raw)
            if (!body.name || !body.email || !body.message) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Name, email and message are required.' }))
              return
            }
            const html = buildEmail(body.name, body.email, body.phone || '', body.service || '', body.message)
            const result = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: 'Shadab Portfolio <onboarding@resend.dev>',
                to: [TO_EMAIL],
                reply_to: body.email,
                subject: `New enquiry — ${body.service || 'General'} from ${body.name}`,
                html,
              }),
            })
            const data = await result.json() as Record<string, unknown>
            if (data.id) {
              res.end(JSON.stringify({ ok: true }))
            } else {
              res.statusCode = 500
              res.end(JSON.stringify({ error: (data.message as string) || JSON.stringify(data) }))
            }
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(err) }))
          }
        })

        server.middlewares.use('/api/health', (_req: IncomingMessage, res: ServerResponse) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
        })
      },
    },
  ],
  server: { port: 5200 },
})
