var formatDate = function(string) {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit',
    minute:'2-digit', timeZone: "UTC" };
  var dateFormatter = new Intl.DateTimeFormat('es-ES', options);
  var dateAsFormattedString = dateFormatter.format(new Date(string));
  return dateAsFormattedString;
}

exports.formatDate = formatDate;
