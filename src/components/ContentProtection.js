import { useEffect, useState } from "react";

const ContentProtection = () => {
  const [blurOverlay, setBlurOverlay] = useState(false);

  useEffect(() => {
    // Disable Right Click (Context Menu)
    const handleContextMenu = (e) => {
      if (
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable Image Dragging
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable Mobile Long-Press Image Save Callout
    let touchTimer = null;
    const handleTouchStart = (e) => {
      if (
        e.target.tagName === "IMG" ||
        (e.target.closest && e.target.closest("img"))
      ) {
        // Prevent default long press menu on mobile
        touchTimer = setTimeout(() => {
          if (e.cancelable) e.preventDefault();
        }, 200);
      }
    };

    const handleTouchEnd = () => {
      if (touchTimer) clearTimeout(touchTimer);
    };

    // Disable Copy, Cut & Select
    const handleCopyCutSelect = (e) => {
      if (
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        if (e.clipboardData) {
          e.clipboardData.setData("text/plain", "");
        }
        return false;
      }
    };

    // Keyboard Shortcuts Blocker & PrintScreen Protection
    const handleKeyDown = (e) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        setBlurOverlay(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Protected Content").catch(() => {});
        }
        setTimeout(() => setBlurOverlay(false), 2500);
        e.preventDefault();
        return false;
      }

      // Cmd / Ctrl combinations
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl) {
        const key = e.key ? e.key.toLowerCase() : "";
        // Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (View Source), Ctrl+C (Copy), Ctrl+X (Cut)
        if (
          key === "p" ||
          key === "s" ||
          key === "u" ||
          (key === "c" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") ||
          (key === "x" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA")
        ) {
          e.preventDefault();
          return false;
        }

        // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
        if (e.shiftKey && (key === "i" || key === "j" || key === "c")) {
          e.preventDefault();
          return false;
        }
      }

      // F12 key (DevTools)
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Mac Screenshot shortcuts: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5")) {
        setBlurOverlay(true);
        setTimeout(() => setBlurOverlay(false), 2500);
        e.preventDefault();
        return false;
      }
    };

    // Clear clipboard on PrintScreen keyup
    const handleKeyUp = (e) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Protected Content").catch(() => {});
        }
        setBlurOverlay(true);
        setTimeout(() => setBlurOverlay(false), 2500);
      }
    };

    // Mobile App Switcher, Page Hide & Screen Capture Focus Shield
    const handleBlur = () => {
      setBlurOverlay(true);
    };

    const handleFocus = () => {
      setBlurOverlay(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setBlurOverlay(true);
      } else {
        setBlurOverlay(false);
      }
    };

    const handlePageHide = () => {
      setBlurOverlay(true);
    };

    // Attach Event Listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);
    document.addEventListener("copy", handleCopyCutSelect);
    document.addEventListener("cut", handleCopyCutSelect);
    document.addEventListener("selectstart", handleCopyCutSelect);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("copy", handleCopyCutSelect);
      document.removeEventListener("cut", handleCopyCutSelect);
      document.removeEventListener("selectstart", handleCopyCutSelect);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className={`screen-protection-shield ${blurOverlay ? "is-active" : ""}`}
      aria-hidden={!blurOverlay}
    >
      <div className="shield-message-box">
        <svg width="40" height="40" fill="none" stroke="#F5E6CA" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3>PROTECTED PORTFOLIO CONTENT</h3>
        <p>Screen capture and copying are restricted. Click back to resume viewing.</p>
      </div>
    </div>
  );
};

export default ContentProtection;
