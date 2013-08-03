
/**
 * Browser related operations.
 */
function browserTest(regex) { return regex.test(navigator.userAgent); }

function isIE() { return browserTest(/IE/); }

function isFirefox() { return browserTest(/Firefox/); }

function isSafari() { return browserTest(/Safari/); }

/* EOF */
