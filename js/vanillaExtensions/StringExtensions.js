
String.prototype.allIndexOf = function(toSearch) {
    var indices = [];
    for(var pos = this.indexOf(toSearch); pos !== -1; pos = this.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
    return indices;
}
Object.defineProperty(String.prototype, 'allIndexOf', {
    value: function(toSearch) {
        var indices = [];
        for(var pos = this.indexOf(toSearch); pos !== -1; pos = this.indexOf(toSearch, pos + 1)) {
            indices.push(pos);
        }
        return indices;
    },
    enumerable: false
  });

    Object.defineProperty(String.prototype, 'amountOf', {
        value: function(...toSearch) {
            var amount = 0;
            for(const val of toSearch){
                amount += this.split(val).length - 1;
            }
            return amount;
        }
    });
  