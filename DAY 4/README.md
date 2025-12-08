# Mobile Recharge Application

A junior-developer friendly, mobile-first web application for recharging mobile phones. Built with **HTML5**, **CSS3**, and **Vanilla JavaScript** (no frameworks or build tools).

Designed with accessibility in mind for users with low literacy, featuring:
- Large icons and simple UI
- Voice guidance (Web Speech API)
- Numeric keypad for PIN entry
- Color-coded elements
- High contrast and readable fonts

---

## 🚀 Quick Start

### How to Run

1. **Open in Browser**: Simply open `index.html` in any modern web browser
   - No server required
   - Works offline
   - All data stored in browser's localStorage

2. **Demo Account**:
   - **Mobile**: `9876543210`
   - **PIN**: `1234`
   - **Starting Wallet**: ₹500

### File Structure

```
mobile-recharge-app/
├── index.html          # Single entry point with all pages
├── app.js              # Main application logic
├── style.css           # All styling (responsive design)
├── assets/
│   └── user-photo.jpg  # Profile image placeholder
└── README.md           # This file
```

---

## 📋 Features

### 1. **Authentication**
- **Registration**: Mobile number + 4-digit PIN + Operator selection
- **PIN Login**: Mobile + PIN with numeric keypad
- **OTP Login**: Mock OTP generation (for demo, shows OTP on screen)
- **Session Management**: Automatic logout after 24 hours
- **Frontend Security**: PIN hashed with SHA-256 (client-side demo only)

### 2. **Dashboard**
- User profile header with balance
- Quick action tiles (Recharge, Plans, Wallet, History)
- SIM card details
- Recent recharge history
- Voice guidance toggle

### 3. **Recharge**
- Quick plan selection
- Manual amount entry
- Operator and mobile auto-filled
- Plan details with icons (validity, data, calls)

### 4. **Plans**
- 4 operators: Airtel, Jio, Vi, BSNL
- Multiple plans per operator
- Filter by operator
- Color-coded plan cards
- Plan selection with auto-fill

### 5. **Payment**
- Order summary display
- 3 payment methods (Wallet, UPI, Card - all mocked)
- Insufficient balance detection
- Processing animation
- Success popup with transaction ID

### 6. **Wallet**
- View current balance
- Add money (simulated)
- Transaction history
- All transactions logged

### 7. **History**
- Complete recharge history
- Date and amount tracking
- Success/failure status
- Transaction details

### 8. **Accessibility**
- **Voice Guidance**: Toggle-able speech synthesis
- **Numeric Keypad**: Large buttons for PIN entry
- **Large Buttons**: Minimum 44×44px touch targets
- **High Contrast**: Clear color separation (Purple, Green, Red, Orange)
- **Simple Language**: Minimal text, icon-heavy UI
- **Settings Panel**: Font size adjustment

---

## 🔐 Authentication Details

### Demo User Pre-loaded
```javascript
{
  mobile: '9876543210',
  operator: 'airtel',
  pinHash: 'SHA256_HASH',
  walletBalance: 500,
  history: []
}
```

### How to Register
1. Click **Register** tab
2. Enter 10-digit mobile number
3. Select operator (optional)
4. Create 4-digit PIN
5. Use numeric keypad or keyboard
6. Click **Register**

### How to Login
1. Choose **PIN Login** or **OTP**
2. **PIN Login**: Enter mobile + PIN → Click Login
3. **OTP**: Enter mobile → Get OTP → OTP shown on screen → Enter OTP → Verify

### Security Notes (Important!)
⚠️ **This is a frontend-only demo. NOT SECURE for production.**

- PIN is hashed with SHA-256 on the client side
- All data stored in browser's localStorage
- No backend encryption or server-side verification
- **For production**, use:
  - Backend API with SSL/TLS
  - Server-side PIN hashing with salt
  - Proper authentication tokens (JWT)
  - Rate limiting on login attempts
  - HTTPS only

---

## 💳 Payment & Wallet

### Recharge Process
1. Select a plan or enter custom amount
2. Navigate to Payment
3. Review order summary
4. Choose payment method
5. Click "Confirm Payment"
6. Wait for processing (2-second simulation)
7. See success popup with transaction ID

### Wallet Operations
- **Add Money**: Top up wallet balance (no limit in demo)
- **Deduct on Recharge**: Wallet balance decreases after successful recharge
- **Balance Check**: Prevents payment if insufficient balance
- **Transaction Log**: All transactions logged with date and method

