# Referral Display Website

A beautiful React Native web application that displays referral data in a stylish, modern interface.

## Features

- 🌐 **Web-based**: Runs directly in your browser using React Native Web
- 📱 Modern, responsive design
- 🎨 Beautiful gradient cards for each referral
- 📊 Statistics overview with total referrals and active codes
- 👤 User-friendly profile display with emoji icons
- ⭐ Special indication for original members
- 🎯 Clean, intuitive navigation

## Technology Stack

- **React Native Web**: Write once, run on web
- **Webpack**: Module bundler for development and production
- **Babel**: JavaScript compiler for modern features
- **Emoji Icons**: Web-friendly icons for universal compatibility

## Installation

1. Make sure you have Node.js installed (version 14 or higher)
2. Install project dependencies:
   ```
   npm install
   ```

## Running the Website

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to:
   - **Local**: http://localhost:3000/
   - **Network**: http://192.168.12.199:3000/ (or your machine's IP)

3. The website will automatically open in your default browser!

## Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run dev` - Start development server and open browser

## What You'll See

The website displays:
- **Header**: Sleek blue header with dashboard title and add button
- **Statistics Cards**: 
  - Total Referrals: Shows count of all referrals
  - Active Codes: Shows unique referral codes
- **Referral Cards**: Beautiful gradient cards showing:
  - 👤 Person emoji icon
  - Referral code badge
  - User name and email
  - ✅ Active status indicator
  - ⭐ "Original Member" badge for users with no referrer

## Data Structure

The app reads from `referal.json` which should contain referral data in this format:

```json
{
  "referrals": [
    {
      "referralCode": "REF123",
      "name": "User Name",
      "email": "user@example.com",
      "referredBy": null
    }
  ]
}
```

## Customization

- **Colors**: Modify the gradient colors in the `getCardColor` function in `App.js`
- **Statistics**: Add more stat cards in the `statsSection`
- **Card Design**: Customize the `ReferralCard` component
- **Icons**: Change emoji icons in the `Icon` component

## Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge (modern versions)
- ✅ Mobile browsers
- ✅ Responsive design works on all screen sizes

## Deployment

To deploy to production:

1. Build the project:
   ```
   npm run build
   ```

2. Deploy the `dist` folder to any web hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting provider

## License

MIT License - feel free to use and modify as needed!
