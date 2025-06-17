// Clock functionality
export const updateClock = () => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  document.getElementById("clock-display").textContent = time;
  setTimeout(updateClock, 1000);
};

// Initialize clock
export const initClock = () => {
  updateClock();
}; 