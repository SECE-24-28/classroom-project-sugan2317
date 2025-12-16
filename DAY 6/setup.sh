#!/bin/bash

echo "🔥 Setting up Recharge Management System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    echo ""
    echo "🚀 Starting development server..."
    echo ""
    echo "Demo Credentials:"
    echo "👤 User: user / user123"
    echo "🔐 Admin: admin / admin123"
    echo ""
    echo "🌐 Opening http://localhost:5173"
    echo ""
    
    # Start development server
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi