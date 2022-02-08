/*def unpacked_bcd(decimal):
    bcd = ''
    for unit in decimal:
        temp = unsigned_binary(int(unit))
        while len(temp) < 8:
            temp = '0' + temp
        bcd = bcd + temp
    return bcd
*/
    
    function unpacked_bcd(decimal){
        var bcd = '';
        var output = [];
        var sNumber = decimal.toString();
        for(var i =0, len = sNumber.length;i < len; i+=1){
            temp = unsigned_binary(parseInt(sNumber.charAt(i)))
            while(temp.length < 8){
                temp = '0' + temp
            }
            bcd = bcd + temp
        }
        return bcd
    }
    
    function unsigned_binary(dec) {
        return (dec >>> 0).toString(2);
      }
      
      console.log(unsigned_binary(1)); // 1
      console.log(unsigned_binary(-1)); // 11111111111111111111111111111111
      console.log(unsigned_binary(256)); // 100000000
      console.log(unsigned_binary(-256)); // 11111111111111111111111100000000
      console.log(unpacked_bcd(324))

