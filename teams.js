// # SETTINGS
const showSelect = true;
const defaultClass = null;

// # CLASS LIST
const teams = [
  {
    id: 100,
    students: [
      "APD Vigna Pia",
      "Santa Marinella",
      "Aranova",
      "W3 Maccarese",
      "Colleferro Calcio",
      "Atl. Lodigiani",
      "Cerveteri",
      "Elis",
      "Torrino Calcio",
      "Anagni",
      "PC Tor Sapienza",
      "Alba Roma",
      "B.go San Martino",
      "FAVL Cimini",
      "Fiano Romano",
      "Savio",
    ],
  },
];

// # GET CLASS
/**
 * Gets class from query string
 * if none is present or the class in the query does not extists, gets the defaultClass
 * if defaultClass is not provided, the first class is taken
 * @param {?int} defaultClass
 * @returns {object} class
 */
const getClass = (defaultClass = null) => {
  fallbackClass = defaultClass || teams[0].id;
  const params = new URLSearchParams(window.location.search);
  urlClass = params.get("teams");

  return (
    teams.find(({ id }) => id == urlClass) ||
    teams.find(({ id }) => id == fallbackClass)
  );
};
