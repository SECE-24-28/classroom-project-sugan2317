// ========================================
// MOBILE RECHARGE APP - MAIN APPLICATION
// Junior Developer Style - Clear & Commented
// ========================================

// ========================================
// GLOBAL VARIABLES & DATA
// ========================================

// Mock database of users stored in localStorage
// Structure: { mobile: { mobile, operator, pinHash, walletBalance, history:[] } }
let usersDB = JSON.parse(localStorage.getItem('usersDB')) || {};

// Current logged-in user session
let currentSession = JSON.parse(localStorage.getItem('session')) || null;

// Voice guidance enabled/disabled
let voiceEnabled = localStorage.getItem('voiceEnabled') !== 'false';

// Generated OTP (for demo purposes)
let generatedOTP = null;

// ========================================
// MOCK DATA - Plans and Operators
// ========================================

const operators = {
    airtel: { name: 'Airtel', color: '#FF6B35', icon: '🟠' },
    jio: { name: 'Jio', color: '#1F77F2', icon: '🔵' },
    vi: { name: 'Vi', color: '#E60000', icon: '🔴' },
    bsnl: { name: 'BSNL', color: '#F4B860', icon: '🟡' }
};

// Mock recharge plans
const plans = [
    // Airtel Plans
    { id: 'airtel_199', operator: 'airtel', amount: 199, validity: '28 days', data: '2GB', calls: 'Unlimited', rate: 'Best' },
    { id: 'airtel_299', operator: 'airtel', amount: 299, validity: '28 days', data: '5GB', calls: 'Unlimited', rate: 'Popular' },
    { id: 'airtel_399', operator: 'airtel', amount: 399, validity: '56 days', data: '10GB', calls: 'Unlimited', rate: 'Super' },

    // Jio Plans
    { id: 'jio_149', operator: 'jio', amount: 149, validity: '28 days', data: '1.5GB', calls: 'Unlimited', rate: 'Budget' },
    { id: 'jio_249', operator: 'jio', amount: 249, validity: '28 days', data: '4GB', calls: 'Unlimited', rate: 'Popular' },
    { id: 'jio_499', operator: 'jio', amount: 499, validity: '84 days', data: '12GB', calls: 'Unlimited', rate: 'Best' },

    // Vi Plans
    { id: 'vi_179', operator: 'vi', amount: 179, validity: '28 days', data: '1.5GB', calls: 'Unlimited', rate: 'Budget' },
    { id: 'vi_299', operator: 'vi', amount: 299, validity: '28 days', data: '5GB', calls: 'Unlimited', rate: 'Popular' },
    { id: 'vi_449', operator: 'vi', amount: 449, validity: '56 days', data: '10GB', calls: 'Unlimited', rate: 'Best' },

    // BSNL Plans
    { id: 'bsnl_99', operator: 'bsnl', amount: 99, validity: '28 days', data: '1GB', calls: '300 mins', rate: 'Budget' },
    { id: 'bsnl_199', operator: 'bsnl', amount: 199, validity: '28 days', data: '3GB', calls: 'Unlimited', rate: 'Popular' },
    { id: 'bsnl_349', operator: 'bsnl', amount: 349, validity: '56 days', data: '8GB', calls: 'Unlimited', rate: 'Super' }
];

// Demo user (can be logged in with PIN 1234)
// Initialize demo user if not already registered
if (!usersDB['9876543210']) {
    // Hash the PIN 1234 using SHA-256 (for demo, actual implementation is in auth functions)
    usersDB['9876543210'] = {
        mobile: '9876543210',
        operator: 'airtel',
        pinHash: 'PIN_HASH_1234', // Placeholder - will be hashed in real scenario
        walletBalance: 500,
        history: []
    };
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
}

// ========================================
// AUTHENTICATION MODULE
// ========================================

// TODO: Replace with server-side authentication (currently frontend only - not secure for production)

/**
 * Hash a PIN using SHA-256 (client-side demo)
 * Note: This is for demo purposes only - NOT SECURE for production
 */
async function hashPin(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Register a new user
 */
async function registerUser(mobile, pin, operator) {
    // Validate inputs
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        return { success: false, error: 'Invalid mobile number' };
    }

    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
        return { success: false, error: 'PIN must be 4 digits' };
    }

    // Check if user already exists
    if (usersDB[mobile]) {
        return { success: false, error: 'Mobile number already registered' };
    }

    try {
        // Hash the PIN (client-side demo)
        const pinHash = await hashPin(pin);

        // Create new user
        usersDB[mobile] = {
            mobile: mobile,
            operator: operator || 'airtel',
            pinHash: pinHash,
            walletBalance: 0,
            history: []
        };

        // Save to localStorage
        localStorage.setItem('usersDB', JSON.stringify(usersDB));

        // Log for debugging
        console.log('User registered:', mobile);

        return { success: true, message: 'Registration successful! You can now login.' };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Registration failed. Please try again.' };
    }
}

