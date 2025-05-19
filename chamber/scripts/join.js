/* ----------  TIMESTAMP  ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('timestamp').value = new Date().toISOString();

  /* card fade‑in stagger */
  document
    .querySelectorAll('.benefit-card')
    .forEach((card, i) =>
      card.animate(
        [{opacity:0, transform:'translateY(20px)'},
         {opacity:1, transform:'translateY(0)'}],
        {duration:500, delay:i*200, fill:'forwards', easing:'ease'}
      )
    );
});

/* ----------  MODALS  ---------- */
const openModal = level => {
  const modal = document.getElementById(`${level}-modal`);
  if(modal) modal.style.display = 'block';
};
const closeModal = level => {
  const modal = document.getElementById(`${level}-modal`);
  if(modal) modal.style.display = 'none';
};

document.addEventListener('click', e => {
  /* open buttons */
  if(e.target.matches('[data-open]')){
    openModal(e.target.dataset.open);
  }
  /* close click on ❌ */
  if(e.target.matches('.close')) closeModal(e.target.closest('.modal').id.replace('-modal',''));
  /* click outside modal */
  if(e.target.classList.contains('modal')) e.target.style.display='none';
});

/* ----------  MOBILE NAV  ---------- */
document.getElementById('hamburger')
  .addEventListener('click', () =>
    document.querySelector('.navigation').classList.toggle('show')
  );
