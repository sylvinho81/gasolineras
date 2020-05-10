var formatDate = function(string) {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit',
    minute:'2-digit', timeZone: "UTC-2" };
  var spainTime = new Date(string).toLocaleString('es-ES',options);
  return spainTime;
}

exports.formatDate = formatDate;
