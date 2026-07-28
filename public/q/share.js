// Shared helper for the "shareable result" feature, used by both quiz pages.
// Encodes a small, privacy-safe result summary into the page's own URL so a
// share link can render a public recap without any backend involvement.
// Never put DOB, email, or raw per-question answers into a payload passed here.
window.QuizShare = (function () {
  function encode(obj) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decode(str) {
    try {
      const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (e) {
      return null;
    }
  }

  function buildShareUrl(payloadObj) {
    return location.origin + location.pathname + '?s=' + encode(payloadObj);
  }

  function getSharedPayload() {
    const params = new URLSearchParams(location.search);
    const s = params.get('s');
    return s ? decode(s) : null;
  }

  async function shareOrCopy(url, opts) {
    opts = opts || {};
    if (navigator.share) {
      try {
        await navigator.share({ title: opts.title || '', text: opts.text || '', url: url });
        return 'shared';
      } catch (e) {
        // user cancelled the native share sheet — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch (e) {
      return 'failed';
    }
  }

  return { encode, decode, buildShareUrl, getSharedPayload, shareOrCopy };
})();
