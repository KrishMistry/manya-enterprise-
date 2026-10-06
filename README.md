# Manya Enterprise — Full-Stack Industrial Web Portal

Industrial Effluent Treatment Plant (ETP) solutions, chemical supplies, Bectofine bio-culture, chlorination systems, air diffusers, and specialized industrial support services in Vadodara, Gujarat.

---

## 🗂 File Structure: Frontend & Backend (Name-Wise)

The project is structured with a clean separation between the **Backend API Server** and the **Frontend React Application**, running seamlessly on a single port (`3000`) via Express + Vite middleware.

```text
├── server.ts                               # [BACKEND ENTRY POINT] Express server mounting Vite in dev & API routes
│
├── server/                                 # [BACKEND DIRECTORY]
│   ├── routes/
│   │   ├── api.ts                          # Master router uniting all /api/* endpoints
│   │   ├── inquiries.ts                    # POST /api/inquiries (validation & storage), GET /api/inquiries, GET /api/inquiries/stats
│   │   ├── services.ts                     # GET /api/services, GET /api/services/:id (ETP, Bectofine, etc.)
│   │   ├── company.ts                      # GET /api/company (GSTIN, phones, address, Nipul Mistry contact)
│   │   └── health.ts                       # GET /api/health (uptime, status, timestamp)
│   ├── storage/
│   │   └── inquiryStore.ts                 # In-memory database store for inquiry tracking & ticket generation
│   └── types/
│       └── backend.ts                      # Backend data contracts & StoredInquiry types
│
├── src/                                    # [FRONTEND DIRECTORY]
│   ├── main.tsx                            # React DOM entry point
│   ├── App.tsx                             # Master single-page app layout, navigation, and page router
│   ├── index.css                           # Global styles & Tailwind CSS @import
│   ├── types.ts                            # Shared TypeScript interfaces (ServiceType, InquiryFormData, CompanyInfo)
│   │
│   ├── api/
│   │   └── client.ts                       # Frontend API client (submitInquiryToBackend, fetchServices, healthCheck)
│   │
│   ├── components/
│   │   ├── Navbar.tsx                      # Top navigation bar, phone links, call-to-action button
│   │   ├── Footer.tsx                      # Corporate footer with address, services, GSTIN, and copyright
│   │   ├── InquiryForm.tsx                 # B2B inquiry form with validation, ticket ID & direct mail/WhatsApp dispatch
│   │   ├── InquiryModal.tsx                # Popup modal for instant service inquiry
│   │   └── pages/
│   │       ├── HomePage.tsx                # Hero banner, 6 services grid, credentials, client showcase
│   │       ├── AboutPage.tsx               # About Manya Enterprise, leadership (Nipul Mistry), facilities
│   │       ├── ServicesPage.tsx            # Complete catalog of 6 industrial services (including Bectofine)
│   │       ├── ProjectsPage.tsx            # Project showcase & industries served
│   │       ├── WhyChooseUsPage.tsx         # Differentiators, compliance, laboratory support
│   │       └── ContactPage.tsx             # Contact details, verified GSTIN, map info, and inquiry portal
│   │
│   ├── data/
│   │   └── companyData.ts                  # Static data source: company details, 6 services, clients, USPs
│   │
│   └── utils/
│       ├── inquiryMailer.ts                # Email and WhatsApp payload builders for direct dispatch
│       └── security.ts                     # Input sanitization, anti-bot timing trap, rate-limiting, CRLF guard
│
├── public/                                 # Static assets (favicons, public images)
├── .vscode/
│   ├── extensions.json                     # Recommended VS Code extensions (Tailwind, ESLint, Prettier)
│   └── settings.json                       # Formatter & editor preferences for VS Code
├── .env.example                            # Environment variables documentation (PORT=3000, NODE_ENV)
├── index.html                              # HTML entry point with title, OpenGraph tags, and SEO metadata
├── metadata.json                           # Applet configuration & metadata
├── package.json                            # Scripts ("dev": "tsx server.ts", "build": "vite build") & dependencies
├── tsconfig.json                           # TypeScript compiler configuration
├── vite.config.ts                          # Vite build tool and Tailwind CSS plugin configuration
└── README.md                               # Project documentation & setup instructions
```

---

## 🚀 How to Run in Visual Studio Code (VS Code)

### 1. Prerequisites
- **Node.js**: Version 18, 20, or newer ([Download Node.js](https://nodejs.org)).

---

### 2. Open the Project in VS Code
1. Export/download the project ZIP from AI Studio (**Settings / Menu** > **Export to ZIP** or **Export to GitHub**).
2. Extract the downloaded ZIP file to any folder on your computer.
3. Open **Visual Studio Code**.
4. Go to **File** > **Open Folder...** (or `Cmd+O` on macOS / `Ctrl+K Ctrl+O` on Windows).
5. Select the extracted folder.

---

### 3. Install Dependencies
Open the integrated terminal in VS Code (`Ctrl + ` `~` or **Terminal** > **New Terminal**), then run:

```bash
npm install
```

---

### 4. Start the Full-Stack Application
In the terminal, run:

```bash
npm run dev
```

This starts the Express backend server (via `tsx server.ts`) which automatically mounts the Vite frontend middleware.

You will see:
```text
Server started on http://0.0.0.0:3000 [development]
```

Open your browser to: **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Backend API Endpoints

The backend server exposes clean JSON API routes under `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status, uptime, timestamp |
| `GET` | `/api/services` | Complete catalog of the 6 industrial services |
| `GET` | `/api/services/:id` | Specific service detail by ID (e.g. `bectofine-culture`) |
| `GET` | `/api/company` | Company profile, GSTIN, phone numbers, and registered address |
| `GET` | `/api/inquiries` | List of submitted inquiries (latest first) |
| `GET` | `/api/inquiries/stats` | Inquiry statistics categorized by service |
| `POST` | `/api/inquiries` | Submit and validate new client inquiry (generates reference ticket ID) |

### Testing an API Endpoint
You can test the backend directly from your terminal or browser:
```bash
# Check server health
curl http://localhost:3000/api/health

# Check services catalog
curl http://localhost:3000/api/services

# Submit a test inquiry
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Client","phoneNumber":"+919998378352","emailAddress":"test@example.com","serviceRequired":"Bectofine","message":"Requesting bio-culture dosage consultation"}'
```

---

## 🛠 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the full-stack app (Express backend + Vite frontend) on `http://localhost:3000` |
| `npm run build` | Compiles frontend assets into production-ready `dist/` |
| `npm run start` | Starts the production server using `tsx server.ts` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs `tsc --noEmit` to verify all TypeScript types across frontend and backend |

---

## 💡 Recommended VS Code Extensions

When you open this folder in VS Code, it will automatically recommend:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier - Code Formatter** (`esbenp.prettier-vscode`)
