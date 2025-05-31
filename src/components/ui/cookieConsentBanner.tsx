"use client";

import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Affiche la bannière seulement si on n'a pas déjà de cookie de consentement
    const consent = Cookies.get("yourAppCookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const onAcceptCookies = () => {
    // Enregistre le consentement global
    Cookies.set("yourAppCookieConsent", "accepted", { expires: 365 });

    // Exemple : active un cookie analytics (à toi de l’adapter)
    Cookies.set("analytics", "enabled", { expires: 365 });

    console.log("Cookies accepted, analytics enabled");
    setShowBanner(false);
  };

  const onDeclineCookies = () => {
    Cookies.set("yourAppCookieConsent", "declined", { expires: 365 });

    // Ici tu pourrais aussi supprimer les cookies analytics si besoin
    Cookies.remove("analytics");

    console.log("Cookies declined, analytics disabled");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={onAcceptCookies}
      onDecline={onDeclineCookies}
      cookieName="yourAppCookieConsent"
      style={{ background: "#2B373B", color: "#FFF" }}
      buttonStyle={{ backgroundColor: "#4CAF50", color: "#FFF", fontSize: "14px" }}
      declineButtonStyle={{ backgroundColor: "#f44336", color: "#FFF", fontSize: "14px" }}
      expires={365}
    >
      This website uses cookies to enhance your experience. By using our website, you consent to the use of cookies. 
      You can read more in our <a href="/privacy-policy" className="underline">privacy policy</a>.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
