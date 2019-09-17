class Utils {
  yearValidation(year, ev) {
    const text = /^[0-9]+$/;
    if (year.length === 4 && ev.keyCode !== 8 && ev.keyCode !== 46) {
      if (year !== 0) {
        if ((year !== '') && (!text.test(year))) {
          return false;
        }

        if (year.length !== 4) {
          return false;
        }
        const currentYear = new Date().getFullYear();
        if ((year < 1920) || (year > currentYear)) {
          return false;
        }
        return true;
      }
      return false;
    }
    return false;
  }
}

module.exports = new Utils();