### Available Payment Methods (All Mocked)
- 💳 **Wallet**: Uses stored balance
- 📱 **UPI**: Mock payment (no actual processing)
- 💰 **Card**: Mock payment (no actual processing)

---

## 🎨 Design & UI

### Color Scheme
- **Primary**: Purple (`#7C3AED`) - Main brand color
- **Success**: Green (`#10B981`) - Positive actions, success messages
- **Warning**: Orange (`#F59E0B`) - Important alerts
- **Danger**: Red (`#EF4444`) - Errors, failed transactions
- **Light Gray**: Light backgrounds (`#F9FAFB`)
- **Dark Gray**: Text color (`#1F2937`)

### Typography
- **Font Family**: System fonts (no external dependencies)
- **Base Size**: 16px
- **Headings**: 18px-28px
- **Large Input**: 18px (accessibility)
- **Buttons**: Min 44×44px (touch target size)

### Layouts
- **Flexbox**: Used throughout for responsive design
- **Mobile-First**: Optimized for 375px-600px screens
- **Tablet Support**: Scales nicely to 600px+ screens
- **No CSS Grid**: Kept simple for junior developers

---

## 📱 Operators & Plans

### Operators
- 🟠 **Airtel**: 3 plans (₹199-₹399)
- 🔵 **Jio**: 3 plans (₹149-₹499)
- 🔴 **Vi**: 3 plans (₹179-₹449)
- 🟡 **BSNL**: 3 plans (₹99-₹349)

### Sample Plans
```javascript
{
  id: 'airtel_299',
  operator: 'airtel',
  amount: 299,
  validity: '28 days',
  data: '5GB',
  calls: 'Unlimited',
  rate: 'Popular'
}
```

### How to Add Plans
Edit `app.js`, find the `plans` array, and add:
```javascript
{
  id: 'operator_amount',
  operator: 'airtel',  // airtel, jio, vi, bsnl
  amount: 299,
  validity: '28 days',
  data: '5GB',
  calls: 'Unlimited',
  rate: 'Popular'
}
```

---

## 🔊 Voice Guidance

### How to Use
- Click the **🔊** button in the dashboard header to toggle
- Voice reads key messages:
  - Login welcome
  - Errors (invalid input)
  - Plan selection
  - Payment success/failure
  - Wallet updates

### Supported Languages
- Currently: English
- Uses browser's default voice

### Accessibility Note
Voice guidance helps users who cannot read or prefer audio instructions.

---

## 💾 Data Storage

### localStorage Keys
```javascript
{
  'usersDB': {          // All users database
    '9876543210': {     // Mobile number as key
      mobile: '...',
      operator: '...',
      pinHash: '...',
      walletBalance: 500,
      history: [...]
    }
  },
  'session': {          // Current logged-in user
    mobile: '9876543210',
    token: '...',
    expiry: 1234567890
  },
  'voiceEnabled': true  // Voice guidance setting
}
```

### Data Persistence
- All data persists across page reloads
- Data cleared only when browser cache is cleared
- No cloud sync (localStorage is local only)

### Reset Data
To reset all data, open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

---

## 🎯 Testing Guide

### Test User Registration
1. Mobile: `1234567890`
2. Operator: `jio`
3. PIN: `5678`
4. Register → Should succeed
5. Login with registered credentials

### Test Recharge Flow
1. Login with demo account
2. Click **Recharge**
3. Select a plan or enter amount
4. Click **Proceed to Payment**
5. Choose payment method
6. Click **Confirm Payment**
7. Wait for success popup

### Test Insufficient Balance
1. Login with demo account
2. Click **Wallet**
3. Make recharges until balance is low
4. Try recharge with high amount
5. Should show error: "Insufficient balance"

### Test Voice Guidance
1. Login
2. Click voice icon (🔊)
3. Perform actions
4. Listen for voice messages

### Test OTP Login
1. Click **Register** tab → Switch to **OTP**
2. Enter registered mobile
3. Click **Get OTP**
4. OTP appears on screen (e.g., `123456`)
5. Enter OTP and verify
6. Should login successfully

---

## 🔧 Customization

### Change User Profile Image
1. Replace `assets/user-photo.jpg` with your image
2. Image should be square (1:1 ratio)
3. Recommended size: 200×200px or larger

