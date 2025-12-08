// MOBILE RECHARGE APP - DEVELOPER QUICK REFERENCE
// ================================================

// FILE OVERVIEW:
// index.html  - Contains ALL HTML for all pages (login, dashboard, plans, payment, wallet, history)
// app.js      - Contains ALL JavaScript logic (auth, navigation, payments, voice, etc.)
// style.css   - Contains ALL styling (responsive, accessible design)

// ================================================
// KEY CONCEPTS & HOW THINGS WORK
// ================================================

// 1. PAGE ROUTING (No frameworks, pure JS)
// ------------------------------------------
goToPage('dashboardPage');  // Switch to dashboard
goToPage('loginPage');      // Switch to login
// - Hides all pages except target
// - Initializes page data
// - Checks authentication

// 2. AUTHENTICATION FLOW
// ----------------------
registerUser(mobile, pin, operator)
  → Validates input
  → Hashes PIN with crypto.subtle.digest
  → Saves to usersDB in localStorage

loginUser(mobile, pin)
  → Validates input
  → Hashes entered PIN
  → Compares with stored hash
  → Creates session token
  → Saves to localStorage

isAuthenticated()
  → Checks if valid session exists
  → Checks if token not expired
  → Protects routes

logout()
  → Clears session from localStorage
  → Redirects to login

// 3. DATA STORAGE (All in localStorage)
// ------------------------------------
localStorage.getItem('usersDB')      // Database of all users
localStorage.getItem('session')      // Current logged-in user
localStorage.getItem('voiceEnabled') // Settings

// Database structure:
{
  "usersDB": {
    "9876543210": {
      mobile: "9876543210",
      operator: "airtel",
      pinHash: "abc123def456...",
      walletBalance: 500,
      history: [
        { amount: 199, date: "1/1/2024", status: "Success" }
      ]
    }
  },
  "session": {
    mobile: "9876543210",
    token: "TOKEN_xyz123",
    expiry: 1234567890000
  }
}

// 4. VOICE GUIDANCE
// -----------------
speakMessage('Hello')  // Speaks text using Web Speech API
toggleVoice()          // Turn voice on/off
voiceEnabled           // Global flag (true/false)

// 5. PAGE INITIALIZATION FUNCTIONS
// --------------------------------
initializeDashboard()   // Load user data, show balance, history
initializeRechargePage()   // Fill user details, show quick plans
loadPlans()             // Display all plans
initializePaymentPage() // Show order summary
initializeWalletPage()  // Show balance and transactions
initializeHistoryPage() // Show all recharges

// 6. FORM VALIDATION
// ------------------
validateMobile(input)
  → Must be 10 digits
  → Must be numeric only
  → Example: "9876543210" ✓, "98765" ✗

validatePin(pin)
  → Must be 4 digits
  → Must be numeric only
  → Example: "1234" ✓, "12" ✗

// 7. NUMERIC KEYPAD (Accessibility Feature)
// ------------------------------------------
appendDigit('5', 'loginPin')   // Add digit to input
deleteLastDigit('loginPin')    // Remove last digit
clearInput('loginPin')         // Clear entire input

// 8. ERROR HANDLING
// -----------------
showError('elementId', 'Error message')     // Display error
clearErrors(['id1', 'id2'])                 // Clear errors
showMessageBox('Message', 'success/error')  // Show notification

// 9. PAYMENT FLOW
// ---------------
selectPlan(plan)
  → Fill amount field
  → Speak plan details

processPayment()
  → Validate amount
  → Check wallet balance
  → Show processing overlay
  → Simulate 2-second delay
  → Deduct from wallet
  → Save transaction
  → Show success popup

// 10. OPERATORS & PLANS
// --------------------
operators = {
  airtel: { name: 'Airtel', color: '#FF6B35', icon: '🟠' },
  jio: { name: 'Jio', color: '#1F77F2', icon: '🔵' },
  vi: { name: 'Vi', color: '#E60000', icon: '🔴' },
  bsnl: { name: 'BSNL', color: '#F4B860', icon: '🟡' }
}

plans = [
  {
    id: 'airtel_199',
    operator: 'airtel',
    amount: 199,
    validity: '28 days',
    data: '2GB',
    calls: 'Unlimited'
  }
  // ... more plans
]

// ================================================
// COMMON TASKS
// ================================================

// ADD A NEW OPERATOR
const operators = {
  // ... existing
  myop: { name: 'MyOperator', color: '#FF1493', icon: '🟣' }
}

