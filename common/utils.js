// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Add a dot between hundreds and thousands
export function thsdDot(num) {
  var retString = num;
  if ( num > 999 ) {
    let dotFill = ".";
    let hundreds = num-Math.floor(num/1000)*1000;
    if ( hundreds < 10 ) {
      dotFill =".00";
    } else if ( hundreds < 100 ) {
      dotFill = ".0";
    }
    retString = Math.floor(num/1000) + dotFill + hundreds;
  }
  return retString;
}

// Simulate mono-fonts
export function monoDigits(digits) {
  var ret = "";
  var str = digits.toString();
  for (var index = 0; index < str.length; index++ ) {
    var num = str.charAt(index);
    ret = ret.concat(hex2a("0x1" + num));
  }
  return ret;
}

export function hex2a(hex) {
  var str = "";
  for (var index = 0; index < hex.length; index += 2 ) {
    var val = parseInt(hex.substr(index, 2), 16);
    if (val) str += String.fromCharCode(val);
  }
  return str.toString();
}

//Formats the hour based on the user pref
export function formatHour(hour, clockPref) {
  if (clockPref == '12h'){
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = "12";
    }
  }
  return hour;
}

//Localisation for Day and Month
export var weekday = [];
export var monthName = [];
weekday["de-DE"] = ["Sonntag", "Montag", "Dienstag", "Mitwoch", "Donnerstag", "Freitag", "Samstag"];
monthName["de-DE"] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
weekday["da-DK"]=["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
monthName["da-DK"]=["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
weekday["de-AT"]=["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
monthName["de-AT"]=["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
weekday["de-CH"]=["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
monthName["de-CH"]=["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
weekday["de-LI"]=["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
monthName["de-LI"]=["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
weekday["de-LU"]=["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
monthName["de-LU"]=["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
weekday["en-GB"]=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
monthName["en-GB"]=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
weekday["en-US"]=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
monthName["en-US"]=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
weekday["es-ES"]=["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
monthName["es-ES"]=["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
weekday["fr-BE"]=["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
monthName["fr-BE"]=["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
weekday["fr-FR"]=["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
monthName["fr-FR"]=["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
weekday["nl-BE"]=["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
monthName["nl-BE"]=["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
weekday["nl-NL"]=["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
monthName["nl-NL"]=["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
weekday["it-CH"]=["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
monthName["it-CH"]=["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
weekday["it-IT"]=["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
monthName["it-IT"]=["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