/**
 * Login user with PIN
 */
async function loginUser(mobile, pin) {
    // Validate inputs
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        return { success: false, error: 'Invalid mobile number' };
    }

    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
        return { success: false, error: 'PIN must be 4 digits' };
    }

    // Check if user exists
    if (!usersDB[mobile]) {
        return { success: false, error: 'User not found. Please register first.' };
    }

    try {
        // Hash the entered PIN
        const pinHash = await hashPin(pin);

        // Compare with stored hash
        if (usersDB[mobile].pinHash !== pinHash) {
            return { success: false, error: 'Incorrect PIN' };
        }

        // Create session token
        const token = 'TOKEN_' + Math.random().toString(36).substr(2, 9);
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours

        currentSession = {
            mobile: mobile,
            token: token,
            expiry: expiryTime
        };

        // Save session to localStorage
        localStorage.setItem('session', JSON.stringify(currentSession));

        // Log for debugging
        console.log('User logged in:', mobile);

        // Play welcome voice if enabled
        if (voiceEnabled) {
            speakMessage(`Welcome ${mobile}`);
        }

        return { success: true, message: 'Login successful' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Login failed. Please try again.' };
    }
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    if (!currentSession) return false;

    // Check if token is still valid (not expired)
    if (currentSession.expiry < new Date().getTime()) {
        // Token expired
        currentSession = null;
        localStorage.removeItem('session');
        return false;
    }

    return true;
}

/**
 * Logout user
 */
function logoutUser() {
    currentSession = null;
    localStorage.removeItem('session');
    console.log('User logged out');
    goToPage('loginPage');
}

// ========================================
// VOICE GUIDANCE (Accessibility Feature)
// ========================================

/**
 * Speak a message using Web Speech API
 */
function speakMessage(message) {
    if (!voiceEnabled) return;

    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        // Speak the message
        window.speechSynthesis.speak(utterance);

        console.log('Speaking:', message);
    }
}

/**
 * Toggle voice guidance on/off
 */
function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    localStorage.setItem('voiceEnabled', voiceEnabled);

    const voiceIcon = document.getElementById('voiceIcon');
    if (voiceIcon) {
        voiceIcon.textContent = voiceEnabled ? '🔊' : '🔇';
    }

    const message = voiceEnabled ? 'Voice guidance enabled' : 'Voice guidance disabled';
    speakMessage(message);
}

// ========================================
// PAGE NAVIGATION
// ========================================

/**
 * Switch between pages (login, dashboard, etc.)
 * Includes route protection
 */
function goToPage(pageId) {
    // Route protection: Require authentication for most pages
    const publicPages = ['loginPage'];
    if (!publicPages.includes(pageId) && !isAuthenticated()) {
        console.warn('Not authenticated. Redirecting to login.');
        goToPage('loginPage');
        return;
    }

    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');

        // Initialize page data
        if (pageId === 'dashboardPage') {
            initializeDashboard();
        } else if (pageId === 'rechargePage') {
            initializeRechargePage();
        } else if (pageId === 'plansPage') {
            loadPlans();
        } else if (pageId === 'paymentPage') {
            initializePaymentPage();
        } else if (pageId === 'walletPage') {
            initializeWalletPage();
        } else if (pageId === 'historyPage') {
            initializeHistoryPage();
        }

        console.log('Navigated to:', pageId);
    }
}

// ========================================
// LOGIN & REGISTRATION HANDLERS
// ========================================

/**
 * Switch between Login and Register tabs
 */
function switchTab(tabId) {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Hide all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Highlight selected button
    const selectedBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
}

/**
 * Switch between PIN and OTP login modes
 */
