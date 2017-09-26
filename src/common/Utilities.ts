export const extractPrice = (priceString: string): number => {
  // match regex to extract digits
  const priceMatches = priceString.match(/(\d{1,3}(\.|,|\s)?)*\d{1,3}((\.|,)\d\d?)?/);

  // TODO: check for null
  let price = priceMatches[0];

  // get rid of white space
  price = price.replace(" ", "");

  const periodMatches = price.match(/\./g);
  const commaMatches = price.match(/,/g);

  // if period and comma exists in price string
  if (commaMatches !== null && periodMatches !== null) {

    // if period appears first
    if (price.indexOf(".") < price.indexOf(",")) {
      // remove period
      price = price.replace(".", "");
      // replace comma with period
      price = price.replace(",", ".");

      // if comma appears first
    } else {
      // remove comma
      price = price.replace(",", "");
    }
    // if period or comma exists in price string
  } else if (commaMatches !== null || periodMatches !== null) {
    let char;
    let matches;
    if (commaMatches !== null) {
      char = ",";
      matches = commaMatches;
    } else {
      char = ".";
      matches = periodMatches;
    }

    // if multiple char occurences
    if (matches.length > 1) {
      // remove char if multiple occurences
      price = price.replace(char, "");
      // if single char occurences
    } else {
      // check how many digits behind
      if (price.substring(price.indexOf(char) + 1).length > 2) {
        // remove char if there are more than 2 digits after char
        price = price.replace(char, "");
      } else {
        // replace char with period if there are 2 digits or less after char
        price = price.replace(char, ".");
      }
    }
  }
  return parseFloat(price);
};
