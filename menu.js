/* ═══════════════════════════════════════════════════════════════
   MENU – nápoje a jídlo se upravují tady.
   Stránka Menu i tabule na úvodní stránce se vyplní samy.

   Jedna položka:
   { nazev: "Kofola", popis: "točená", objem: "0,5 l", cena: 45 },

   nazev   = název (povinný)
   popis   = krátký popis pod názvem (nepovinné)
   objem   = 0,5 l / 250 g / 10 ks (nepovinné)
   cena    = číslo v Kč, např. 45 (nepovinné; prázdné "" = cena se neukáže)
   stupen  = jen u piva, např. "12°"

   Skupina bez položek se na webu neukáže, takže prázdné skupiny
   můžou počkat, až se doplní.
   ═══════════════════════════════════════════════════════════════ */
window.MENU = {

  /* Poznámka pod menu. Prázdné "" = nezobrazí se. */
  poznamka: "Nový jídelní a nápojový lístek s cenami doplníme před otevřením. Nabídka se ještě může změnit.",

  /* ── NÁPOJE ──────────────────────────────────────────────────── */
  napoje: [
    {
      skupina: "Točené pivo",
      tabule: true,   // tahle skupina se píše i na tabuli na úvodní stránce
      polozky: [
        { nazev: "Zubr Grál",      stupen: "10°", popis: "",             objem: "", cena: "" },
        { nazev: "Zubr Grand",     stupen: "11°", popis: "",             objem: "", cena: "" },
        { nazev: "Zubr Gradus",    stupen: "12°", popis: "",             objem: "", cena: "" },
        { nazev: "Zubr Gradus",    stupen: "12°", popis: "Nefiltrovaný", objem: "", cena: "" },
        { nazev: "Litovel Gustav", stupen: "13°", popis: "Nefiltrovaný", objem: "", cena: "" },
        { nazev: "Litovel Černý",  stupen: "12°", popis: "Premium Dark", objem: "", cena: "" }
      ]
    },
    {
      skupina: "Nealkoholické nápoje",
      polozky: [
        // { nazev: "Kofola", popis: "točená", objem: "0,5 l", cena: 45 },
      ]
    },
    {
      skupina: "Káva a čaj",
      polozky: [
        // { nazev: "Espresso", popis: "", objem: "", cena: 45 },
      ]
    },
    {
      skupina: "Lihoviny",
      polozky: [
        // { nazev: "Slivovice", popis: "", objem: "0,04 l", cena: 60 },
      ]
    }
  ],

  /* ── JÍDLO ───────────────────────────────────────────────────── */
  jidlo: [
    {
      skupina: "Grilované speciality",
      poznamka: "Aktuální ceny a dostupnost zjistíte přímo u nás nebo telefonicky. Nabídka se může lišit dle dne.",
      polozky: [
        { nazev: "Pomalu pečené a zauzené koleno", popis: "Šťavnaté koleno uzené na dřevě",  objem: "", cena: "" },
        { nazev: "Žebra masitá",                   popis: "Poctivá masitá žebra z grilu",    objem: "", cena: "" },
        { nazev: "Kuřata",                         popis: "Celá grilovaná kuřata",           objem: "", cena: "" },
        { nazev: "Buffalo křídla",                 popis: "Pikantní křídla v buffalo omáčce", objem: "", cena: "" },
        { nazev: "Buffalo kuřecí špalíky",         popis: "Špalíky s buffalo marinádou",     objem: "", cena: "" }
      ]
    },
    {
      skupina: "Minutky",
      polozky: [
        { nazev: "Smažený sýr + hranolky",           popis: "Zlatavý smažený sýr s domácími hranolkami",    objem: "", cena: "" },
        { nazev: "Smažený hermelín + hranolky",      popis: "Křupavý smažený hermelín s hranolkami",        objem: "", cena: "" },
        { nazev: "Kuřecí řízek + americké brambory", popis: "Šťavnatý kuřecí řízek s americkými bramborami", objem: "", cena: "" }
      ]
    },
    {
      skupina: "Přílohy",
      polozky: [
        { nazev: "Hranolky velké",           popis: "",                         objem: "250 g", cena: "" },
        { nazev: "Hranolky BBQ Cheese",      popis: "S BBQ omáčkou a sýrem",    objem: "250 g", cena: "" },
        { nazev: "Cibulové kroužky",         popis: "Křupavé v těstíčku",       objem: "10 ks", cena: "" },
        { nazev: "Krokety",                  popis: "",                         objem: "250 g", cena: "" },
        { nazev: "Americké brambory",        popis: "",                         objem: "250 g", cena: "" },
        { nazev: "Americké brambory Cheese", popis: "Se sýrovou omáčkou",       objem: "250 g", cena: "" }
      ]
    }
  ]
};
