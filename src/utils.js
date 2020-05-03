var formatDate = function(string) {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(string).toLocaleDateString([],options);
}

exports.formatDate = formatDate;
