const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 dark:text-white bg-gray-200 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Wiki App. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Made with Mo'men ❤️ for knowledge sharing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;