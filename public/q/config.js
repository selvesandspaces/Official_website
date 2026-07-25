// Client-specific configuration for the quiz pages in this folder.
// Each quiz writes to its own Google Sheet via its own Apps Script Web App.
// To repoint a quiz at a different sheet, replace the relevant URL below
// with that sheet's deployed Apps Script Web App /exec URL.
window.QUIZ_CONFIG = {
  SHORT_QUIZ_SHEETS_ENDPOINT: "https://script.google.com/macros/s/AKfycbyFJZi32Qa7nLPP-hnQu327Td4jsmk6_gSI8C7gycsIfF7UfFdz2LYE0UYkxuPCwUUIvw/exec",
  DHR_QUIZ_SHEETS_ENDPOINT: "https://script.google.com/macros/s/AKfycbysg_mJbl7_4nNjEqb_1PQ041vOEWn9UcOHXIirBQ4kcTOiBHvLJbWvcw6ne1l5UHU1/exec"
};
