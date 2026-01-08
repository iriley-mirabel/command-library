# Cursor Command Library - Web Portal

The Next.js web portal for the Cursor Command Library is now live!

## 🎉 Features

### Pages
- **Home (/)** - Welcome page with featured commands and quick links
- **Library (/library)** - Browse all 20+ commands with search and filtering
- **Command Detail (/command/[slug])** - Individual command pages with copy functionality
- **Install (/install)** - Complete installation guide

### Functionality
- ✅ Search commands by name, category, or purpose
- ✅ Filter by category
- ✅ Copy command markdown to clipboard
- ✅ Dark mode theme (Zinc/Slate)
- ✅ Responsive design
- ✅ Static site generation for fast performance

## 🚀 Running Locally

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

## 📦 Deployment

The app is ready to deploy to Vercel or any static hosting:

```bash
cd app
npm run build
```

### Deploy to Vercel

1. Push the repository to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set root directory to `app`
4. Deploy!

### Deploy to GitHub Pages

```bash
cd app
npm run build
# Configure GitHub Pages to serve from /docs or use gh-pages branch
```

## 🛠️ Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Gray Matter** - Markdown parsing

## 📁 Structure

```
app/
├── app/                   # Next.js app directory
│   ├── page.tsx          # Home page
│   ├── library/          # Library page
│   │   ├── page.tsx
│   │   └── LibraryClient.tsx
│   ├── command/[slug]/   # Dynamic command pages
│   │   ├── page.tsx
│   │   └── CopyButton.tsx
│   └── install/          # Installation guide
│       └── page.tsx
├── components/           # Reusable components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   └── CommandCard.tsx
├── lib/                  # Utility functions
│   └── commands.ts       # Command loading logic
└── public/              # Static assets
```

## 🎨 Design

- Dark mode by default (Zinc 950 background)
- Monospace font for command names
- Color-coded categories
- Speed indicators (Fast/Moderate/Slow)
- Responsive grid layouts

## 🔧 Customization

### Adding New Commands

Commands are automatically loaded from `../.cursor/commands/`. Just add a new `.md` file and it will appear in the portal.

### Styling

Update `app/globals.css` for theme changes or modify Tailwind config in `tailwind.config.ts`.

### Categories

Update the categories in `lib/commands.ts` to add or modify command categorization.

## 📝 Features Implemented

- [x] Home page with featured commands
- [x] Library page with search and filtering
- [x] Command detail pages
- [x] Installation guide
- [x] Copy to clipboard functionality
- [x] Responsive design
- [x] Dark mode theme
- [x] Static site generation
- [x] Category filtering
- [x] Speed indicators

## 🚧 Future Enhancements

- [ ] Download all commands as ZIP
- [ ] Command usage analytics
- [ ] Command ratings/favorites
- [ ] Team-specific command customization
- [ ] Command version history

## 📞 Support

For issues or questions, open an issue on [GitHub](https://github.com/iriley-mirabel/command-library).

---

**The web portal is ready to use!** Start the dev server and explore the commands.
