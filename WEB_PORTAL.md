# Web Portal - ✅ Now Available!

The Next.js web portal for browsing and searching commands is now live!

## 🎉 Features Implemented

### Pages
- ✅ **Home (/)** - Dashboard with featured "Most Used" commands and quick links
- ✅ **Library (/library)** - Grid view of all 20+ commands with search and filtering
- ✅ **Command Detail (/command/[id])** - Individual command pages with full details and copy functionality
- ✅ **Install (/install)** - Complete installation guide with code examples

### Features
- ✅ Search and filter commands by name, category, or purpose
- ✅ Copy command markdown to clipboard with one click
- ✅ Dark mode theme (Zinc 950 background)
- ✅ Developer-focused aesthetic
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Category-based filtering and organization
- ✅ Speed indicators (Fast/Moderate/Slow)
- ✅ Static site generation for optimal performance

### Technical Stack
- ✅ Next.js 15 (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Lucide React (icons)
- ✅ Gray Matter (markdown parsing)

## 🚀 Getting Started

### Run Locally

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

### Build for Production

```bash
cd app
npm run build
npm start
```

### Deploy to Vercel

1. Push the repository to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import the project
4. Set the root directory to `app`
5. Deploy!

The site will be live at `https://your-project.vercel.app`

## 📁 Project Structure

```
app/
├── app/                   # Next.js App Router
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── library/          # Library page
│   ├── command/[slug]/   # Dynamic command pages
│   └── install/          # Installation guide
├── components/           # Reusable UI components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   └── CommandCard.tsx
└── lib/                  # Utility functions
    └── commands.ts       # Command loading logic
```

## 🎨 Customization

### Theme
Edit `app/globals.css` to customize colors and styling.

### Categories
Update `lib/commands.ts` to modify command categorization.

### Content
Commands are automatically loaded from `../.cursor/commands/`. Add new `.md` files to see them in the portal.

## 🚧 Future Enhancements

- [ ] Download all commands as ZIP file
- [ ] Usage analytics
- [ ] Command ratings/favorites
- [ ] Command version history
- [ ] Team-specific customization

## 📸 Screenshots

### Home Page
Beautiful landing page with featured commands and quick access links.

### Library Page
Browse all commands with search and category filtering.

### Command Detail
View full command details with copy-to-clipboard functionality.

## 🆘 Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/iriley-mirabel/command-library)
- Check the [README](../README.md) for general documentation
- See [app/README.md](../app/README.md) for web portal specific docs

---

**The web portal is ready to use!** Visit http://localhost:3000 to explore.

