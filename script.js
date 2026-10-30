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

 /* --- pub dates: always Prague time, whatever the device says --- */
 const WEB = window.WEB || {};
 const $ = (id) => document.getElementById(id);
 const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
 const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
 const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d || '');
 const toDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
 const fmt = (iso, opts) => new Intl.DateTimeFormat('cs-CZ', { timeZone: 'UTC', ...opts }).format(toDate(iso));

 /* --- before the re-opening, say so; afterwards, the usual hero --- */
 const opening = validDate(WEB.otevreni) ? WEB.otevreni : '';
 if (opening && today < opening) {
   const od = fmt(opening, { day: 'numeric', month: 'numeric', year: 'numeric' });
   document.querySelectorAll('.od-otevreni').forEach((el) => { el.textContent = ` (od ${od})`; });
 } else {
   $('heroTitle').innerHTML = 'Hospůdka<br><em>u&nbsp;Kleinů</em>';
   $('heroBadge').textContent = 'Otevřeno denně 15:00 – 22:00';
 }

 /* --- special events --- */
 const upcoming = (WEB.akce || [])
   .filter((a) => a && a.nazev && validDate(a.datum) && a.datum >= today)
   .sort((a, b) => a.datum.localeCompare(b.datum));
 (function drawEvents() {
   const box = $('akceObsah');
   if (!upcoming.length) {
     box.innerHTML = '<p class="ev-none"><b>Další akci právě chystáme</b>Termíny tady najdete, jakmile budou jisté.</p>';
     return;
   }
   const [a, ...rest] = upcoming;
   const meta = [a.cas, a.cena].filter(Boolean).join(' · ');
   box.innerHTML = `
     <article class="ev-main${a.foto ? ' has-photo' : ''}">
       <div class="ev-date">
         <span class="ev-day">${fmt(a.datum, { day: 'numeric' })}</span>
         <span class="ev-mon">${fmt(a.datum, { month: 'long' })}<br>${fmt(a.datum, { weekday: 'long' })}</span>
       </div>
       <div>
         <h3 class="ev-name">${esc(a.nazev)}</h3>
         ${a.popis ? `<p class="ev-desc">${esc(a.popis)}</p>` : ''}
         ${meta ? `<p class="ev-meta">${esc(meta)}</p>` : ''}
       </div>
       ${a.foto ? `<img class="ev-photo" src="${esc(a.foto)}" alt="${esc(a.nazev)}" loading="lazy">` : ''}
     </article>
     ${rest.length ? `<div class="mlist ev-later">${rest.slice(0, 5).map((e) => `
       <div class="mitem">
         <div>
           <div class="mitem-name">${esc(e.nazev)}</div>
           <div class="mitem-detail">${esc([e.cas, e.cena].filter(Boolean).join(' · '))}</div>
         </div>
         <div class="mitem-price">${fmt(e.datum, { weekday: 'short', day: 'numeric', month: 'numeric' })}</div>
       </div>`).join('')}</div>` : ''}`;
 })();

 /* --- hero panel: the next special; the re-opening already fills the headline --- */
 const nextUp = upcoming.find((a) => a.datum !== opening || today >= opening);
 if (nextUp) {
   $('hpEvLbl').textContent = 'Příští akce';
   $('hpEvName').textContent = nextUp.nazev;
   $('hpEvDate').textContent = fmt(nextUp.datum, { weekday: 'long', day: 'numeric', month: 'numeric' });
 }

 /* --- photos --- */
 if (WEB.heroFoto) $('heroImg').style.backgroundImage = `url("${encodeURI(WEB.heroFoto)}")`;
 (WEB.fotky || []).slice(0, 3).forEach((f, i) => {
   const ph = document.querySelectorAll('#mozaika .ph')[i];
   ph.textContent = '';
   ph.style.backgroundImage = `url("${encodeURI(f.soubor)}")`;
   ph.setAttribute('role', 'img');
   ph.setAttribute('aria-label', f.popis || '');
 });

 /* --- contact: a blank value hides its row --- */
 if (WEB.telefon) {
   $('linkTel').textContent = WEB.telefon;
   $('linkTel').href = `tel:${WEB.telefon.replace(/[^\d+]/g, '')}`;
   $('rowTel').hidden = false;
 }
 if (WEB.email) {
   $('linkMail').textContent = WEB.email;
   $('linkMail').href = `mailto:${WEB.email}`;
   $('rowMail').hidden = false;
 }

 /* --- order form: sends by email through FormSubmit --- */
 const orderForm   = $('orderForm');
 const formSuccess = $('formSuccess');
 const formBtn     = $('formBtn');
 $('f-datum').setAttribute('min', today);

 function formSay(text, bad) {
   formSuccess.textContent = text;
   formSuccess.classList.toggle('bad', !!bad);
   formSuccess.classList.add('show');
 }

 /* no address yet: say so up front rather than after the visitor has typed */
 if (!WEB.email) {
   orderForm.querySelectorAll('input, select, textarea, button').forEach((el) => { el.disabled = true; });
   const off = $('formOff');
   off.textContent = 'Poptávky spouštíme už brzy.';
   if (WEB.telefon) {
     off.append(' Zatím nám prosím zavolejte na ');
     const tel = $('linkTel').cloneNode(true);
     tel.removeAttribute('id');
     off.append(tel, '.');
   }
   off.hidden = false;
 }

 orderForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   formSuccess.classList.remove('show');
   const label = formBtn.textContent;
   formBtn.disabled = true;
   formBtn.textContent = 'Odesílám…';
   try {
     const data = Object.fromEntries(new FormData(orderForm));
     const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(WEB.email)}`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
       body: JSON.stringify({ ...data, _template: 'table', _captcha: 'false' })
     });
     if (!res.ok) throw new Error(res.status);
     orderForm.reset();
     formSay('Děkujeme! Vaše poptávka byla odeslána. Ozveme se vám co nejdříve.');
   } catch (err) {
     formSay('Poptávku se nepodařilo odeslat. Vaše údaje zůstaly ve formuláři, zkuste to prosím znovu.', true);
   } finally {
     formBtn.disabled = false;
     formBtn.textContent = label;
   }
 });
