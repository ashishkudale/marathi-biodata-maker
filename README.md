# Marathi Biodata Maker

A modern web application for creating beautiful Marathi matrimonial biodatas.

## Phase 1 Setup Complete ✅

### What's Been Configured:

1. **Next.js 15** with TypeScript and Tailwind CSS
2. **Firebase** integration (Firestore, Auth, Storage)
3. **Marathi Fonts** - Baloo Bhai 2, Mukta, and Tiro Devanagari Marathi
4. **Core Dependencies**:
   - Zustand (State management)
   - Framer Motion (Animations)
   - React PDF Renderer (PDF generation)
   - React Icons

### Project Structure:

```
src/
├── app/
│   ├── page.tsx (Landing page)
│   ├── create/
│   │   └── page.tsx (Biodata creator)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── BiodataForm/
│   ├── TemplatePreview/
│   ├── TemplateSelector/
│   └── UI/
├── lib/
│   ├── firebase.ts
│   ├── store.ts (Zustand store - to be created)
│   └── types.ts
├── templates/
│   └── (template configurations - to be created)
└── utils/
    └── pdfGenerator.ts (to be created)
```

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Features (Planned)

- ✅ Responsive design with Marathi font support
- ⏳ Multiple biodata templates (Traditional, Modern, Minimal)
- ⏳ Form-based biodata creation
- ⏳ Real-time preview
- ⏳ PDF download functionality
- ⏳ Firebase storage integration
- ⏳ Photo upload support

## Next Steps

Phase 2 will implement:
- Zustand store for state management
- Biodata form components
- Template selector
- Real-time preview functionality

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **PDF Generation**: @react-pdf/renderer
