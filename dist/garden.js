const garden = document.querySelector('#flowers');
const button = document.querySelector('#bloom');
const statusText = document.querySelector('#status');
const flowers = [
  [27,245,-20,98], [72,258,19,98], [36,330,-12,112],
  [62,345,12,116], [49,390,-3,130], [43,240,-8,108], [57,265,7,112]
];
flowers.forEach(([x,height,lean,size], i) => {
  const flower = document.createElement('div');
  flower.className = 'flower';
  flower.style.cssText = `--x:${x}%;--h:${height}px;--lean:${lean}deg;--size:${size}px;--delay:${i * .3}s`;
  flower.innerHTML = '<div class="stem"><span class="leaf"></span><span class="leaf second"></span></div><span class="head">🌻</span>';
  garden.append(flower);
});
let blooming = false;
function bloom() {
  if (blooming) return;
  blooming = true;
  button.disabled = true;
  garden.classList.add('resetting');
  garden.classList.remove('blooming');
  void garden.offsetWidth;
  statusText.textContent = 'Las cosas más bonitas crecen con amor…';
  requestAnimationFrame(() => {
    garden.classList.remove('resetting');
    garden.classList.add('blooming');
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => {
    statusText.textContent = 'Thazita, tú haces más bonitos mis días. Te quiero ♡';
    button.innerHTML = 'Volver a florecer <span aria-hidden="true">✳</span>';
    button.disabled = false;
    blooming = false;
  }, reduced ? 0 : 6200);
}
button.addEventListener('click', bloom);
// Wait until the garden is visible, including on narrow phone screens.
const observer = new IntersectionObserver(entries => {
  if (entries.some(entry => entry.isIntersecting)) {
    observer.disconnect();
    bloom();
  }
}, { threshold: 0.25 });
observer.observe(garden);
