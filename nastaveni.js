/* ═══════════════════════════════════════════════════════════════
   NASTAVENÍ WEBU – kontakt, speciální akce a fotky se upravují tady.
   Text piš mezi uvozovky. Co necháš prázdné (""), na webu se nezobrazí.
   ═══════════════════════════════════════════════════════════════ */
window.WEB = {

  /* ── KONTAKT ───────────────────────────────────────────────────
     Na "email" chodí poptávky z formuláře. Dokud je prázdný, formulář
     je vypnutý. Po první poptávce přijde na tento e-mail od FormSubmit
     potvrzení, které je potřeba jednou odkliknout. */
  email: "",
  telefon: "",            // např. "+420 777 123 456"

  /* Datum znovuotevření. Do tohoto dne web ukazuje, že se otevírá. */
  otevreni: "2026-11-20",

  /* ── SPECIÁLNÍ AKCE ────────────────────────────────────────────
     Přidej nový blok do seznamu. Web je sám seřadí podle data
     a akce, které už proběhly, schová.

     Vzor:
     {
       nazev: "Makrela na grilu",
       datum: "2026-12-04",          // rok-měsíc-den
       cas: "od 16:00",              // nepovinné
       popis: "Čerstvá makrela z grilu, dokud nedojde.",   // nepovinné
       cena: "189 Kč",               // nepovinné
       foto: "assets/makrela.jpg"    // nepovinné
     },
  */
  akce: [
    {
      nazev: "Velké znovuotevření",
      datum: "2026-11-20",
      cas: "",
      popis: "Nový interiér, nová piva a první večer v novém.",
      cena: "",
      foto: ""
    }
  ],

  /* ── FOTKY ─────────────────────────────────────────────────────
     Nahraj fotky do složky assets a napiš sem jejich názvy.

     heroFoto = velká fotka v pozadí úvodní obrazovky.
     fotky    = tři fotky v sekci O hospůdce. Vzor:
     { soubor: "assets/vycep.jpg", popis: "Nový výčep" },
  */
  heroFoto: "",
  fotky: []
};
