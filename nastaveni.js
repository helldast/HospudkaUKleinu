/* ═══════════════════════════════════════════════════════════════
   NASTAVENÍ WEBU – kontakt, speciální akce a fotky se upravují tady.
   Text piš mezi uvozovky. Co necháš prázdné (""), na webu se nezobrazí.
   ═══════════════════════════════════════════════════════════════ */
window.WEB = {

  /* ── KONTAKT ───────────────────────────────────────────────────
     email    = e-mail, který se ukazuje v kontaktu
     formKlic = přístupový klíč z web3forms.com; rezervace a poptávky
                z formulářů chodí na e-mail, pro který byl klíč vytvořen.
                Dokud je prázdný, formuláře jsou vypnuté. */
  email: "hospudkaukleinu@seznam.cz",
  formKlic: "e991402a-7dbd-429a-930f-855e6dadaf71",
  telefon: "+420 721 003 707",

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
      popis: "Nový interiér a jednotná cena piva 38 Kč po celý víkend",
      cena: "",
      foto: ""
    },
    {
      nazev: "Kolena, saxofon a mistr za pípou",
      datum: "2026-12-11",
      cas: "",
      popis: "V pátek 11. 12. vám natočí mistr výčepní, zahraje živý saxofon a upečeme kolena. Stavte se.",
      cena: "",
      foto: ""
    }
  ],

  /* ── FOTKY ─────────────────────────────────────────────────────
     Nahraj fotky do složky assets a napiš sem jejich názvy.

     heroFoto = velká fotka v pozadí úvodní obrazovky.
     fotky    = tři fotky v sekci O hospůdce. Vzor:
     { soubor: "assets/vycep.jpg", mobil: "assets/vycep-m.jpg", popis: "Nový výčep" },
     mobil = nepovinná verze fotky na výšku pro telefon.
  */
  heroFoto: "assets/foto/lokal.jpg",
  heroFotoMobil: "assets/foto/lokal-m.jpg",
  fotky: [
    { soubor: "assets/foto/zahradka.jpg", mobil: "assets/foto/zahradka-m.jpg", popis: "Hospůdka zvenku s lavicemi pro sezení venku" },
    { soubor: "assets/foto/vycep.jpg",    mobil: "assets/foto/vycep-m.jpg",    popis: "Měděný výčep se Zubrem a Litovlí" },
    { soubor: "assets/foto/zed-zubr.jpg", mobil: "assets/foto/zed-zubr-m.jpg", popis: "Modrá stěna se znakem Zubru a dřevěné stoly" }
  ]
};
