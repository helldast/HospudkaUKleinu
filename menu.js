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
  poznamka: "Ceny doplníme už brzy.",

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

  /* ── JÍDLO ───────────────────────────────────────────────────
     Dokud tu nic není, stránka Menu píše "Jídelní lístek doplníme už brzy."
     Vzor:
     {
       skupina: "Grilované speciality",
       poznamka: "",   // nepovinné, krátká věta pod skupinou
       polozky: [
         { nazev: "Pečené koleno", popis: "uzené na dřevě", objem: "cca 1 kg", cena: 299 },
       ]
     },
  */
  jidlo: []
};
