# FusionNote

FusionNote is a powerful, open-source note-taking app that seamlessly integrates with your favorite platforms. Built with modern web technologies, FusionNote is designed to be fast, intuitive, and flexible—empowering you to capture your ideas and organize your thoughts effortlessly.

## Features

- **Rich Text Editing:** Powered by Tiptap, FusionNote provides a feature-rich editing experience with support for images, placeholders, and more.
- **Modular UI Components:** Utilizes Radix UI components for accessible, customizable, and consistent interface elements.
- **Theming & Styling:** Easily customize the look and feel of your notes using Tailwind CSS and next-themes for dark/light mode support.
- **State Management & Data Fetching:** Leveraging React Query for robust data fetching and caching strategies.
- **Responsive Design:** Fully responsive design with support for dynamic layouts and interactive components.
- **Platform Integration:** Integrates seamlessly with platforms like Supabase for backend services and user authentication.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/fusionnote.git
   cd fusionnote
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or if using yarn:
   yarn install
   ```

## Development

FusionNote uses Vite as the development server and build tool, and TypeScript for type safety.

### Available Scripts

- **Start the Development Server:**

  ```bash
  npm run dev
  # or
  yarn dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  # or
  yarn build
  ```

- **Preview the Production Build:**

  ```bash
  npm run preview
  # or
  yarn preview
  ```

- **Lint the Code:**

  ```bash
  npm run lint
  # or
  yarn lint
  ```

### Code Structure

- **/src:** Contains the main source code including components, pages, and hooks.
- **/public:** Static assets used throughout the application.
- **/styles:** Tailwind CSS configuration and custom style sheets.
- **vite.config.js:** Configuration for Vite.
- **tsconfig.json:** TypeScript configuration.

## Customization

FusionNote is built with flexibility in mind:

- **UI Components:** Enhance or modify the UI by extending or replacing Radix UI components.
- **Editor Extensions:** Add or remove editor functionalities by configuring Tiptap extensions.
- **Theming:** Modify the theme or extend Tailwind CSS configurations in the project’s configuration files.
- **API Integration:** The project comes pre-configured with Supabase for backend services; update your Supabase keys in your environment variables as needed.

## Contributing

FusionNote welcomes contributions from the community. To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request detailing your changes.

For any major changes, please open an issue first to discuss what you would like to change.

## License

FusionNote is open-source software licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

FusionNote leverages several powerful libraries and frameworks:
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tiptap](https://tiptap.dev/)
- [Supabase](https://supabase.com/)
- [React Query](https://tanstack.com/query/latest)

---

This README provides an overview of FusionNote's capabilities, setup instructions, and guidelines for contributing. Customize it further based on your project specifics and any additional functionality you plan to include.