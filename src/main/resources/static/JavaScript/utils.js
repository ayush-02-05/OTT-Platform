// Escapes text before it is put inside HTML built with innerHTML / template strings.
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Reads the error message from a failed response.
// Works for plain text and for our JSON { status, message, timestamp }.
async function readErrorMessage(response, fallback) {
    const text = await response.text();
    try {
        return JSON.parse(text).message || fallback;
    } catch (e) {
        return text || fallback;
    }
}