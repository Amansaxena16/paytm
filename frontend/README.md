# WalletApp - Digital Wallet Application

A modern, full-featured digital wallet application built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Features

### Authentication
- ✅ Sign Up with validation
- ✅ Sign In with validation
- ✅ Form error states and loading states
- ✅ Forgot Password link (UI)

### Dashboard
- ✅ Responsive 3-column layout
- ✅ User profile with edit functionality
- ✅ Balance display card
- ✅ User search and send money
- ✅ Add money to wallet
- ✅ Transaction history with status badges
- ✅ Real-time loading states
- ✅ Empty states for no data

### UI Components
- ✅ Reusable Button component
- ✅ Reusable Input component with validation
- ✅ Reusable Card component
- ✅ Reusable Modal component
- ✅ Alert/Notification component (Success, Error, Info)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
Paytm-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── signin/
│   │   │   └── page.tsx       # Sign In page
│   │   ├── signup/
│   │   │   └── page.tsx       # Sign Up page
│   │   └── dashboard/
│   │       └── page.tsx       # Dashboard page
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Alert.tsx
│   │   ├── auth/              # Authentication components
│   │   │   ├── SignInForm.tsx
│   │   │   └── SignUpForm.tsx
│   │   └── dashboard/         # Dashboard components
│   │       ├── UserProfile.tsx
│   │       ├── BalanceCard.tsx
│   │       ├── UserSearch.tsx
│   │       ├── SendMoneyModal.tsx
│   │       ├── WalletActions.tsx
│   │       └── TransactionList.tsx
│   ├── services/              # API service layer
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── walletService.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── utils/                 # Utility functions and mock data
│       └── mockData.ts
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Create a new Next.js project:**
   ```bash
   npx create-next-app@latest wallet-app --typescript --tailwind --app
   cd wallet-app
   ```

2. **Copy all the provided files into your project following the structure above**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Available Routes

- `/` - Home/Landing page
- `/signin` - Sign In page
- `/signup` - Sign Up page
- `/dashboard` - Dashboard (after authentication)

## Mock Data

The application currently uses mock data for demonstration purposes. All service files (`src/services/*`) contain placeholder API calls that return mock data after a simulated delay.

### Mock Users
- john_doe, alice_smith, bob_jones, carol_white, david_brown, emma_davis

### Mock Transactions
- 5 sample transactions with different statuses (completed, pending, failed)

## API Integration

To integrate with your backend REST APIs:

1. **Set your API base URL** in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```

2. **Update service files** in `src/services/`:
   - Uncomment the API fetch calls
   - Remove or comment out the mock implementations
   - Update endpoints to match your API structure

### Example API Integration

```typescript
// src/services/authService.ts
export const signIn = async (credentials: AuthCredentials): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: 'Failed to sign in'
    };
  }
};
```

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Features Breakdown

### Authentication Pages
- Form validation with real-time error display
- Loading states during API calls
- Success/Error alerts
- Redirect after successful auth

### User Profile
- Display user information
- Edit profile modal
- Avatar with initials
- Update profile functionality

### Balance & Transactions
- Large balance display card with gradient
- Search users by username or name
- Send money modal with amount input
- Transaction history with:
  - Sender/Receiver names
  - Amount with +/- indicators
  - Status badges (completed, pending, failed)
  - Formatted dates (Today, Yesterday, etc.)

### Wallet Actions
- Add money to wallet
- Quick add buttons (₹500, ₹1000, ₹2000, ₹5000)
- Amount validation
- Success/Error feedback

## Customization

### Colors
Update colors in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your color palette
      },
    },
  },
}
```

### Typography
Change font in `src/app/layout.tsx`:
```typescript
import { YourFont } from 'next/font/google';
const yourFont = YourFont({ subsets: ['latin'] });
```

## Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_base_url
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

---

**Note**: This is a frontend-only implementation with mock data. Backend REST API integration requires uncommenting and configuring the service layer API calls.