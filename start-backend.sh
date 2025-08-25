#!/bin/bash

echo "🚀 Starting SeekFactory MongoDB Backend..."
echo ""
echo "📍 Location: $(pwd)/backend"
echo "🔗 MongoDB URI: mongodb+srv://vimarshkrishan:...***...@seekfactory.m8efxko.mongodb.net"
echo "🌐 Server will run on: http://localhost:5000"
echo ""

# Navigate to backend directory
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "▶️  Starting server..."
echo ""
npm run dev