### Change Color Theme
Edit `style.css` and update CSS variables:
```css
:root {
    --color-primary: #7C3AED;   /* Change this */
    --color-secondary: #6366F1;
    --color-success: #10B981;
    --color-warning: #F59E0B;
    --color-danger: #EF4444;
}
```

### Add New Operators
1. Edit `app.js` - `operators` object
2. Add new operator:
```javascript
instagram: { 
  name: 'Instacell', 
  color: '#FF1493', 
  icon: '🟣' 
}
```
3. Add plans with this operator

### Modify Demo User
Edit `app.js` initialization:
```javascript
usersDB['9876543210'] = {
    mobile: '9876543210',
    operator: 'airtel',      // Change this
    pinHash: 'HASH_HERE',
    walletBalance: 500,      // Change this
    history: []
};
```

---

## 📝 Code Quality

### Code Style (Junior Developer Friendly)
- ✅ Clear variable names: `user`, `usersDB`, `currentSession`
- ✅ Commented functions explaining logic
- ✅ No advanced patterns (async/await, promises used minimally)
- ✅ Simple, readable code structure
- ✅ TODO comments for future improvements
- ✅ No minification or transpilation

### TODO Items for Future Improvement
```javascript
// TODO: Replace localStorage with server API (currently frontend only)
// TODO: Implement actual PIN hashing with salt on backend
// TODO: Add rate limiting on login attempts (prevent brute force)
// TODO: Implement payment gateway integration (Razorpay, PayU, etc.)
// TODO: Add SMS/Email notifications for transactions
// TODO: Add support for multiple languages
// TODO: Implement biometric login (fingerprint, face)
// TODO: Add transaction receipt PDF download
```

---

## 🌐 Browser Compatibility

### Supported Browsers
- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ❌ Internet Explorer (not supported)

### Required Features
- localStorage
- Web Crypto API (for PIN hashing)
- Web Speech API (for voice guidance)
- Flexbox layout

---

## 📊 Performance Notes

### Bundle Size
- HTML: ~30KB
- CSS: ~45KB
- JavaScript: ~35KB
- **Total**: ~110KB (uncompressed)
- **No external libraries** - Everything is vanilla code

### Load Time
- Instant (no network requests)
- All processing happens in browser
- No database queries

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **No real payments** - All payments are simulated
2. **No backend** - All data is local to browser
3. **No SMS/Email** - No notifications sent
4. **No real operators** - Plans are mock data
5. **No transaction receipts** - Only shown in popup
6. **No refunds** - Manual operation required

### Browser Limitations
- Voice guidance may not work in all browsers
- localStorage limited to ~5-10MB per site
- No cross-device sync (data only on current device)

---

## 🚀 Deployment

### To Deploy
1. No build step needed
2. Upload all files to web server
3. Access via HTTP/HTTPS
4. Works immediately

### Simple Deployment (Free Options)
- **Netlify**: Drag & drop index.html
- **GitHub Pages**: Push to gh-pages branch
- **Vercel**: Push to GitHub, auto-deploy
- **Replit**: Upload files and run

### Server Recommendations (For Production)
```bash
# Using Python (simple HTTP server)
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

---

## 📚 Learning Resources

### Concepts Used
- **HTML5**: Semantic markup, form validation
- **CSS3**: Flexbox, CSS variables, animations
- **JavaScript**: DOM manipulation, localStorage, async/await
- **Web APIs**: Crypto API, Speech Synthesis API
- **UX/UI**: Accessibility, mobile-first design

### To Learn More
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

---

## 💬 Support & Contributing

### If Something Breaks
1. Open browser console (F12 → Console tab)
2. Look for error messages
3. Check localStorage is not full
4. Try clearing browser cache
5. Reload the page

### Making Improvements
1. Code is commented and easy to understand
2. Each function has a clear purpose
3. Search for `TODO` comments for improvement areas
4. Test changes in browser before deploying

---

## 📄 License

This project is provided as-is for educational purposes. Free to use and modify.

---

## 🎓 About

Built as a junior developer learning project. Simple, readable code meant to teach web fundamentals:
- Single-page app routing without frameworks
- Form validation and user input handling
- localStorage for data persistence
- API-less architecture
- Accessibility best practices

---

## 📧 Feedback

Have questions or suggestions? Check the code comments - most common questions are answered there!

**Happy Learning! 🚀**
