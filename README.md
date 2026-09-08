# 1Fi Marketplace

A responsive 1Fi Marketplace feature built as part of the 1Fi SDE Intern Assignment. The Marketplace is integrated into the existing Shop experience and allows users to browse products, view product details, select product variants, explore EMI plans, and proceed with their selected EMI option.

## Features

- Top Brands and Nearby Stores options in the Shop section
- 1Fi Marketplace product listing
- Product search and categories
- Product images, names, pricing, and details
- Product variant selection
- Multiple EMI plans
- EMI plan selection
- Dynamic EMI information
- Proceed with EMI CTA
- Confirmation flow
- Loading, error, and empty states
- Responsive mobile-first design

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Node.js
- Express.js
- MongoDB / MongoDB Atlas
- REST APIs

## Marketplace Flow

Shop → 1Fi Marketplace → Browse Products → Product Details → Select Variant → Select EMI Plan → Proceed with EMI → Confirmation

## Data & API

Product and EMI information is structured separately from UI components. A dedicated data/service layer is used so that mock data can be replaced with a real API when backend integration is available.

## Design

The Marketplace follows the existing 1Fi application's visual language, including its typography, colors, spacing, rounded cards, buttons, navigation, and overall mobile-first user experience. The existing 1Fi application has not been redesigned; the implementation focuses specifically on the Marketplace feature within the Shop experience.

## Getting Started

```bash
npm install
npm run dev
