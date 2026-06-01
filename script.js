 /* --- navbar shadow on scroll --- */
 const nav = document.getElementById('nav');
 window.addEventListener('scroll', () => {
   nav.classList.toggle('up', window.scrollY > 8);
 }, { passive: true });

 /* --- hamburger / mobile drawer --- */
 const burger   = document.getElementById('burger');
 const mobMenu  = document.getElementById('mobMenu');
 burger.addEventListener('click', () => {
   burger.classList.toggle('open');
   mobMenu.classList.toggle('open');
 });
 function closeMob() {
   burger.classList.remove('open');
   mobMenu.classList.remove('open');
 }
 /* close drawer when clicking outside */
 document.addEventListener('click', (e) => {
   if (!burger.contains(e.target) && !mobMenu.contains(e.target)) closeMob();
 });

 /* --- menu tabs --- */
 function switchTab(e, id) {
   document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('on'));
   document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
   document.getElementById('tp-' + id).classList.add('on');
   e.currentTarget.classList.add('on');
 }

 /* --- order form UX ---
    Note: For real email delivery, replace action URL with your FormSubmit address.
    On first submit, FormSubmit will send a verification email to that address.
 */
 const orderForm   = document.getElementById('orderForm');
 const formSuccess = document.getElementById('formSuccess');

 /* Set minimum date on date input to today */
 const dateInput = document.getElementById('f-datum');
 if (dateInput) {
   const today = new Date().toISOString().split('T')[0];
   dateInput.setAttribute('min', today);
 }