function switchLoginMode(mode) {
    const pinForm = document.getElementById('pinLoginForm');
    const otpForm = document.getElementById('otpLoginForm');
    const modeButtons = document.querySelectorAll('.mode-btn');

    // Remove active class from all buttons
    modeButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to selected button
    const selectedBtn = document.querySelector(`[data-mode="${mode}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Hide all forms
    pinForm.classList.remove('active');
    otpForm.classList.remove('active');

    // Show selected form
    if (mode === 'pin') {
        pinForm.classList.add('active');
    } else if (mode === 'otp') {
        otpForm.classList.add('active');
    }
}

/**
 * Handle Registration
 */
async function handleRegister() {
    const mobile = document.getElementById('registerMobile').value.trim();
    const operator = document.getElementById('registerOperator').value;
    const pin = document.getElementById('registerPin').value.trim();

    // Clear previous errors
    clearErrors(['registerMobileError', 'registerPinError']);

    // Validate
    let hasError = false;

    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        showError('registerMobileError', '❌ Enter 10-digit mobile number');
        hasError = true;
    }

    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
        showError('registerPinError', '❌ PIN must be 4 digits');
        hasError = true;
    }

    if (hasError) {
        speakMessage('Please fix the errors and try again');
        return;
    }

    // Register user
    const result = await registerUser(mobile, pin, operator);

    if (result.success) {
        // Clear form
        document.getElementById('registerMobile').value = '';
        document.getElementById('registerPin').value = '';
        document.getElementById('registerOperator').value = '';

        // Show success message
        showMessageBox(result.message, 'success');
        speakMessage(result.message);

        // Switch to login tab after 2 seconds
        setTimeout(() => {
            switchTab('loginTab');
            clearMessageBox();
        }, 2000);
    } else {
        showError('registerMobileError', '❌ ' + result.error);
        speakMessage(result.error);
    }
}

/**
 * Handle PIN Login
 */
async function handleLogin() {
    const mobile = document.getElementById('loginMobile').value.trim();
    const pin = document.getElementById('loginPin').value.trim();

    // Clear previous errors
    clearErrors(['loginMobileError', 'loginPinError']);

    // Validate
    let hasError = false;

    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        showError('loginMobileError', '❌ Enter 10-digit mobile number');
        hasError = true;
    }

    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
        showError('loginPinError', '❌ PIN must be 4 digits');
        hasError = true;
    }

    if (hasError) {
        speakMessage('Please fix the errors and try again');
        return;
    }

    // Login user
    const result = await loginUser(mobile, pin);

    if (result.success) {
        // Clear form
        document.getElementById('loginMobile').value = '';
        document.getElementById('loginPin').value = '';

        // Navigate to dashboard
        showMessageBox('✅ Login successful! Redirecting...', 'success');
        setTimeout(() => {
            goToPage('dashboardPage');
        }, 1000);
    } else {
        showError('loginMobileError', '❌ ' + result.error);
        speakMessage(result.error);
    }
}

/**
 * Generate OTP (demo purposes)
 */
function generateOtp() {
    const mobile = document.getElementById('otpMobile').value.trim();

    // Validate mobile
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        showError('otpMobileError', '❌ Enter valid 10-digit number');
        speakMessage('Invalid mobile number');
        return;
    }

    // Generate random 6-digit OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Show OTP and input field
    document.getElementById('otpValue').textContent = generatedOTP;
    document.getElementById('otpDisplay').classList.remove('hidden');
    document.getElementById('otpInputGroup').classList.remove('hidden');
    document.getElementById('verifyOtpBtn').classList.remove('hidden');

    speakMessage(`Your OTP is ${generatedOTP}. Please enter it to continue.`);
    console.log('Generated OTP:', generatedOTP); // For demo testing
}

/**
 * Verify OTP and login
 */
async function verifyOtp() {
    const mobile = document.getElementById('otpMobile').value.trim();
    const otpCode = document.getElementById('otpCode').value.trim();

    // Clear previous errors
    clearErrors(['otpMobileError', 'otpError']);

    // Validate
    if (!otpCode || otpCode !== generatedOTP) {
        showError('otpError', '❌ Incorrect OTP');
        speakMessage('Incorrect OTP. Please try again.');
        return;
    }

    // Check if user exists
    if (!usersDB[mobile]) {
        showError('otpMobileError', '❌ User not found');
        return;
    }

    // Create session without PIN verification (OTP was verified)
    const token = 'TOKEN_' + Math.random().toString(36).substr(2, 9);
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    currentSession = {
        mobile: mobile,
        token: token,
        expiry: expiryTime
    };

    localStorage.setItem('session', JSON.stringify(currentSession));

    // Clear form
    document.getElementById('otpMobile').value = '';
    document.getElementById('otpCode').value = '';
    document.getElementById('otpDisplay').classList.add('hidden');
    document.getElementById('otpInputGroup').classList.add('hidden');
    document.getElementById('verifyOtpBtn').classList.add('hidden');

    // Navigate to dashboard
    showMessageBox('✅ Login successful!', 'success');
    setTimeout(() => {
        goToPage('dashboardPage');
    }, 1000);
}

// ========================================
// DASHBOARD PAGE
// ========================================

/**
 * Initialize and display dashboard
 */
function initializeDashboard() {
    if (!isAuthenticated()) return;

    const user = usersDB[currentSession.mobile];

    // Update header
    document.getElementById('mobileDisplay').textContent = currentSession.mobile;
    document.getElementById('balanceDisplay').textContent = '₹' + user.walletBalance;
    document.getElementById('operatorDisplay').textContent = operators[user.operator].name;

    // Show last recharge
    if (user.history.length > 0) {
        const lastRecharge = user.history[user.history.length - 1];
        document.getElementById('lastRechargeDisplay').textContent = `Last: ₹${lastRecharge.amount}`;
    }

    // Display recent recharge history
    const recentHistory = document.getElementById('recentHistory');
    recentHistory.innerHTML = '';

    if (user.history.length === 0) {
        recentHistory.innerHTML = '<p style="text-align: center; color: #999;">No recharges yet</p>';
    } else {
        // Show last 3 recharges
        user.history.slice(-3).reverse().forEach(transaction => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div style="display: flex; align-items: center; flex: 1;">
                    <div class="history-item-icon">💰</div>
                    <div class="history-item-content">
                        <div class="history-item-amount">₹${transaction.amount}</div>
                        <div class="history-item-date">${transaction.date}</div>
                    </div>
                </div>
                <div class="history-item-status">${transaction.status}</div>
            `;
            recentHistory.appendChild(historyItem);
        });
    }

    // Play welcome voice
    if (voiceEnabled) {
        speakMessage('Welcome back. Tap recharge to top up your mobile');
    }
}

