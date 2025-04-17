import React from "react";

const Footer: React.FC = () => {
  const siteVersion = "0.0.1-ALPHA";
  const apiVersion = "0.0.1-ALPHA";
  const siteName = "History Project";
  const loadTime = `${performance.now().toFixed(2)}ms`;

  return (
    <footer className="bg-emerald-800 text-white py-4 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="font-bold">{siteName}</p>
          <p>Site Version: {siteVersion}</p>
          <p>API Version: {apiVersion}</p>
          <p>Load Time: {loadTime}</p>
        </div>
        <div className="text-center md:text-right">
          <p>&copy; 2025 Artūrs Zītars. All rights reserved.</p>
          <div className="flex justify-center md:justify-end space-x-4 mt-2">
            <a
              href="https://github.com/DhlDeliveryMan/history-proj-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Frontend Repo
            </a>
            <a
              href="https://github.com/DhlDeliveryMan/history-proj-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Backend Repo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
