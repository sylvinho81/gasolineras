var formatDate = function(string) {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit',
    minute:'2-digit', timeZone: "Europe/Madrid" };
  var spainTime = new Date(string).toLocaleString('es-ES',options);
  var d = new Date(spainTime);
  return d.toLocaleDateString() + ' ' + d.toTimeString().substring(0, d.toTimeString().indexOf("GMT"));
}

exports.formatDate = formatDate;
