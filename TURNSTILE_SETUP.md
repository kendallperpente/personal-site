# Environment Configuration Guide

## Cloudflare Turnstile Setup

To enable Turnstile (CAPTCHA) on your contact form, you need to set up environment variables.

### 1. Get Turnstile Keys from Cloudflare

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Turnstile** section
3. Create a new site key for your domain
4. Copy the **Site Key** and **Secret Key**

### 2. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Turnstile Configuration
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key-here
TURNSTILE_SECRET_KEY=your-secret-key-here

# Database Configuration (already configured in wrangler.toml)
# DB binding is automatically available in Cloudflare Workers
```

### 3. Development vs Production

#### Development Mode:
- Turnstile verification is bypassed for easier testing
- Mock database logging is used
- Use test site key: `1x00000000000000000000AA` (always passes)

#### Production Mode:
- Full Turnstile verification is required
- Real Cloudflare D1 database is used
- Use your actual site key from Cloudflare Dashboard

### 4. Testing Turnstile

For testing, you can use Cloudflare's test keys:

```bash
# Test Site Key (always passes)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# Test Secret Key (always passes)  
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### 5. Wrangler Environment Variables

For production deployment, add the secret to wrangler:

```bash
# Add Turnstile secret to Wrangler (production)
npx wrangler secret put TURNSTILE_SECRET_KEY

# Or add to wrangler.toml for local development
[vars]
TURNSTILE_SECRET_KEY = "your-secret-key-here"
```

### 6. Security Considerations

- Never commit real secret keys to version control
- Use different keys for development/staging/production
- Keep secret keys secure and rotate them periodically
- Test your contact form thoroughly before deployment

### 7. Troubleshooting

#### Common Issues:

1. **"Security verification is required"**
   - Check that NEXT_PUBLIC_TURNSTILE_SITE_KEY is set
   - Ensure the site key matches your domain

2. **"Security verification failed"**
   - Verify TURNSTILE_SECRET_KEY is correct
   - Check that the keys match (site key with secret key)
   - Ensure your domain is authorized for the site key

3. **Turnstile widget doesn't load**
   - Check browser console for JavaScript errors
   - Verify internet connection (Turnstile loads from Cloudflare CDN)
   - Check that the site key is valid

#### Debug Steps:

1. Check environment variables are loaded:
   ```javascript
   console.log('Site Key:', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
   ```

2. Test with Cloudflare's test keys first
3. Check network requests in browser dev tools
4. Review Cloudflare Dashboard for Turnstile statistics

### 8. Advanced Configuration

#### Custom Turnstile Options:

```typescript
// In ContactForm.tsx, you can customize:
<Turnstile
  siteKey={TURNSTILE_SITE_KEY}
  theme="auto"        // light, dark, auto
  size="normal"       // normal, compact
  onVerify={handleTurnstileVerify}
  onError={handleTurnstileError}
  onExpire={handleTurnstileExpire}
/>
```

#### Rate Limiting:

Consider adding rate limiting to prevent abuse:

```typescript
// Add to your server action
const rateLimitKey = `contact_form_${clientIP}`;
// Implement rate limiting logic
```