import React, { useEffect } from "react";

const ChatBot = ({ onInit }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;

    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "Chat with NmimsBot",
        "botConversationDescription": "Ask any questions related to your course!",
        "botId": "d4d594e3-521c-41c0-971c-84dd4e2201ec",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "d4d594e3-521c-41c0-971c-84dd4e2201ec",
        "webhookId": "a697f407-b7ab-4cec-b48a-f543cb5271a0",
        "lazySocket": true,
        "themeName": "prism",
        "frontendVersion": "v1",
        "showPoweredBy": false,
        "theme": "prism",
        "themeColor": "#162372"
      });

      // Invoke the onInit callback once initialized
      onInit();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onInit]);

  return <div id="botpress-webchat" />;
};

export default ChatBot;
