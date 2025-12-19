# ResumeKraft - Universal Resume Builder for Bharat Workforce

🇮🇳 An inclusive, multi-modal resume builder designed for blue-, grey-, and white-collar workers across India.

![Landing Page](/.github/landing-screenshot.png)

## ✨ Features

### 🔐 User Authentication
- **Clerk Integration**: Secure sign-in/sign-up with email or Google
- **Protected Routes**: Builder and dashboard require authentication
- **User Profiles**: Personalized resume management per user

### 🎤 Multi-Modal Input
- **Form**: Step-by-step wizard for structured input
- **Chat**: Conversational flow with guided questions  
- **Voice**: Web Speech API with Hindi/English support
- **Image**: Drag-and-drop portfolio uploads

### 📄 Resume Generation
- Real-time live preview
- Professional A4 PDF export
- Mobile-friendly web profiles
- India-inspired design themes

### 📱 QR Code Sharing
- Auto-generated shareable QR codes
- Copy link to clipboard
- Download QR as PNG

### 💾 Storage & Versioning
- PostgreSQL database with Prisma ORM
- Automatic version history
- Comments/notes for feedback
- User-linked resumes for personalized access

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or use [Neon](https://neon.tech) for serverless)
- [Clerk](https://clerk.com) account for authentication

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Universal Resume Builder for Bharat Workforce"

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_secret_here"
```

### Database & Server

```bash
# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── builder/            # Resume builder (protected)
│   │   ├── dashboard/          # Resume management (protected)
│   │   ├── resume/[id]/        # Public profile
│   │   ├── sign-in/            # Clerk sign-in page
│   │   ├── sign-up/            # Clerk sign-up page
│   │   └── api/                # REST APIs
│   ├── components/
│   │   ├── input/              # Form, Chat, Voice, Image
│   │   ├── resume/             # Preview templates
│   │   └── share/              # QR code display
│   ├── context/                # React Context
│   ├── lib/                    # Utilities
│   ├── types/                  # TypeScript types
│   └── middleware.ts           # Clerk route protection
├── prisma/
│   └── schema.prisma           # Database schema
└── package.json
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Authentication | Clerk |
| Database | PostgreSQL + Prisma |
| PDF | html2canvas + jsPDF |
| QR Code | qrcode.react |
| Voice | Web Speech API |

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resume` | List user's resumes |
| POST | `/api/resume` | Create new resume |
| GET | `/api/resume/[id]` | Get resume by ID |
| PUT | `/api/resume/[id]` | Update resume |
| DELETE | `/api/resume/[id]` | Delete resume |
| GET | `/api/resume/[id]/comments` | Get comments |
| POST | `/api/resume/[id]/comments` | Add comment |

## 🔐 Authentication Flow

1. **Unauthenticated users** see "Sign In" / "Get Started Free" on landing page
2. **Clicking Sign In** opens Clerk's authentication UI (email or Google)
3. **Protected routes** (`/builder`, `/dashboard`) redirect to sign-in if not authenticated
4. **After login**, users are redirected to the resume builder
5. **Resumes are linked** to user accounts for personalized access

## 🎨 Design Philosophy

ResumeKraft is designed with inclusivity in mind:

- **Simple Interface**: Easy for first-time users
- **Multiple Input Methods**: Voice for those who prefer speaking
- **India-First**: Supports Hindi and Indian English
- **Blue-Collar Friendly**: Portfolio section for showcasing work
- **Secure**: User authentication protects personal data

## 📄 License

MIT License - Feel free to use for your projects!

## 🙏 Made with ❤️ for Bharat's Workforce

