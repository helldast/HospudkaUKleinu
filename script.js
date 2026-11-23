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


 /* --- LÍSTEK: four strokes = four beers; the fifth beer crosses them and starts a new group --- */
 (function listek() {
   const MAX = 16;
   const box = document.getElementById('listekCarky');
   if (!box) return;
   const pocet = document.getElementById('listekPocet');
   const pridat = document.getElementById('listekPridat');
   const novy = document.getElementById('listekNovy');
   let n = 0;
   // a fixed slight wobble for each stroke, so it looks written by hand
   const wob = (i) => ((i * 37) % 7 - 3) * 0.5;
   const carka = (i) => {
     const k = i % 4, w = wob(i), w2 = wob(i + 3);
     return `M${11 + k * 10 + w} ${5 + w2}L${11 + k * 10 - w} ${37 + w}`;
   };
   const pres = (g) => `M3 ${33 + wob(g)}L49 ${9 + wob(g + 3)}`;
   const skloneni = (v) => (v === 1 ? '1 pivo' : v < 5 ? `${v} piva` : `${v} piv`);
   function kresli() {
     box.innerHTML = '';
     for (let g = 0; g * 4 < n; g++) {
       const paths = [];
       for (let i = g * 4; i < Math.min(n, g * 4 + 4); i++) paths.push(`<path d="${carka(i)}"${i === n - 1 ? ' class="nova"' : ''}/>`);
       if (n > g * 4 + 4) paths.push(`<path d="${pres(g)}"${n === g * 4 + 5 ? ' class="nova"' : ''}/>`);
       box.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 52 42">${paths.join('')}</svg>`);
     }
     pocet.textContent = n ? skloneni(n) : 'Zatím čistý';
     pridat.disabled = n >= MAX;
     novy.hidden = !n;
   }
   pridat.addEventListener('click', () => { if (n < MAX) { n++; kresli(); } });
   novy.addEventListener('click', () => { n = 0; kresli(); pridat.focus(); });
 })();

 /* --- pub dates: always Prague time, whatever the device says --- */
 const WEB = window.WEB || {};
 const $ = (id) => document.getElementById(id);
 const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
 const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
 const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d || '');
 const toDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
 const fmt = (iso, opts) => new Intl.DateTimeFormat('cs-CZ', { timeZone: 'UTC', ...opts }).format(toDate(iso));

 /* --- before the re-opening, the opening hours say from when --- */
 const opening = validDate(WEB.otevreni) ? WEB.otevreni : '';
 if (opening && today < opening) {
   const od = fmt(opening, { day: 'numeric', month: 'numeric', year: 'numeric' });
   document.querySelectorAll('.od-otevreni').forEach((el) => { el.textContent = ` (od ${od})`; });
 }

 /* --- MENU: everything comes from menu.js --- */
 (function menu() {
   const M = window.MENU || {};
   const kc = (c) => (c === '' || c == null ? '' : typeof c === 'number' ? `${c.toLocaleString('cs-CZ')}&nbsp;Kč` : esc(c));
   const plne = (sk) => (sk || []).filter((g) => g && g.skupina && (g.polozky || []).some((p) => p && p.nazev));
   const napoje = plne(M.napoje), jidlo = plne(M.jidlo);

   // chalkboard on the main page
   const tabule = $('tabuleList'), pivo = napoje.find((g) => g.tabule);
   if (tabule && pivo) {
     tabule.innerHTML = pivo.polozky.filter((p) => p && p.nazev).map((p) =>
       `<li><span class="t-name">${esc(p.nazev)}${p.popis ? ` <small>${esc(p.popis)}</small>` : ''}</span><span class="t-deg">${esc(p.stupen || '')}</span></li>`).join('');
   }

   // the menu page
   const boxN = $('menuNapoje'), boxJ = $('menuJidlo');
   if (!boxN || !boxJ) return;
   const slug = (s) => 'm-' + String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
   const skupina = (g) => `
     <div class="mskup" id="${slug(g.skupina)}">
       <h3 class="menu-h">${esc(g.skupina)}</h3>
       <div class="mlist${g.polozky.length >= 8 && !g.polozky.some((p) => p && kc(p.cena)) ? ' mlist-2' : ''}">${g.polozky.filter((p) => p && p.nazev).map((p) => {
         const detail = [p.popis, p.objem].filter(Boolean).join(' · ');
         const cena = kc(p.cena);
         return `
         <div class="mitem">
           <div>
             <div class="mitem-name">${esc([p.nazev, p.stupen].filter(Boolean).join(' '))}</div>
             ${detail ? `<div class="mitem-detail">${esc(detail)}</div>` : ''}
           </div>
           ${cena ? `<div class="mitem-price">${cena}</div>` : ''}
         </div>`;
       }).join('')}
       </div>
       ${g.poznamka ? `<p class="mskup-pozn">${esc(g.poznamka)}</p>` : ''}
     </div>`;
   boxN.innerHTML = napoje.map(skupina).join('');
   const brzy = (t) => `<p class="menu-brzy">${t}</p>`;
   boxN.innerHTML = napoje.length ? boxN.innerHTML : brzy('Nápojový lístek doplníme už brzy.');
   boxJ.innerHTML = jidlo.length ? jidlo.map(skupina).join('') : brzy('Jídelní lístek právě dokončujeme. Doplníme ho už brzy.');

   // the tally slip goes right under the beer
   const listek = document.querySelector('.listek');
   if (listek && pivo) $(slug(pivo.skupina)).after(listek);

   const vse = [...napoje.map((g) => [g, 'napoje']), ...jidlo.map((g) => [g, 'jidlo'])];
   if (vse.length > 1) $('menuSkok').innerHTML = vse.map(([g, col]) => `<a href="#${slug(g.skupina)}" data-col="${col}">${esc(g.skupina)}</a>`).join('');

   // phone: the Nápoje / Jídlo buttons show one list at a time; #napoje / #jidlo links open the right one
   const sec = $('menu'), tabs = [...document.querySelectorAll('.menu-tab')];
   const ukazMenu = (id, jak) => {
     sec.dataset.tab = id;
     tabs.forEach((t) => {
       const on = t.dataset.tab === id;
       t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
       if (on && jak === 'klavesa') t.focus();
     });
     if (!jak) return;
     history.replaceState(null, '', id === 'napoje' ? location.pathname : '#' + id);   // the default tab needs no #
     // scrolled down the other list: go back to the top of the menu
     const book = document.querySelector('.menu-book'), lista = document.querySelector('.menu-lista');
     const y = book.getBoundingClientRect().top + scrollY - lista.offsetHeight - nav.offsetHeight;
     if (scrollY > y) window.scrollTo({ top: y });
   };
   tabs.forEach((t, i) => {
     t.addEventListener('click', () => ukazMenu(t.dataset.tab, 'klik'));
     t.addEventListener('keydown', (e) => {
       const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
       if (k) { e.preventDefault(); ukazMenu(tabs[(i + k + tabs.length) % tabs.length].dataset.tab, 'klavesa'); }
     });
   });
   const h = location.hash.slice(1);
   ukazMenu(h === 'jidlo' || jidlo.some((g) => slug(g.skupina) === h) ? 'jidlo' : 'napoje');
   if (M.poznamka) { $('menuPozn').textContent = M.poznamka; $('menuPozn').hidden = false; }
 })();

 /* --- special events --- */
 const upcoming = (WEB.akce || [])
   .filter((a) => a && a.nazev && validDate(a.datum) && a.datum >= today)
   .sort((a, b) => a.datum.localeCompare(b.datum));
 (function drawEvents() {
   const box = $('akceObsah');
   if (!box) return;
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
         <button type="button" class="ev-plakat" id="evPlakat">Stáhnout plakát</button>
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

   const btn = $('evPlakat');
   btn.addEventListener('click', async () => {
     const label = btn.textContent;
     btn.disabled = true;
     btn.textContent = 'Připravuji…';
     try {
       await stahniPlakat(a);
       btn.textContent = label;
     } catch (err) {
       btn.textContent = 'Nepodařilo se, zkuste to znovu';
     } finally {
       btn.disabled = false;
     }
   });
 })();

 /* --- PLAKÁT: builds a poster image of an event in the browser --- */
 function nactiSkript(src) {
   return new Promise((ok, fail) => {
     if (window.PLAKAT_LOGA) return ok();
     const s = document.createElement('script');
     s.src = src; s.onload = ok; s.onerror = fail;
     document.head.append(s);
   });
 }
 function nactiObrazek(src) {
   return new Promise((ok, fail) => {
     const i = new Image();
     i.onload = () => ok(i); i.onerror = fail; i.src = src;
   });
 }
 function zalom(ctx, text, sirka) {
   const radky = [];
   let r = '';
   String(text).split(/\s+/).filter(Boolean).forEach((w) => {
     const t = r ? r + ' ' + w : w;
     if (r && ctx.measureText(t).width > sirka) { radky.push(r); r = w; } else r = t;
   });
   if (r) radky.push(r);
   return radky;
 }
 /* the largest size at which the text fits the width and the line limit */
 function vejdiSe(ctx, text, rodina, od, min, sirka, maxRadku) {
   let vel = od;
   for (; vel > min; vel -= 4) {
     ctx.font = `${rodina.replace('{}', vel)}`;
     const rr = zalom(ctx, text, sirka);
     if (rr.length <= maxRadku && rr.every((x) => ctx.measureText(x).width <= sirka)) return { vel, rr };
   }
   ctx.font = `${rodina.replace('{}', min)}`;
   return { vel: min, rr: zalom(ctx, text, sirka) };
 }
 async function stahniPlakat(a) {
   const W = 1200, H = 1600, M = 110, BREE = '{}px "Bree Serif", Georgia, serif', FIRA = '{}px "Fira Sans", system-ui, sans-serif';
   await nactiSkript('assets/plakat-loga.js');
   await Promise.all([document.fonts.load('80px "Bree Serif"', 'ěščřžýáíéůú'), document.fonts.load('40px "Fira Sans"', 'ěščřžýáíéůú')]);
   const [stit, zubr] = await Promise.all([nactiObrazek(window.PLAKAT_LOGA.stit), nactiObrazek(window.PLAKAT_LOGA.zubr)]);

   const c = document.createElement('canvas');
   c.width = W; c.height = H;
   const x = c.getContext('2d');
   const NAVY = '#1A1E3C', GOLD = '#EED687', GOLD2 = '#C59838';
   x.fillStyle = NAVY; x.fillRect(0, 0, W, H);
   x.strokeStyle = GOLD2; x.lineWidth = 6; x.strokeRect(36, 36, W - 72, H - 72);
   x.lineWidth = 2; x.strokeRect(52, 52, W - 104, H - 104);
   x.textAlign = 'center'; x.textBaseline = 'alphabetic';

   // shield and pub name
   const sW = 210, sH = sW * 456 / 416, sX = (W - sW) / 2, sY = 92;
   x.drawImage(stit, sX, sY, sW, sH);
   const lW = sW * 0.68;
   x.drawImage(zubr, sX + sW * 0.16, sY + sH * 0.12, lW, lW * 353.6 / 390.5);
   let y = sY + sH + 74;
   x.fillStyle = '#FFFFFF'; x.font = BREE.replace('{}', 54);
   x.fillText('Hospůdka u Kleinů', W / 2, y);

   // measure first, so the middle of the poster sits evenly whatever the text length
   const dole = H - 124;
   const nazev = vejdiSe(x, a.nazev, BREE, 96, 52, W - 2 * M, 2);
   const popis = a.popis ? vejdiSe(x, a.popis, FIRA, 44, 28, W - 2 * M, 4) : null;
   const meta = [a.cas, a.cena].filter(Boolean).join(' · ');
   const NAZ = nazev.vel * 1.14, POP = popis ? popis.vel * 1.32 : 0;
   const vyska = 60 + 210 + 84 + 44 + 58 + 50 + nazev.rr.length * NAZ
     + (popis ? 24 + popis.rr.length * POP : 0) + (meta ? 66 : 0);
   const volno = Math.max(0, dole - 50 - y - vyska);
   const mezera = volno / 4;
   y += mezera + 66;

   // date: weekday, big day, month
   x.fillStyle = '#FFFFFF'; x.font = BREE.replace('{}', 56);
   x.fillText(fmt(a.datum, { weekday: 'long' }), W / 2, y);
   y += 210;
   x.fillStyle = GOLD; x.font = BREE.replace('{}', 250);
   x.fillText(fmt(a.datum, { day: 'numeric' }), W / 2, y);
   y += 84;
   x.fillStyle = '#FFFFFF'; x.font = BREE.replace('{}', 66);
   x.fillText(fmt(a.datum, { day: 'numeric', month: 'long' }).replace(/^[\d.\s]+/, ''), W / 2, y);

   // tally mark
   y += 44 + mezera / 2;
   x.strokeStyle = GOLD2; x.lineWidth = 7; x.lineCap = 'round';
   const tx = W / 2 - 44;
   [[6, -2], [28, 2], [50, -1], [72, 2]].forEach(([p, w]) => { x.beginPath(); x.moveTo(tx + p + w, y); x.lineTo(tx + p - w, y + 58); x.stroke(); });
   x.beginPath(); x.moveTo(tx - 8, y + 46); x.lineTo(tx + 90, y + 10); x.stroke();
   y += 58 + 50 + mezera / 2;

   // name, details
   x.fillStyle = '#FFFFFF'; x.font = BREE.replace('{}', nazev.vel);
   y += nazev.vel * 0.72;
   nazev.rr.forEach((r) => { x.fillText(r, W / 2, y); y += NAZ; });
   if (popis) {
     x.fillStyle = 'rgba(255,255,255,.9)'; x.font = FIRA.replace('{}', popis.vel);
     y += 24 + popis.vel * 0.72 - NAZ * 0.28;
     popis.rr.forEach((r) => { x.fillText(r, W / 2, y); y += POP; });
   }
   if (meta) {
     x.fillStyle = GOLD; x.font = BREE.replace('{}', 42);
     x.fillText(meta, W / 2, y + 24);
   }
   x.fillStyle = 'rgba(255,255,255,.9)'; x.font = FIRA.replace('{}', 32);
   x.fillText('Dolní 2354/85, Ostrava-Zábřeh', W / 2, dole);

   const blob = await new Promise((ok, fail) => c.toBlob((b) => (b ? ok(b) : fail(new Error('toBlob'))), 'image/png'));
   const url = URL.createObjectURL(blob);
   const link = document.createElement('a');
   const slug = String(a.nazev).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
   link.href = url;
   link.download = `plakat-${slug || 'akce'}-${a.datum}.png`;
   document.body.append(link);
   link.click();
   link.remove();
   setTimeout(() => URL.revokeObjectURL(url), 10000);
 }

 /* --- news strip: always the next event, hidden when there is none --- */
 if (upcoming.length) {
   const next = upcoming[0];
   $('strip').hidden = false;
   $('strip').textContent = `${next.nazev} · ${fmt(next.datum, { weekday: 'long', day: 'numeric', month: 'long' })}`;
 } else {
   $('strip').hidden = true;
 }

 /* --- photos --- */
 const css = (f) => `url("${encodeURI(f)}")`;
 if (WEB.heroFoto && $('heroImg')) {
   $('heroImg').style.setProperty('--foto', css(WEB.heroFoto));
   if (WEB.heroFotoMobil) $('heroImg').style.setProperty('--foto-m', css(WEB.heroFotoMobil));
 }
 (WEB.fotky || []).slice(0, 3).forEach((f, i) => {
   const ph = document.querySelectorAll('#mozaika .ph')[i];
   if (!ph) return;
   ph.textContent = '';
   ph.style.setProperty('--foto', css(f.soubor));
   if (f.mobil) ph.style.setProperty('--foto-m', css(f.mobil));
   ph.setAttribute('role', 'img');
   ph.setAttribute('aria-label', f.popis || '');
 });

 /* --- contact: a blank value hides its row --- */
 if (WEB.telefon) {
   document.querySelectorAll('.js-tel').forEach((a) => {
     a.textContent = WEB.telefon;
     a.href = `tel:${WEB.telefon.replace(/[^0-9+]/g, '')}`;
   });
   document.querySelectorAll('.js-tel-row').forEach((r) => { r.hidden = false; });
 }
 if (WEB.email && $('linkMail')) {
   $('linkMail').textContent = WEB.email;
   $('linkMail').href = `mailto:${WEB.email}`;
   $('rowMail').hidden = false;
 }

 /* --- FORMS: table reservation and food order, both sent by email through Web3Forms --- */
 const formBox = document.querySelector('.form-box');
 if (formBox) {
   /* the two buttons switch which form is shown; #rezervace / #jidlo links open the right one */
   const tabs = [...document.querySelectorAll('.form-tab')];
   const ukaz = (id, fokus, start) => {
     tabs.forEach((t) => {
       const on = t.id === 'tab-' + id;
       t.setAttribute('aria-selected', on);
       t.tabIndex = on ? 0 : -1;
       $(t.getAttribute('aria-controls')).hidden = !on;
       if (on && fokus) t.focus();
     });
     document.querySelectorAll('[data-pro]').forEach((p) => { p.hidden = p.dataset.pro !== id; });
     if (!start) history.replaceState(null, '', id === 'rezervace' ? location.pathname : '#' + id);   // the default tab needs no #
   };
   tabs.forEach((t, i) => {
     t.addEventListener('click', () => ukaz(t.id.slice(4)));
     t.addEventListener('keydown', (e) => {
       const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
       if (k) { e.preventDefault(); ukaz(tabs[(i + k + tabs.length) % tabs.length].id.slice(4), true); }
     });
   });
   ukaz(location.hash === '#jidlo' ? 'jidlo' : 'rezervace', false, true);

   const forms = [...document.querySelectorAll('.pform')];
   document.querySelectorAll('.pform input[type="date"]').forEach((d) => d.setAttribute('min', today));

   /* no key yet: say so up front rather than after the visitor has typed */
   if (!WEB.formKlic) {
     forms.forEach((f) => f.querySelectorAll('input, select, textarea, button').forEach((el) => { el.disabled = true; }));
     const off = $('formOff');
     off.textContent = 'Rezervace a poptávky spouštíme už brzy.';
     const telLink = document.querySelector('.js-tel');
     if (WEB.telefon && telLink) {
       off.append(' Zatím nám prosím zavolejte na ');
       const tel = telLink.cloneNode(true);
       off.append(tel, '.');
     }
     off.hidden = false;
   }

   const DIKY = {
     rezForm: 'Děkujeme! Rezervaci jsme přijali. Ozveme se vám a potvrdíme ji.',
     orderForm: 'Děkujeme! Vaše poptávka byla odeslána. Ozveme se vám co nejdříve.'
   };
   forms.forEach((form) => {
     const btn = form.querySelector('.btn-send');
     const say = form.nextElementSibling;
     form.addEventListener('submit', async (e) => {
       e.preventDefault();
       say.classList.remove('show', 'bad');
       const label = btn.textContent;
       btn.disabled = true;
       btn.textContent = 'Odesílám…';
       try {
         // empty optional fields are left out of the email
         const { _subject, _honey, ...data } = Object.fromEntries([...new FormData(form)].filter(([, v]) => v !== ''));
         const res = await fetch('https://api.web3forms.com/submit', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
           body: JSON.stringify({
             access_key: WEB.formKlic,
             subject: _subject,
             from_name: 'Web Hospůdky u Kleinů',
             botcheck: _honey || '',          // filled only by bots
             ...(data.Email ? { replyto: data.Email } : {}),   // "Odpovědět" goes to the guest
             ...data
           })
         });
         const out = await res.json().catch(() => ({}));
         if (!res.ok || !out.success) throw new Error(out.message || res.status);
         form.reset();
         say.textContent = DIKY[form.id];
       } catch (err) {
         say.textContent = 'Odeslání se nepodařilo. Vaše údaje zůstaly ve formuláři, zkuste to prosím znovu.';
         say.classList.add('bad');
       } finally {
         say.classList.add('show');
         btn.disabled = false;
         btn.textContent = label;
       }
     });
   });
 }
