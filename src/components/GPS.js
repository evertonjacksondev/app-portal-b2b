

import React, { useEffect, useState } from 'react';

const GPS = () => {
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // O GPS está ligado
          setIsGPSEnabled(true);
        },
        error => {
          // O GPS está desligado
          setIsGPSEnabled(false);
        }
      );
    } else {
      // O navegador não suporta a API Geolocation
      setIsGPSEnabled(false);
    }
  }, []);

  return (
    <div>
      {isGPSEnabled ? (
        <p>O GPS está ligado.</p>
      ) : (
        <p>O GPS está desligado.</p>
      )}
    </div>
  );
};

export default GPS;
