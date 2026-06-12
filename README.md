# Image Gallery WebApp

A modern, responsive image gallery application featuring a beautiful neomorphic design interface. Built as part of a hands-on internship, emphasizing real-world problem solving, performance optimization, and modern UI/UX practices.

![Image Gallery](https://img.shields.io/badge/Version-1.0.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E)

---

## 📖 Description

Image Gallery WebApp is a fully functional single-page application that allows users to upload, organize, and showcase their images with an elegant neomorphic UI. The application features local storage persistence, custom category management, drag-and-drop functionality, and a responsive grid layout that adapts to different screen sizes.

---

## ✨ Features

### Core Functionality
- **Image Upload**: Drag & drop or click-to-select file upload with preview
- **Local Storage Persistence**: All images and categories are saved in browser localStorage
- **Category Management**: 
  - Default categories: All, Nature, Personal, Work
  - Create custom categories dynamically
  - Delete custom categories
- **Image Filtering**: Filter gallery by category with active state indicators
- **Image Editing**: Modify title and category of existing images
- **Image Deletion**: Delete images with confirmation modal
- **Favorite System**: Mark images as favorites with heart icon toggle
- **Drag & Drop Reordering**: Reorder gallery items by dragging
- **Image Lightbox**: Full-screen modal view for images
- **Dark Mode**: Toggle between light and dark themes with neomorphic styling

### UI/UX Features
- **Neomorphic Design**: Soft shadows and depth effects throughout the interface
- **Responsive Layout**: 
  - 1 column on mobile
  - 2 columns on small screens
  - 3 columns on large screens
  - 4 columns on extra-large screens
- **Sticky Navigation**: Navigation bar stays visible while scrolling
- **Smooth Transitions**: All interactive elements have smooth hover and transition effects
- **Modal System**: Multiple modals for viewing, editing, deleting, and validation
- **Social Links**: Footer with Instagram, GitHub, and LinkedIn links
- **Validation**: User-friendly validation modal for missing image selection

---

## 🛠 Tech Stack

- **HTML5**: Semantic markup and structure
- **Tailwind CSS 3.4.19**: Utility-first CSS framework
- **PostCSS 8.5.14**: CSS post-processor
- **Autoprefixer 10.5.0**: CSS vendor prefixing
- **Vanilla JavaScript (ES6+)**: No frameworks, pure JavaScript logic
- **localStorage API**: Client-side data persistence

---

## 📁 Folder Structure

```
Image_Galary_App/
├── dist/
│   └── output.css          # Compiled CSS from Tailwind
├── src/
│   └── input.css           # Source CSS with Tailwind imports and custom styles
├── index.html              # Main HTML structure
├── script.js               # Application logic and interactivity
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file
└── README.md               # Project documentation
```

---

## 🔧 How It Works

### Application Logic (script.js)

1. **Initialization**: 
   - Loads images and custom categories from localStorage
   - Initializes dark mode (defaults to light)
   - Renders category filters and gallery
   - Sets up all event listeners

2. **Image Upload Flow**:
   - User drags & drops or clicks to select an image
   - File is validated (max 5MB, image type only)
   - Preview is displayed
   - User enters title and selects category
   - Image is converted to Base64 and stored in localStorage
   - Gallery re-renders with new image

3. **Category System**:
   - Default categories are always available
   - Custom categories can be added via "+ Add" button
   - Custom categories can be deleted with ❌ button
   - Categories are synced between filters and dropdowns

4. **Gallery Operations**:
   - **Filter**: Click category button to filter displayed images
   - **View**: Click image to open lightbox modal
   - **Edit**: Click edit button to modify title and category
   - **Delete**: Click delete button to remove image with confirmation
   - **Favorite**: Click heart button to toggle favorite status
   - **Reorder**: Drag image cards to reorder within current filter

5. **Dark Mode**:
   - Toggle button in navigation switches between light/dark themes
   - Neomorphic shadows adapt to theme
   - Preference is saved in localStorage

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js and npm installed on your machine

### Installation Steps

1. **Clone or download the repository**

2. **Navigate to the project directory**
   ```bash
   cd Image_Galary_App
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the CSS**
   - For development (with watch mode):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm run build
     ```

5. **Open the application**
   - Open `index.html` in your web browser
   - Or use a local server (e.g., Live Server in VS Code)

---

## 📖 Usage

### Adding Images
1. Click "Upload Your First Image" or scroll to the upload section
2. Drag & drop an image or click to select from your device
3. Preview will appear automatically
4. Enter a title for your image
5. Select a category (or create a custom one)
6. Click "Add to Gallery"

### Managing Images
- **View**: Click on any image to view it in full-screen mode
- **Edit**: Click the edit button to change title or category
- **Delete**: Click the delete button and confirm to remove the image
- **Favorite**: Click the heart button to mark as favorite
- **Reorder**: Drag images using the drag handle to reorder them

### Categories
- **Filter**: Click category buttons to filter the gallery
- **Add Custom**: Click "+ Add" button, enter name, press Enter
- **Delete Custom**: Click ❌ next to custom category to remove it

### Dark Mode
- Click the moon/sun icon in the navigation to toggle themes

---

## 📸 Screenshots

### Main Gallery View
![Gallery View](/assets/Img2.png)

### Upload Section
![Upload Section](/assets/Img1.png)

### Dark Mode
![Dark Mode](/assets/Img3.png)

---

## 🔮 Future Improvements

- [ ] Add image compression before storage to optimize localStorage usage
- [ ] Implement image search functionality
- [ ] Add bulk upload support
- [ ] Include image metadata display (dimensions, size, date)
- [ ] Add sorting options (by date, title, favorites)
- [ ] Implement export/import functionality for gallery data
- [ ] Add image editing capabilities (crop, rotate, filters)
- [ ] Include slideshow mode for gallery viewing
- [ ] Add support for multiple image selection
- [ ] Implement undo/redo for delete operations
- [ ] Add PWA support for offline usage
- [ ] Include analytics for user engagement tracking

---

## 👨‍💻 Author

**Krishanjit Chakraborty**

- [GitHub](https://github.com/codexxxx07)
- [LinkedIn](https://www.linkedin.com/in/krishanjit-chakraborty-258a5237a)
- [Instagram](https://www.instagram.com/_k_r_i_s_h_x_)

---

## 🧩 Internship Note

Built as part of a hands-on internship, emphasizing real-world problem solving, performance optimization, and modern UI/UX practices.

---

## 📄 License

This project is open source and available under the ISC License.

---

## 🙏 Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Neomorphic design inspiration from modern UI trends
- Open source community for valuable resources and tutorials

---

**© 2026 Krish | Built with ❤️ and Code | All Rights Reserved**
