// Source: DILG Barangay Officials Directory, https://dilg.gov.ph/barangay-officials-directory

export interface BarangayOfficial {
  name: string
  position: string
}

export interface BarangayOfficials {
  officials: BarangayOfficial[]
  contact: string | null
}

export const officialsRetrieved = "11 November 2026"

export const officialsSource = 'https://dilg.gov.ph/barangay-officials-directory'

export const barangayOfficials: Record<string, BarangayOfficials> = {
 "aguinaldo": {
  "officials": [
   {
    "name": "Eduardo B. Calderon",
    "position": "Punong Barangay"
   },
   {
    "name": "Wilfredo C. Ortiz",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Decoroso M. Baniega Sr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elsie P. Calderon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Liza O. Notado",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Manuel B. Eneria",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jomar V. Pangandoyon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Leodolfo C. Fortuno Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jonel Paul A. Candelario",
    "position": "SK Chairperson"
   },
   {
    "name": "Shiryl J. Custorio",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "airport-village": {
  "officials": [
   {
    "name": "Ronald T. Paredes",
    "position": "Punong Barangay"
   },
   {
    "name": "Milagros B. Magalana",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Emma A. Pelonia",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Virgilio L. Abanilla",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Lucio C. Aseo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Josh Cyril T. Plamara",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Val L. Adlawan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Danilo L. Saludario",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dainace Ghelssy C. Verbo",
    "position": "SK Chairperson"
   }
  ],
  "contact": null
 },
 "baybay": {
  "officials": [
   {
    "name": "Hilda A. Diano",
    "position": "Punong Barangay"
   },
   {
    "name": "Elmer V. Edria",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Enrico A. Dizon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rovel R. Florano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nila M. Felicano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edna M. Aleria",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jose G. Furio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Sebastian E. Desoacido",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aizel P. Desoacido",
    "position": "SK Chairperson"
   },
   {
    "name": "Marian O. Danque",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0949-696-0557"
 },
 "bocsol": {
  "officials": [
   {
    "name": "Jose A. Salanguste",
    "position": "Punong Barangay"
   },
   {
    "name": "Alvin S. Guanzon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "David L. Padida",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Emerita G. Benesisto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ramel G. Medice",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jennifer F. Balatucan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jonathan T. Bayabay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marlo V. Sales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ginalyn B. Domagtoy",
    "position": "SK Chairperson"
   },
   {
    "name": "Joan A. Tolitol",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "cabayhan": {
  "officials": [
   {
    "name": "Lazaro A. Moreno",
    "position": "Punong Barangay"
   },
   {
    "name": "Genalyn D. Nebrida",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Francisco S. Patilan Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ramil L. Balbarosa",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Analyn T. Moreno",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mercuela E. Escalante",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Fortunato S. Gallano III",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Leonardo A. Jabonite",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jeremy P. Eva",
    "position": "SK Chairperson"
   },
   {
    "name": "Marivic D. Delorino",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "cag-abaca": {
  "officials": [
   {
    "name": "Elmer B. Franzuela",
    "position": "Punong Barangay"
   },
   {
    "name": "Zenaida S. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Zaldy G. Salvador",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edwin G. Villanueva",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Federico B. Capawing",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Alejandro P. Carias",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gerry C. Napao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elito C. Castillo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joshua C. Cardenas",
    "position": "SK Chairperson"
   },
   {
    "name": "Jerome O. Capawing",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "cal-igang": {
  "officials": [
   {
    "name": "Edna P. Empon",
    "position": "Punong Barangay"
   },
   {
    "name": "Lolita M. Legarse",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jason L. Salindayao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edilberto D. Panarigan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aida T. Martines",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Justiano M. Delorino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gloria A. Marquez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Siony F. Delorino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edrian C. Velacio",
    "position": "SK Chairperson"
   },
   {
    "name": "Arvin B. Delorino",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "cawayan": {
  "officials": [
   {
    "name": "Buenaventura F. Galit Jr.",
    "position": "Punong Barangay"
   },
   {
    "name": "Nelson G. Omanito",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Conrad Rey M. Camposano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Raquel T. Balleta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Evelyn F. Galit",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jenneth T. Villanueva",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Raul E. Foster",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Evelyn L. Balleta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gwenberth I. Omanito",
    "position": "SK Chairperson"
   },
   {
    "name": "Melanie L. Gorgona",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0930-935-2552"
 },
 "cervantes": {
  "officials": [
   {
    "name": "Federico T. Oliveros Jr.",
    "position": "Punong Barangay"
   },
   {
    "name": "Gil C. Mangado Sr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joseph D. Degamhon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rosa D. De Rafael",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Michael T. Francisco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Eduardo A. Trongcoso Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Sim M. Ongsotto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ricardo T. Acero III",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joseph P. Degamhon Jr.",
    "position": "SK Chairperson"
   },
   {
    "name": "Sharon T. Trongcoso",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0930-662-2711"
 },
 "cularima": {
  "officials": [
   {
    "name": "Caryl B. Castillo",
    "position": "Punong Barangay"
   },
   {
    "name": "Ruth C. Diano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Efren C. Catunhay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marites P. Moreno",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Loel B. Villanueva",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jimmy M. Laureano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dolores M. Porton",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jerry C. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jake C. Bocboc",
    "position": "SK Chairperson"
   },
   {
    "name": "Cornelia B. Franzuela",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "daganas": {
  "officials": [
   {
    "name": "Digna S. Fulgar",
    "position": "Punong Barangay"
   },
   {
    "name": "Edmon M. Fulgar",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dionesio M. Bello",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edgar A. Caporal",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Erlinda G. Desoloc",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Pedrito D. Bernabe",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ariel M. Abuke",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ma. Josefa M. Senobio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Anthony Ceasar S. Leano",
    "position": "SK Chairperson"
   },
   {
    "name": "Jovelyn N. Avestruz",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0955-558-8755"
 },
 "galutan": {
  "officials": [
   {
    "name": "Rogelio D. Leano",
    "position": "Punong Barangay"
   },
   {
    "name": "Jonathan A. Cuanico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Arlene D. Leano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gabriel Angelo G. Arceno",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jay Ar C. Gajutos",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Irene O. Gajutos",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Eduardo M. Enano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gilbert S. Biado",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Merlen P. Leano",
    "position": "SK Chairperson"
   },
   {
    "name": "Fe D. Fulgar",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "malvar": {
  "officials": [
   {
    "name": "Simon Peter D. Oserraos",
    "position": "Punong Barangay"
   },
   {
    "name": "Joan C. Ecarma",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edwin C. Baloja",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Chona D. Prieto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Danny M. Lamigan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Bella C. Biado",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ricardo A. Argenio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Eleazar E. Moreno",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Necole O. Castillo",
    "position": "SK Chairperson"
   },
   {
    "name": "Nena T. Catunhay",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "guba": {
  "officials": [
   {
    "name": "Renato M. Ansermo",
    "position": "Punong Barangay"
   },
   {
    "name": "Jeffrey T. Moscare",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edgar M. Calumpiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Michael M. Largo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rosie G. Pajarito",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joel B. Taneo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Wilfredo I. Carias Sr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Cesar M. Capales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Randy F. Carias",
    "position": "SK Chairperson"
   },
   {
    "name": "Mary Grace T. Ancermo",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "gebalagnan": {
  "officials": [
   {
    "name": "Jocelyn M. Lobesto",
    "position": "Punong Barangay"
   },
   {
    "name": "Samuel M. Goco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ronel M. Lendero",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elvis A. Ladeño",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Noel C. Ladeno",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Irene B. Basiloy",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Luisa A. Lendero",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ronalyn R. Deliqueña",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mylene S. Sorio",
    "position": "SK Chairperson"
   },
   {
    "name": "Maricel G. Nalazon",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0963-584-0628"
 },
 "gibulwangan": {
  "officials": [
   {
    "name": "Dominador V. Senining",
    "position": "Punong Barangay"
   },
   {
    "name": "Niño L. Gonzaga",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ricardo B. Dulay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rogelio M. Saludario",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Connie E. Delorino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Niagara L. Capela",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Renie C. Delorino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Carina B. Delorino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Henry D. Delorino Jr.",
    "position": "SK Chairperson"
   }
  ],
  "contact": null
 },
 "dona-pulqueria": {
  "officials": [
   {
    "name": "Chona R. Buban",
    "position": "Punong Barangay"
   },
   {
    "name": "Danilo C. Balleta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Michael L. Atencio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Arnold T. Dela Cruz",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Lito Basierto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marilyn S. Selencio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nelvin B. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mary Joy C. Capawing",
    "position": "SK Chairperson"
   },
   {
    "name": "Liezel O. Andales",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "hinatad": {
  "officials": [
   {
    "name": "Nelcar D. Olesco",
    "position": "Punong Barangay"
   },
   {
    "name": "Pablo T. Agte",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Led O. Deleon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Alexander T. Escario",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marita O. Sumayop",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ma. Teresa O. Otac",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Crisaldo O. Sumayop",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marita O. Sumayop",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Frecious Joy J. Saraspi",
    "position": "SK Chairperson"
   },
   {
    "name": "Rosario C. Acebron",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "imelda": {
  "officials": [
   {
    "name": "Eduardo P. Fuesto Jr.",
    "position": "Punong Barangay"
   },
   {
    "name": "Felipe T. Laodenio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jose B. Doria",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Anunciation B. Dones",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ryan P. Florencio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Randy L. Dapulag",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Maria. Nikka De Guia",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elsie F. Ymata",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mark Royet P. Basarte",
    "position": "SK Chairperson"
   },
   {
    "name": "Jovey B. Ymata",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "liberty": {
  "officials": [
   {
    "name": "Lito A. Benesisto",
    "position": "Punong Barangay"
   },
   {
    "name": "Lester T. Saronias",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Salve C. Diano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marben L. Alejandro",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aljon F. Alejandro",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ric T. Catunhay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Randy S. Brenzuela",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joel T. Trongcoso",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "John Mark S. Atencio",
    "position": "SK Chairperson"
   },
   {
    "name": "Jobelyn N. Alejandro",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "libjo": {
  "officials": [
   {
    "name": "Ferdinand F. Gordo",
    "position": "Punong Barangay"
   },
   {
    "name": "Fe M. Goco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Josie G. Esponilla",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marifel S. Goco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Daren C. Espallardo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Roger A. Comedia",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Beverlyn C. Gallano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Cayetano B. Ambe",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jemimah Y. Cabales",
    "position": "SK Chairperson"
   },
   {
    "name": "Marlon M. Salazar",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "mabini": {
  "officials": [
   {
    "name": "Victor M. Tamoyang",
    "position": "Punong Barangay"
   },
   {
    "name": "Ignacio P. Lagrimas Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jonalyn L. Congayao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Emelio T. Jaldo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Norberto N. Loberiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Christopher G. Congayao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Erwin L. Meregildo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edmon C. Meregildo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ervin T. Jaldo",
    "position": "SK Chairperson"
   },
   {
    "name": "Jerma D. Saludario",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "macagtas": {
  "officials": [
   {
    "name": "Beatriz N. Amande",
    "position": "Punong Barangay"
   },
   {
    "name": "Marilyn S. Cornico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jaime E. Diaz",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joana B. Lobesto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Manuel L. Gajana",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ricky S. Doroga",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "James D. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Emma C. Cuaderno",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Reca D. Cornico",
    "position": "SK Chairperson"
   },
   {
    "name": "Maria Linda C. Carig-On",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "mckinley": {
  "officials": [
   {
    "name": "Pacita I. Argenio",
    "position": "Punong Barangay"
   },
   {
    "name": "Fatima C. Dorico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Amador A. Amaranto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Panchito M. Andales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Pedro B. Cajicom Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Bernardine C. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Maribel D. Cuanico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rosel O. Enaje",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Allan L. Barcelon Jr.",
    "position": "SK Chairperson"
   },
   {
    "name": "Macartur P. Carduce",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "new-rizal": {
  "officials": [
   {
    "name": "Elvin L. Napao",
    "position": "Punong Barangay"
   },
   {
    "name": "Jonathan S. Denolasco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marita C. Dalmacion",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edwin L. Cornico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Estanislao S. Sagorio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Segundino D. Caguerhab",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Liberato C. Gonzaga",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Bonifacio M. Carias Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rex P. Sagorio",
    "position": "SK Chairperson"
   },
   {
    "name": "Oscar F. Diano",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "old-rizal": {
  "officials": [
   {
    "name": "Estanislao De Silva Jr.",
    "position": "Punong Barangay"
   },
   {
    "name": "Cyril V. Dadia",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Armando D. Mollejon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ruby R. Abrera",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Randy S. Catucod",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ronante E. Diaz",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rogelio O. Torres",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ramcil B. Tagros",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Julius E. Mendador",
    "position": "SK Chairperson"
   },
   {
    "name": "Lorena A. Nebrida",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "paticua": {
  "officials": [
   {
    "name": "Merlyn C. Saludario",
    "position": "Punong Barangay"
   },
   {
    "name": "Maricel C. Manlangit",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jessabel C. Uy",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gemma L. Lico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "John Vincent C. Convocar",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nelma L. Meregildo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jocelle D. Lamberte",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jocelle D. Lamberte",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jonas A. Lamberte",
    "position": "SK Chairperson"
   },
   {
    "name": "Ramil B. Cardiño",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "polangi": {
  "officials": [
   {
    "name": "Joephel R. Ogayre",
    "position": "Punong Barangay"
   },
   {
    "name": "Alvin A. Bedeo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ronie G. Ng",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Romulo O. Brenzuela Sr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mary Joy Maningcay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Carlito A. Lim",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Fernando C. Bedeo Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Reymond E. Lim",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Wency C. Muncada",
    "position": "SK Chairperson"
   },
   {
    "name": "Tirso C. Cerenio",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "quezon": {
  "officials": [
   {
    "name": "Severino L. Querobines",
    "position": "Punong Barangay"
   },
   {
    "name": "Marlon D. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ronie P. Perez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jake L. Centino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Alma Andrande",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jona C. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Cathy G. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marjorie D. Eito",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Merwelle C. Caalim",
    "position": "SK Chairperson"
   },
   {
    "name": "Reyjean M. Vicario",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "salvacion": {
  "officials": [
   {
    "name": "Aldrid B. Dimakiling",
    "position": "Punong Barangay"
   },
   {
    "name": "John A. Caguerhab",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Myrna G. Manzon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Pascual B. Dimakiling",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Arnoldo B. Golondrina",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Judy-Ann M. Catalan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aimee G. Loberiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dionesio F. Napao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rosielyn D. Senocbit",
    "position": "SK Chairperson"
   },
   {
    "name": "Rona G. Dimakiling",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "san-julian": {
  "officials": [
   {
    "name": "Sanny D. Caguerhab Sr.",
    "position": "Punong Barangay"
   },
   {
    "name": "Socorro C. Pajarito",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jovy B. Alastoy",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Richard A. Caguerhab",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Virgita F. Obrino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rex B. Catalan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Bobby C. Aguilando Sr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Alvin F. Caguerhab",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nelgine C. Pajarito",
    "position": "SK Chairperson"
   },
   {
    "name": "Shenny J. Caranog",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "somoge": {
  "officials": [
   {
    "name": "Bonifacio P. Arnio",
    "position": "Punong Barangay"
   },
   {
    "name": "Clyde E. Cablay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Louie T. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gemma D. Basierto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Lovely G. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Lito T. Aguilando",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Albert N. Barandino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Wenifredo T. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ma. Zenny B. Abendaño",
    "position": "SK Chairperson"
   },
   {
    "name": "Analyn B. Dalmacion",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "tinowaran": {
  "officials": [
   {
    "name": "Wilfredo C. Salazar",
    "position": "Punong Barangay"
   },
   {
    "name": "Amador G. Damayo Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Analyn R. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rio M. Benesisto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gretchen A. Furtono",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joly Ann F. Dionarce",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Crisanto F. Cabarliza",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dennis C. Dinarce",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Reymar Angelo C. Biado",
    "position": "SK Chairperson"
   },
   {
    "name": "Abbygel C. Rapsing",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0981-431-1702"
 },
 "trangue": {
  "officials": [
   {
    "name": "Margie L. Cardenas",
    "position": "Punong Barangay"
   },
   {
    "name": "Pedro M. Loberiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elvie M. Loberiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Teresa S. Termo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Bonjing D. Somoodoy",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Morina T. Pattalitan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nico L. Negapatan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Sandra D. Congayao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "David L. Openiano",
    "position": "SK Chairperson"
   },
   {
    "name": "Eduardo S. Cuanico",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "washington": {
  "officials": [
   {
    "name": "Andres D. Balajada Jr.",
    "position": "Punong Barangay"
   },
   {
    "name": "Myla B. Garrido",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rosita U. Romero",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mae A. Cabigting",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rogelio P. Panago",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Zaldy P. Acebuche",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jinky E. Arniño",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gilbert G. Emano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aira Jane G. Bernabe",
    "position": "SK Chairperson"
   },
   {
    "name": "Jenny G. Alcayde",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "uep-zone-i": {
  "officials": [
   {
    "name": "Antonio Ll D. Ong",
    "position": "Punong Barangay"
   },
   {
    "name": "Baltazar C. Galvez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Farell Jay G. Baena",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ronnel O. Omanito",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Paul Eduard Clent S. Gacusan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Kevin Dick D. Sison",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Danny T. Balading",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ana G. Irinco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Christian P. Adlawan",
    "position": "SK Chairperson"
   },
   {
    "name": "Gilyn C. Palada",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "uep-zone-ii": {
  "officials": [
   {
    "name": "Rodolfo D. Tejero",
    "position": "Punong Barangay"
   },
   {
    "name": "Marchebad Obielito D. Obieta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edelio A. Yebron Sr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Imelda R. Lonsania",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Cristita B. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Myrna N. Adongay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jack E. Castillo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Leonardo B. Lagrimas Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Julienne Alistair S. Engo",
    "position": "SK Chairperson"
   },
   {
    "name": "Khalil Edgar T. Giray",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "uep-zone-iii": {
  "officials": [
   {
    "name": "Tito B. Tepace",
    "position": "Punong Barangay"
   },
   {
    "name": "Darwin L. Enconado",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Julian Andrie A. Aleria",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Glenda B. Romero",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jade Anthony C. Bondoc",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jay M. Galos",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Pio A. Moscare",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Harriet L. Ronato",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Kent Florenz R. Camacho",
    "position": "SK Chairperson"
   },
   {
    "name": "Donna O. Tafalla",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0954-165-2370"
 },
 "acacia": {
  "officials": [
   {
    "name": "Edna G. Algarra",
    "position": "Punong Barangay"
   },
   {
    "name": "Jeth Marsen T. Esquillo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Tamella Justine Singzon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rodolfo F. Evangelesta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Redencio M. Baniega",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Alma C. Andales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Janice D. Franzuela",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Lorena F. Favorito",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Eldie D. Lendero",
    "position": "SK Chairperson"
   },
   {
    "name": "Emy Flor G. Gacis",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "talisay": {
  "officials": [
   {
    "name": "Pilar P. Adriasola",
    "position": "Punong Barangay"
   },
   {
    "name": "Joy B. Cortinez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Bienvenido B. Horca Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Narry D. Cabales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Alma M. Britanico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jse Noli D. Cabales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Privato D. Basierto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Eric S. Jumadiao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mark Angel N. Larisma",
    "position": "SK Chairperson"
   },
   {
    "name": "Amelita J. Bautista",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "(055) 500-2134"
 },
 "molave": {
  "officials": [
   {
    "name": "Lina N. Loberiano",
    "position": "Punong Barangay"
   },
   {
    "name": "Elias Carl Weno B. Patilan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Canuto C. Candelario",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Canuto C. Candelario",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elito F. Espinola",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nonilon C. Valenciano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aldrin A. Goco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jonathan C. Somodoy",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Winlei Paul B. Bersamin",
    "position": "SK Chairperson"
   },
   {
    "name": "Nancy B. Banayag",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "yakal": {
  "officials": [
   {
    "name": "Eufemia C. Fedellaga",
    "position": "Punong Barangay"
   },
   {
    "name": "Ildefonso D. Sosa Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Corazon G. Mendador",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Benjie M. Dela Cruz",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Garry C. Mendez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Joy C. Corona",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Merlita C. Openiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "April Mae L. Guevarra",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Guido C. Openiano Jr.",
    "position": "SK Chairperson"
   },
   {
    "name": "Aileen C. Esplago",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "ipil-ipil": {
  "officials": [
   {
    "name": "Eva V. Arillo",
    "position": "Punong Barangay"
   },
   {
    "name": "Eladio V. Giron Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Myra L. Benesisto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Norma S. Patilan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ruth G. Goco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ethel G. Lasco",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jeff S. Alabado",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Victor G. Balanon IV",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Renz Joshua D. Damiar",
    "position": "SK Chairperson"
   },
   {
    "name": "Sonia C. Saballa",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0955-500-1634"
 },
 "jose-abad-santos": {
  "officials": [
   {
    "name": "Luz R. Marino",
    "position": "Punong Barangay"
   },
   {
    "name": "Marceliano P. Tan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Pedro E. Calindong",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Moises B. Tibayan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Imelda N. Quiñones",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Albino Verdeflor",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Arlene G. Aseo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marianne M. Saludario",
    "position": "SK Chairperson"
   },
   {
    "name": "Jamiel A. Pabia",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0912-071-3227"
 },
 "casoy": {
  "officials": [
   {
    "name": "Raquel A. Gallano",
    "position": "Punong Barangay"
   },
   {
    "name": "Nadia D. De Guzman",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Teresita L. De Silva",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rodmar S. Basarte",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Roberto P. Horca",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jose P. Britanico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Loradel C. Pelaez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Trixie B. Lovino",
    "position": "SK Chairperson"
   },
   {
    "name": "Marife V. Casaljay",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0909-012-9352"
 },
 "lapu-lapu": {
  "officials": [
   {
    "name": "Eduardo D. Dolo",
    "position": "Punong Barangay"
   },
   {
    "name": "Alexander C. Uy",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Gerard Zowen D. Siscar",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Myrna C. Galing",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Zyra G. Lastra",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rodel D. Paller",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jeffry P. Agusila",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Milagros G. Benesisto",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Brad Anthony M. Carey",
    "position": "SK Chairperson"
   },
   {
    "name": "Judith A. Diaz",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "(055) 510-0821"
 },
 "santol": {
  "officials": [
   {
    "name": "Fernando L. Figuroa",
    "position": "Punong Barangay"
   },
   {
    "name": "Ricky D. Alcera",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mae P. So",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Kinbie C. Sayde",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ricarda D. Rabino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Reover C. Dela Cruz",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Myla R. Gallano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marcelo A. Ponce",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Juliet C. Gabriel",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "narra": {
  "officials": [
   {
    "name": "Patrocenio C. Basista",
    "position": "Punong Barangay"
   },
   {
    "name": "Vilma B. Dumalaon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Kenneth L. Carpio",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Aireen P. Alquizar",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Agrifina D. Brigatay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Thianna Samantha L. Britanico",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Larry S. Piaza",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Maria Alma G. Godino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mark P. Dumanais",
    "position": "SK Chairperson"
   },
   {
    "name": "Rodmar E. Estrellado",
    "position": "Barangay Secretary"
   }
  ],
  "contact": "0915-456-4127"
 },
 "calachuchi": {
  "officials": [
   {
    "name": "Teofilo C. Arban",
    "position": "Punong Barangay"
   },
   {
    "name": "Romar B. Horca",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Corazon M. Romines",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ezra Joy C. Figuerao",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jushua Q. Basarte",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Belen D. Gallano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "William S. Hernandez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Menandro E. Mora",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dionisio C. Basierto III",
    "position": "SK Chairperson"
   },
   {
    "name": "Welburga A. Tarrayo",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "sampaguita": {
  "officials": [
   {
    "name": "Dioscoro P. Pabello",
    "position": "Punong Barangay"
   },
   {
    "name": "Ben P. Asuncion",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Randy C. Rosales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Pedro Nazareno M. Evasco III",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Manuelito Y. Clutario",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Enrique L. Enzon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Emily F. Marino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jaido N. Baliton",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Sam D. Uy",
    "position": "SK Chairperson"
   },
   {
    "name": "Apple Grace L. Cornico",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "mabolo": {
  "officials": [
   {
    "name": "Alvin L. Mesario",
    "position": "Punong Barangay"
   },
   {
    "name": "Mila J. Nazam",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Christopher D. Yen",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ma. Elma C. Lim",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Catherene D. Besarino",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ricky P. Limpiado",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Louiesa Marie M. Chan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Rolly B. Adan",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Leah Jean Paola B. Adan",
    "position": "SK Chairperson"
   },
   {
    "name": "Ines B. Ocenar",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "jose-p-rizal": {
  "officials": [
   {
    "name": "Emil M. Rosales",
    "position": "Punong Barangay"
   },
   {
    "name": "Tito L. Ebdane Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nelda C. Meregildo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Nimfa G. Meregildo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Anna Lisa A. Dato",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Teodora U. Mijares",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Olsen A. Singzon",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Maria E. Unay",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Karylle Jeanne A. Delorino",
    "position": "SK Chairperson"
   },
   {
    "name": "Mary Clare A. Esquibel",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "bangkerohan": {
  "officials": [
   {
    "name": "Ferdinand R. Esparto",
    "position": "Punong Barangay"
   },
   {
    "name": "Lowie S. Adora",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dante E. Rosales",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Edgar V. Caparic",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Jaime B. Alcera Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Noel A. Traqueña Jr.",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Artemio M. Carig-On",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Reymund D. Gacosta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marcel T. Dela Cruz",
    "position": "SK Chairperson"
   },
   {
    "name": "Michelle S. Cabales",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "dalakit": {
  "officials": [
   {
    "name": "Frine B. Arillo",
    "position": "Punong Barangay"
   },
   {
    "name": "Lance M. Guevara",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Dindo C. Arillo",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Kim Serry B. Chia",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mariza H. Ibañez",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Michael T. Valila",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Ian M. Logarta",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Mark E. Alegria",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Leo Arcky S. Guevara",
    "position": "SK Chairperson"
   },
   {
    "name": "Carla Marie L. Sales",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 },
 "san-pascual": {
  "officials": [
   {
    "name": "Otelia D. Cerbito",
    "position": "Punong Barangay"
   },
   {
    "name": "Dominador G. Loberiano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Michelle D. Macorro",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Elna D. Emano",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Marlita D. Querobenes",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Annabelle G. Lim",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Vivencia D. Cardenas",
    "position": "Sangguniang Barangay Member"
   },
   {
    "name": "Arnel E. Loberiano",
    "position": "SK Chairperson"
   },
   {
    "name": "Merly C. Gonzaga",
    "position": "Barangay Secretary"
   }
  ],
  "contact": null
 }
}