// ========================================
// RECHARGE PAGE
// ========================================

/**
 * Initialize recharge page
 */
function initializeRechargePage() {
    if (!isAuthenticated()) return;

    const user = usersDB[currentSession.mobile];

    // Fill in mobile and operator
    document.getElementById('rechargeMobile').value = currentSession.mobile;
    document.getElementById('rechargeOperator').value = operators[user.operator].name;

    // Clear previous amount
    document.getElementById('rechargeAmount').value = '';
    document.getElementById('rechargeAmountError').innerHTML = '';

    // Load quick plans for this operator
    const quickPlans = document.getElementById('quickPlans');
    quickPlans.innerHTML = '';

    const operatorPlans = plans.filter(p => p.operator === user.operator).slice(0, 4);
    operatorPlans.forEach(plan => {
        const btn = document.createElement('button');
        btn.className = 'quick-plan-btn';
        btn.innerHTML = `₹${plan.amount}<br><small>${plan.validity}</small>`;
        btn.onclick = () => selectPlan(plan);
        quickPlans.appendChild(btn);
    });
}

/**
 * Select a plan and fill amount
 */
function selectPlan(plan) {
    document.getElementById('rechargeAmount').value = plan.amount;
    speakMessage(`Selected ${plan.amount} rupees plan`);
}

// ========================================
// PLANS PAGE
// ========================================

/**
 * Load and display all plans
 */
function loadPlans(operatorFilter = 'all') {
    const plansGrid = document.getElementById('plansGrid');
    plansGrid.innerHTML = '';

    // Filter plans
    let filteredPlans = plans;
    if (operatorFilter !== 'all') {
        filteredPlans = plans.filter(p => p.operator === operatorFilter);
    }

    // Display plans
    filteredPlans.forEach(plan => {
        const planCard = document.createElement('div');
        planCard.className = 'plan-card';
        planCard.innerHTML = `
            <div class="plan-amount">₹${plan.amount}</div>
            <div class="plan-details">
                <div class="plan-detail">
                    <span>📅</span>
                    <span>${plan.validity}</span>
                </div>
                <div class="plan-detail">
                    <span>📊</span>
                    <span>${plan.data}</span>
                </div>
                <div class="plan-detail">
                    <span>📞</span>
                    <span>${plan.calls}</span>
                </div>
            </div>
            <button class="plan-select-btn" onclick="selectAndGoPay(${plan.amount})">
                Select Plan
            </button>
        `;
        plansGrid.appendChild(planCard);
    });
}

/**
 * Filter plans by operator
 */
