$(document).ready(function(){
    // Convert input based on selected method
    $('#convertButton').on('click', function() {
        var input = $('#inputValue').val();
        var method = $('#roundMethod').find(':selected').val();
        var output;
        var tempMSD;
        var tempbcd;
        var signbit;
        var expcont;
        var exp = 0;
        var significand;
        if (input == '') {
            $('#outputValue').val('No input given.');
            return;
        }
        if(input.toString().includes('e')){
            var array = input.split('e');
            significand = parseInt(array[0]);
            exp = parseInt(array[1]);
        }
        else if(input.toString().includes('E')){
            var array = input.split('E');
            significand = array[0];
            exp = array[1];
        }
        else{
            significand = input;
        }
        while(significand.toString().includes('.')){
            significand = significand * 10;
            exp = exp - 1;
        }
        while(significand.toString().length < 4){
            significand = significand * 10;
            exp = exp - 1;
        }
        
        significand = significand.toString();
        tempbcd = significand.substring(1);
        tempMSD = significand[0];
        switch(method) {
            case "option1":
                console.log(tempbcd);
                tempbcd = densely_fixer(tempbcd);
                console.log(tempbcd);
                signbit =get_sign_bit(input);
                expcont = get_exponent_continuation(exp);
                $('#outputValue').val(signbit + " " + "(INSERT COMBINATION FIELD HERE) " + expcont + " " + tempbcd)
                break;
            case "option2":
                console.log('Option2');
                // Function or lines here
                break;
            case "option3":
                console.log('Option3');
                // Function or lines here
                break;
            default:
                console.log('Default');
                $('#outputValue').val('No rounding method selected.');
        }
    });

    $('#resetButton').on('click', function() {
        $('#inputValue').val('');
        $('#outputValue').val('');
        $('#roundMethod').val('default');
    });

    // Copy text to clipboard
    $('#copyButton').on('click', function() {
        var text = $('#outputValue').val();

        // https://stackoverflow.com/questions/18812948/make-hidden-div-appear-then-fade-away
        $('.tooltiptext').finish().show().delay(1000).fadeOut("slow");

        navigator.clipboard.writeText(text);
    });
    
    console.log(unsigned_binary(1)); // 1
    console.log(unsigned_binary(-1)); // 11111111111111111111111111111111
    console.log(unsigned_binary(256)); // 100000000
    console.log(unsigned_binary(-256)); // 11111111111111111111111100000000
    console.log(unpacked_bcd(324))
});

  function add_space(binary){
    var temp = '';
    var spaced = '';
    while ((binary.length % 4 ) != 0) {
        for(var i =0, len = sNumber.length;i < len; i+=1){
            temp = unsigned_binary(parseInt(sNumber.charAt(i)))
            while(temp.length < 8){
                temp = temp + sNumber.charAt(i)
                if(temp.length == 4){
                    spaced = spaced + temp + ' ';
                    temp = '';
                }
            }
            bcd = bcd + temp
        }
    }
    return spaced
}
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
    return bcd;
}

function packed_bcd(decimal){
    var bcd = '';
    var output = [];
    var sNumber = decimal.toString();
    for(var i =0, len = sNumber.length;i < len; i+=1){
        temp = unsigned_binary(parseInt(sNumber.charAt(i)))
        while(temp.length < 4){
            temp = '0' + temp;
        }
        bcd = bcd + temp;
    }
    return bcd.toString();
}

function unsigned_binary(dec) {
    return (dec >>> 0).toString(2);
  }
function get_sign_bit(dec) {
    if (dec < 0){
        return 1;
    }
    return 0;
}
function get_exponent_continuation(exp){
    var expcon = exp + 101;
    return unsigned_binary(expcon);
}
function densely_packed(packed){
   
    var bcd = ['0', '0', '0', '0','0','0', '0', '0', '0', '0', '0', '0', '0'];
    var checker = [];
    checker = [packed[0], packed[4], packed[8]];
    bcd[0] = checker[0];
    bcd[1] = checker[1];
    bcd[2] = checker[2];
    if (checker[0] == '0' && checker[1] == '0' && checker[2] == '0'){
        bcd =packed[1] + packed[2] + packed[3] + packed[5] + packed[6] + packed[7] + '0' + packed[9] + packed[10] + packed[11];
    }
    else if(checker[0] == '0' && checker[1] == '0' && checker[2] == '1'){
        bcd = packed[1] + packed[2] + packed[3] + packed[5] + packed[6] + packed[7] + '1' + '0' + '0' + packed[11];
    }
    else if(checker[0] == '0' && checker[1] == '1' && checker[2] == '0'){
        bcd = packed[1] + packed[2] + packed[3] + packed[9] + packed[10] + packed[7] + '1' + '0' + '1' + packed[11];
    }
    else if(checker[0] == '1' && checker[1] == '0' && checker[2] == '0'){
        bcd = packed[9] + packed[10] + packed[3] + packed[5] + packed[6] + packed[7] + '1' + '1' + '0' + packed[11] 
    }
    else if(checker[0] == '0' && checker[1] == '1' && checker[2] == '1'){
        bcd = packed[1] + packed[2] + packed[3] + '1' + '0' + packed[7] + '1' + '1' + '1' + packed[11];
    }
    else if(checker[0] == '1' && checker[1] == '0' && checker[2] == '1'){
        bcd = packed[5] + packed[6] + packed[3] + '0' +'1' + packed[7] + '1' + '1' + '1' + packed[11];
    }
    else if(checker[0] == '1' && checker[1] == '1' && checker[2] == '0'){
        bcd = packed[9] + packed[10] + packed[3] + '0' + '0' + packed[7] + '1' + '1' + '1' + packed[11];
    }
    else if(checker[0] == '1' && checker[1] == '1' && checker[2] == '1'){
        bcd = '0' + '0' + packed[3] + '1' + '1' + packed[7] + '1' + '1' + '1' + packed[11];
    }
  

    return bcd;
}
/*Runs main loop to convert INT into a densely packed BCD
Param: (Int) number to be converted to densely packed BCD
Return: Densely packed BCD*/
function densely_fixer(decimal){
    bcd ='';
    str1 = '';
    sNum = decimal.toString()
    
    while(sNum.length % 3 != 0){
        sNum = '0' + temp;
    }
    
    for(i = 0; i + 3 <= sNum.length;i= i + 3){
 
       
        var tempString = sNum[i]+ sNum[i+1] + sNum[i+2];
 
        var temp = densely_packed(packed_bcd(parseInt(tempString)));
        str1 = str1.concat(temp);
        bcd = bcd + ' ' + str1;
        str1 = '' ;
    }
    return bcd;
}

