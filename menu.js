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
  poznamka: "",

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
        { nazev: "Kofola", popis: "", objem: "", cena: "" },
        { nazev: "Royal Crown Cola", popis: "i bez cukru", objem: "", cena: "" },
        { nazev: "Targa Tonica", popis: "", objem: "", cena: "" },
        { nazev: "Vinea", popis: "", objem: "", cena: "" },
        { nazev: "Curiosa", popis: "pomeranč, jablko, jahoda", objem: "", cena: "" },
        { nazev: "Rajec", popis: "pramenitá voda", objem: "", cena: "" },
      ]
    },
    {
      skupina: "Víno",
      polozky: [
        { nazev: "Rozlévané víno", popis: "suché", objem: "", cena: "" },
        { nazev: "Rozlévané víno", popis: "polosuché", objem: "", cena: "" },
        { nazev: "Prosecco", popis: "", objem: "", cena: "" },
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
        { nazev: "Božkov Originál", popis: "tuzemský rum", objem: "", cena: "" },
        { nazev: "Božkov Peprmint", popis: "likér", objem: "", cena: "" },
        { nazev: "Stock Fernet", popis: "bylinný likér", objem: "", cena: "" },
        { nazev: "Stock Fernet Citrus", popis: "bylinný likér", objem: "", cena: "" },
        { nazev: "Stará myslivecká", popis: "", objem: "", cena: "" },
        { nazev: "Koniferum", popis: "borovička", objem: "", cena: "" },
        { nazev: "R. Jelínek Moravská hruška", popis: "", objem: "", cena: "" },
        { nazev: "Tatratea", popis: "52 %", objem: "", cena: "" },
        { nazev: "Beefeater", popis: "gin", objem: "", cena: "" },
        { nazev: "Sierra", popis: "tequila", objem: "", cena: "" },
        { nazev: "Metaxa 5*", popis: "brandy", objem: "", cena: "" },
        { nazev: "Ararat 5*", popis: "brandy", objem: "", cena: "" },
        { nazev: "Captain Morgan Spiced Gold", popis: "rum", objem: "", cena: "" },
        { nazev: "Planteray Original Dark", popis: "rum", objem: "", cena: "" },
        { nazev: "Republica", popis: "rum", objem: "", cena: "" },
        { nazev: "Bumbu", popis: "rum", objem: "", cena: "" },
        { nazev: "Don Papa Masskara", popis: "rum", objem: "", cena: "" },
        { nazev: "Barceló Gran Añejo", popis: "rum", objem: "", cena: "" },
        { nazev: "Jameson", popis: "irská whiskey", objem: "", cena: "" },
        { nazev: "Tullamore D.E.W.", popis: "irská whiskey", objem: "", cena: "" },
        { nazev: "Jim Beam", popis: "bourbon", objem: "", cena: "" },
        { nazev: "Johnnie Walker Red Label", popis: "skotská whisky", objem: "", cena: "" },
        { nazev: "Ballantine's Finest", popis: "skotská whisky", objem: "", cena: "" },
        { nazev: "Grant's", popis: "skotská whisky", objem: "", cena: "" },
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