// ADD PLANS FOR OPERATOR
plans.push({
  id: 'myop_299',
  operator: 'myop',
  amount: 299,
  validity: '28 days',
  data: '5GB',
  calls: 'Unlimited'
})

// CREATE DEMO USER
usersDB['9999999999'] = {
  mobile: '9999999999',
  operator: 'airtel',
  pinHash: await hashPin('5678'),
  walletBalance: 1000,
  history: []
}

// CHANGE COLOR THEME
// Edit CSS variables in style.css:
:root {
  --color-primary: #7C3AED;      // Purple - main color
  --color-secondary: #6366F1;    // Indigo
  --color-success: #10B981;      // Green - success
  --color-warning: #F59E0B;      // Orange - warning
  --color-danger: #EF4444;       // Red - error
}

// ENABLE/DISABLE VOICE
voiceEnabled = true;  // Turn on
voiceEnabled = false; // Turn off

// CHECK IF USER LOGGED IN
if (isAuthenticated()) {
  // User is logged in
  const mobile = currentSession.mobile;
}

// GET CURRENT USER DATA
const user = usersDB[currentSession.mobile];
console.log(user.walletBalance);  // ₹500
console.log(user.operator);        // "airtel"

// RESET DATA (For Testing)
localStorage.clear();  // Clears all data
location.reload();     // Refresh page

// ================================================
// CSS CLASSES & STYLING
// ================================================

.page           // Page container (display: none by default)
.page.active    // Shown page
.hidden         // Display none

.btn-primary    // Main action button (purple)
.btn-secondary  // Secondary button (orange)
.btn-back       // Back button
.btn-logout     // Logout button
.btn-voice      // Voice toggle

.large-input    // Large form input (18px, 44px height)
.large-btn      // Large button (18px, 44px height)

.dashboard-tile      // Card with shadow
.dashboard-tile:hover // Lift on hover

.error-message      // Red error text
.message-box        // Notification box
.message-box.success // Green notification
.message-box.error  // Red notification

.history-item       // Transaction item
.summary-item       // Payment summary item

.numeric-keypad     // Large number buttons
.numeric-keypad button // Each button

.popup              // Modal overlay
.popup.hidden       // Hidden modal

// ================================================
// TESTING TIPS
// ================================================

// Open browser console (F12 → Console)

// Test registration:
await registerUser('1234567890', '5678', 'jio')

// Test login:
await loginUser('9876543210', '1234')

// Check users database:
JSON.parse(localStorage.getItem('usersDB'))

// Check current session:
JSON.parse(localStorage.getItem('session'))

// Clear all data:
localStorage.clear()

// Test voice:
speakMessage('Hello user')

// Check current user:
console.log(usersDB[currentSession.mobile])

// ================================================
// DEBUGGING
// ================================================

// Add console logs throughout code:
console.log('User registered:', mobile)
console.log('Navigated to:', pageId)
console.log('Payment processed:', amount)

// Check authentication:
console.log('Is authenticated:', isAuthenticated())

// View all stored data:
console.table(usersDB)
console.table(JSON.parse(localStorage.getItem('session')))

// Test API functions directly:
// Go to console and type:
await loginUser('9876543210', '1234')  // Returns { success: true/false, message/error }

// ================================================
// FUTURE IMPROVEMENTS (TODO)
// ================================================

// Replace localStorage with server API
// Implement actual payment gateway (Razorpay, PayU)
// Add SMS/Email notifications
// Implement proper authentication (JWT tokens)
// Add support for multiple languages
// Add biometric login (fingerprint)
// Generate PDF receipts
// Add transaction search/filter
// Implement operator switching mid-session
// Add PIN change functionality
// Add account recovery (forgot PIN)

// ================================================
// USEFUL LINKS
// ================================================

// MDN Web Docs: https://developer.mozilla.org/
// localStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
// Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
// Web Crypto API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
// Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

// ================================================
// REMEMBER
// ================================================

// 1. This is a FRONTEND DEMO - NOT SECURE for production
// 2. All data is LOCAL only - no cloud sync
// 3. No backend - all processing in browser
// 4. No real payments - all simulated
// 5. No external dependencies - pure HTML/CSS/JS
// 6. Code is commented - read comments for details
// 7. Search for TODO - future improvement ideas
// 8. Simple, readable code - good for learning

// Happy coding! 🚀
