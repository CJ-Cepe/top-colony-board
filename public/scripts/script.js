const hamBtn = document.querySelector(".ham-btn");
const asideMenu = document.querySelector(".page-aside");
const media = window.matchMedia("(max-width: 685px)");

// === helpers ===

function setHamBtnProps(isExpanded) {
  hamBtn.setAttribute("aria-expanded", isExpanded);
}

function setAsideMenuProps(isAbsPositioned, isVisibleClassActive, isInert) {
  isAbsPositioned
    ? asideMenu.classList.add("abs")
    : asideMenu.classList.remove("abs");
  isVisibleClassActive
    ? asideMenu.classList.add("visible")
    : asideMenu.classList.remove("visible");
  isInert
    ? asideMenu.setAttribute("inert", "")
    : asideMenu.removeAttribute("inert");
}

// sync hamburger yummy & aside
// based on viewport & hamBtn
function syncMenuState() {
  const isMobileViewport = media.matches;
  const isHamBtnExpanded = hamBtn.getAttribute("aria-expanded") === "true";

  if (!isMobileViewport) {
    // desktop
    // state 0, 3, 4 - revert to default
    setHamBtnProps(false); // Reset aria-expanded
    setAsideMenuProps(false, false, false);
  } else {
    // mobile
    if (isHamBtnExpanded) {
      // state 2 (open)
      setHamBtnProps(true);
      setAsideMenuProps(true, true, false);
    } else {
      // state 1 (close)
      setHamBtnProps(false);
      setAsideMenuProps(true, false, true);
    }
  }
}

// === listeners ===

// 1. set initial state on page load
document.addEventListener("DOMContentLoaded", syncMenuState);

// 2. handle screen width changes
media.addEventListener("change", syncMenuState);

// 3. handle hamburger button click
hamBtn.addEventListener("click", () => {
  const currentAriaExpanded = hamBtn.getAttribute("aria-expanded") === "true";
  hamBtn.setAttribute("aria-expanded", !currentAriaExpanded);
  syncMenuState();
});

/* 
State 0 default - width > 685
 - hamBtn [aria-expand = false] [visible - false]
 - asideMenu [mode - rel] [visible - true] [not inert]

State 1 close - width <= 685
 - hamBtn [aria-expand = false]
    - asideMenu [mode - abs] [visible - false] [inert]

State 2 open - width <= 685
 - hamBtn [aria-expand = true]
    - asideMenu [mode - abs] [visible - true] [not inert]

State 3 - resized while open
 - hamBtn [aria-expand = true] -> false
    - asideMenu [mode - abs] [visible - true] [not inert] -> [mode - rel] [visible - true] [not inert]

State 4 - resize while closed
 - hamBtn [aria-expand = false] -> false
    - asideMenu [mode - abs] [visible - false] [inert] -> [mode - rel] [visible - true] [not inert]
*/