function filterPlansByOperator(operator) {
    // Update button states
    const buttons = document.querySelectorAll('.op-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    const selectedBtn = document.querySelector(`[data-operator="${operator}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Load filtered plans
    loadPlans(operator);
}

/**
 * Select plan and navigate to payment
 */
function selectAndGoPay(amount) {
    document.getElementById('rechargeAmount').value = amount;
    goToPage('paymentPage');
}

// ========================================
// PAYMENT PAGE
// ========================================

/**
 * Initialize payment page with order summary
 */
function initializePaymentPage() {
    if (!isAuthenticated()) return;

    const user = usersDB[currentSession.mobile];
    const amount = parseInt(document.getElementById('rechargeAmount').value) || 0;

    // Update summary
    document.getElementById('summaryMobile').textContent = currentSession.mobile;
    document.getElementById('summaryOperator').textContent = operators[user.operator].name;
    document.getElementById('summaryAmount').textContent = '₹' + amount;
    document.getElementById('summaryBalance').textContent = '₹' + user.walletBalance;
    document.getElementById('summaryTotal').textContent = '₹' + amount;

    // Clear previous error
    document.getElementById('paymentError').innerHTML = '';

    // Reset payment method
    document.querySelector('input[name="paymentMethod"][value="wallet"]').checked = true;
}

/**
 * Process payment
 */
function processPayment() {
    if (!isAuthenticated()) return;

    const user = usersDB[currentSession.mobile];
    const amount = parseInt(document.getElementById('rechargeAmount').value) || 0;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Clear previous error
    document.getElementById('paymentError').innerHTML = '';

    // Validate amount
    if (amount <= 0) {
        showError('paymentError', '❌ Invalid amount. Please enter a valid amount.');
        return;
    }

    // Check wallet balance for wallet payment
    if (paymentMethod === 'wallet' && user.walletBalance < amount) {
        const errorMsg = '❌ Insufficient balance. Please add money to your wallet.';
        showError('paymentError', errorMsg);
        speakMessage('Insufficient balance in wallet');
        return;
    }

    // Show processing overlay
    document.getElementById('processingOverlay').classList.remove('hidden');

    // Simulate payment processing
    setTimeout(() => {
        // Deduct amount from wallet
        user.walletBalance -= amount;

        // Add to transaction history
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-IN');
        user.history.push({
            amount: amount,
            date: dateStr,
            status: 'Success',
            method: paymentMethod,
            operator: user.operator
        });

        // Save to localStorage
        localStorage.setItem('usersDB', JSON.stringify(usersDB));

        // Hide processing overlay
        document.getElementById('processingOverlay').classList.add('hidden');

        // Show success popup
        showSuccessPopup(amount, user.operator, currentSession.mobile);

        // Clear amount field after success
        document.getElementById('rechargeAmount').value = '';

    }, 2000); // Simulate 2-second processing time
}

/**
 * Show success popup after payment
 */
function showSuccessPopup(amount, operator, mobile) {
    const popup = document.getElementById('successPopup');
    const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const today = new Date().toLocaleDateString('en-IN');

    document.getElementById('popupTitle').textContent = 'Recharge Successful!';
    document.getElementById('popupMessage').textContent = `₹${amount} added to your account`;

    const details = document.getElementById('popupDetails');
    details.innerHTML = `
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Operator:</strong> ${operator}</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Date:</strong> ${today}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
    `;

    popup.classList.remove('hidden');

    speakMessage(`Recharge successful. ${amount} rupees added to your account`);
}

/**
 * Close success popup
 */
function closeSuccessPopup() {
    document.getElementById('successPopup').classList.add('hidden');
    goToPage('dashboardPage');
}

// ========================================
// WALLET PAGE
// ========================================

/**
 * Initialize wallet page
 */
function initializeWalletPage() {
    if (!isAuthenticated()) return;

    const user = usersDB[currentSession.mobile];

    // Update balance
    document.getElementById('walletBalance').textContent = '₹' + user.walletBalance;

    // Load transaction history
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    if (user.history.length === 0) {
        transactionList.innerHTML = '<p style="text-align: center; color: #999;">No transactions yet</p>';
    } else {
        user.history.forEach(transaction => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div style="display: flex; align-items: center; flex: 1;">
                    <div class="history-item-icon">${transaction.status === 'Success' ? '✅' : '❌'}</div>
                    <div class="history-item-content">
                        <div class="history-item-amount">-₹${transaction.amount}</div>
                        <div class="history-item-date">${transaction.date} • ${transaction.method}</div>
                    </div>
                </div>
                <div class="history-item-status">${transaction.status}</div>
            `;
            transactionList.appendChild(item);
        });
    }
}

/**
 * Add money to wallet
 */
function addMoney() {
    if (!isAuthenticated()) return;

    const amount = parseInt(document.getElementById('addAmount').value) || 0;
    const user = usersDB[currentSession.mobile];

    if (amount <= 0) {
        speakMessage('Enter a valid amount');
        return;
    }

    // Show processing
    document.getElementById('processingOverlay').classList.remove('hidden');

    setTimeout(() => {
        user.walletBalance += amount;
        localStorage.setItem('usersDB', JSON.stringify(usersDB));
        document.getElementById('processingOverlay').classList.add('hidden');

        // Show success
        showMessageBox(`✅ ₹${amount} added to wallet`, 'success');
        speakMessage(`${amount} rupees added to your wallet`);

        // Clear input and refresh
        document.getElementById('addAmount').value = '';
        setTimeout(() => {
            initializeWalletPage();
        }, 1000);
    }, 2000);
}

// ========================================
// HISTORY PAGE
// ========================================

/**
 * Initialize history page
 */
function initializeHistoryPage() {
    if (!isAuthenticated()) return;

    const user = usersDB[currentSession.mobile];
    const fullHistory = document.getElementById('fullHistory');
    fullHistory.innerHTML = '';

    if (user.history.length === 0) {
        fullHistory.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">No recharge history yet</p>';
    } else {
        // Display all history (reversed - newest first)
        user.history.slice().reverse().forEach(transaction => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div style="display: flex; align-items: center; flex: 1;">
                    <div class="history-item-icon">💰</div>
                    <div class="history-item-content">
                        <div class="history-item-amount">₹${transaction.amount}</div>
                        <div class="history-item-date">${transaction.date}</div>
                    </div>
                </div>
                <div class="history-item-status">${transaction.status}</div>
            `;
            fullHistory.appendChild(item);
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Show error message for a specific field
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Clear all error messages
 */
function clearErrors(errorIds) {
    errorIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '';
            element.classList.remove('show');
        }
    });
}

/**
 * Show message box with color coding
 */
function showMessageBox(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${type}`;
        messageBox.classList.remove('hidden');
    }
}

/**
 * Clear message box
 */
function clearMessageBox() {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.classList.add('hidden');
    }
}

/**
 * Numeric keypad - Append digit to input
 */
function appendDigit(digit, inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value += digit;
    }
}

/**
 * Numeric keypad - Delete last digit
 */
function deleteLastDigit(inputId) {
    const input = document.getElementById(inputId);
    if (input && input.value.length > 0) {
        input.value = input.value.slice(0, -1);
    }
}

/**
 * Numeric keypad - Clear input
 */
function clearInput(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = '';
    }
}

/**
 * Change font size for accessibility
 */
function changeFontSize(percentage) {
    const size = (percentage / 100) * 16; // base 16px
    document.documentElement.style.fontSize = size + 'px';
}

/**
 * Toggle voice guidance setting
 */
function toggleVoiceGuidance() {
    const toggle = document.getElementById('voiceToggle');
    voiceEnabled = toggle.checked;
    localStorage.setItem('voiceEnabled', voiceEnabled);
}

/**
 * Open settings panel
 */
function openSettings() {
    document.getElementById('settingsPanel').classList.remove('hidden');
}

/**
 * Close settings panel
 */
function closeSettings() {
    document.getElementById('settingsPanel').classList.add('hidden');
}

// ========================================
// LOGOUT
// ========================================

/**
 * Logout user
 */
function logout() {
    currentSession = null;
    localStorage.removeItem('session');
    speakMessage('You have been logged out');
    goToPage('loginPage');
}

// ========================================
// INITIALIZATION (Run on page load)
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('App initialized');

    // Restore voice setting
    const voiceToggle = document.getElementById('voiceToggle');
    if (voiceToggle) {
        voiceToggle.checked = voiceEnabled;
    }

    // Check if user is authenticated
    if (isAuthenticated()) {
        goToPage('dashboardPage');
    } else {
        goToPage('loginPage');
    }

    // // TODO: Replace localStorage with server API for production
    // // TODO: Implement actual PIN hashing with salt on backend
    // // TODO: Add rate limiting on login attempts
    // // TODO: Implement payment gateway integration
    // // TODO: Add SMS/Email notifications
});