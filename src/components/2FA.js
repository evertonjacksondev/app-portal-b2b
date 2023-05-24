import React from 'react';
import QRCode from 'qrcode.react';

export const GoogleAuthenticatorQRCode = ({ secret, accountName, issuer = 'portalzeene' }) => {
   
    if(!secret) return null

    const otpauthURL = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(issuer)}`;
    console.log(otpauthURL)
    return (
        <QRCode value={otpauthURL} />
    );
};

