var formatDate = function(string) {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit',
    minute:'2-digit' };
  return new Date(string).toLocaleDateString('es-ES',options);
}

exports.formatDate = formatDate;
