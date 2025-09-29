# Turnstile CAPTCHA Setup Guide

## ✅ ALREADY IMPLEMENTED! 

Your contact form already has Cloudflare Turnstile CAPTCHA fully integrated! You just need to configure your real managed mode keys.

## What's Already Working:

- ✅ **Turnstile component** - Custom React component with TypeScript
- ✅ **Frontend integration** - CAPTCHA widget in contact form
- ✅ **Server-side verification** - Backend validates tokens with Cloudflare API
- ✅ **Error handling** - Proper fallbacks and user feedback
- ✅ **Dark theme support** - Matches your site design

## 🔧 Configure Your Real Managed Mode Keys:

Since you've set up Turnstile in managed mode on the dashboard, you need to add your keys:

### 1. Get Your Keys from Cloudflare Turnstile Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Turnstile**
2. Find your managed site configuration
3. Copy both:
   - **Site Key** (starts with `0x...`)
   - **Secret Key** (starts with `0x...`)

### 2. Add Keys to Local Development (.env.local)

Replace the placeholder keys in `.env.local`:

```bash
# Replace these with your actual managed mode keys:
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA... # Your actual site key
TURNSTILE_SECRET_KEY=0x4AAAAAAA...            # Your actual secret key
```

### 3. Add Keys to Cloudflare Pages (Production)

Since you're using Cloudflare Pages, add the keys in the dashboard:

1. **Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)**
2. **Click your "personalsite" project**
3. **Settings** → **Environment Variables**
4. **Add these variables**:
   - Variable: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - Value: `[Your actual site key]`
   - Environment: **Production** ✅
   
   - Variable: `TURNSTILE_SECRET_KEY` 
   - Value: `[Your actual secret key]`
   - Environment: **Production** ✅

### 4. Update Wrangler Config (Optional)

You can also add them to `wrangler.toml`:

```toml
[vars]
NEXT_PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAAA..." # Your site key
TURNSTILE_SECRET_KEY = "0x4AAAAAAA..."           # Your secret key
```

## 🧪 Test Your Turnstile Setup:

1. **Deploy your changes** (the config is already ready!)
2. **Visit your contact form**
3. **You should see**: 
   - ✅ Turnstile CAPTCHA widget (managed mode UI)
   - ✅ Challenge appears when submitting
   - ✅ Form submits successfully after verification
   - ✅ Data saves to database + Discord notification

## 🚨 Important Notes:

- **Site Key**: Goes in frontend (NEXT_PUBLIC_TURNSTILE_SITE_KEY) 
- **Secret Key**: Goes in backend only (TURNSTILE_SECRET_KEY)
- **Managed Mode**: Cloudflare automatically handles difficulty/challenge types
- **Domain Validation**: Make sure your site key is configured for your domain

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