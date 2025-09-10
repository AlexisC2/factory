import React, { useState, useEffect } from 'react';

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
      <p className="text-sm mb-2">Install Digital Product Studio for a better experience!</p>
      <button
        onClick={handleInstallClick}
        className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
      >
        Install
      </button>
    </div>
  );
};

export default PWAInstallPrompt;