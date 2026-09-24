const budget = document.querySelector('#budget');
const budgetValue = document.querySelector('#budget-value');
const motion = document.querySelector('#motion');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

budget.addEventListener('input', () => {
  const steps = Number(budget.value);
  document.documentElement.style.setProperty('--budget', `${steps / 9 * 100}%`);
  document.documentElement.style.setProperty('--duration', `${steps * 0.8}s`);
  budgetValue.textContent = `${steps} ${steps === 1 ? 'step' : 'steps'}`;
});
motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Resume animations' : 'Pause animations';
});
function respectMotionPreference() {
  motion.disabled = reducedMotion.matches;
  motion.textContent = reducedMotion.matches ? 'Reduced motion enabled' :
    document.body.classList.contains('paused') ? 'Resume animations' : 'Pause animations';
}
reducedMotion.addEventListener('change', respectMotionPreference);
respectMotionPreference();
