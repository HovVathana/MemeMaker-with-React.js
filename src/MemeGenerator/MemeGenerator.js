import React, { useState } from "react";
import "./styles.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";

export const MemeGenerator = () => {
  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return (
    <div>
      <div>{url && <img alt="meme" src={url} />}</div>
      <div>
        <button onClick={() => history.push("/")}>
          <span>Make More Memes</span>
        </button>
        <button onClick={copyLink}>
          {copied ? <span>Link copied!</span> : <span>Copy link</span>}
        </button>
      </div>
    </div>
  );
};
