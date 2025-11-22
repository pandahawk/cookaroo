#!/bin/bash

# Exit immediately on error
set -e

echo "🧹 Stopping and removing containers, networks, and volumes..."
docker compose down -v

echo "🚀 Starting containers in detached mode..."
docker compose up -d

echo "✅ Done! Containers are now running."