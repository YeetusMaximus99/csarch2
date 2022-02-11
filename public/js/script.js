$(document).ready(function(){
    // Convert input based on selected method
    $('#convertButton').on('click', function() {
        var inputElement = $('#input-value');
        var outputElement = $('#output-value');

        var input = $(inputElement).val();
        var method = $('#rounding-method').text();
        var combifield;
        var tempMSD;
        var tempbcd;
        var signbit;
        var expcont;
        var exp = 0;
        var significand;
       
        $(outputElement).css('color', 'white');

        if (input == '') {
            $(outputElement).text('No input given.');
            $(outputElement).css('color', 'red');
            return;
        }
        let pattern = /e/;
        let pattern1 = /E/;
        console.log(pattern.test(input.toString()));
        if (pattern.test(input.toString())){
            var array = input.split('e');
            significand = array[0];
            console.log(significand);
            exp = parseInt(array[1]);
            console.log("exps1");
            console.log(exp);
        }
        
        else if (pattern1.test(input.toString())){
            var array = input.split('E');
            significand = parseInt(array[0]);
            console.log(array[0]);
            exp = parseInt(array[1]);
            console.log("exps2");
            console.log(exp);
        }

        else{
            significand = input;
        }

        signbit = get_sign_bit(input);
        if(signbit == 1){
            significand = significand.substring(1);
            significand = parseInt(significand);
     
        }

        console.log(significand);
        var i;
        var array;
        while(significand.toString().includes('.')){
            if(i < 8){
            significand = significand * 10;
            console.log(significand);
            exp = exp - 1;
            i++;
            }
            else{
                significand = significand.toString();
                array=significand.split('.');
                significand = array[0];
            }
        }
        significand = significand.concat(array[1]);
        while(significand.toString().length < 7){
            significand = significand * 10;
            exp = exp - 1;
        }
        
        /*5.673459e6*/
        significand = significand.toString();
        tempMSD = significand[0];
        tempbcd = significand.substring(1);

        switch(method) {
            case "NR":
                if(significand.length > 7){
                    $('#outputValue').val("Please Input a digit thats less than or equal to 7 digits");
                }
                console.log(tempbcd);
                else{
                tempbcd = densely_fixer(tempbcd);
                expcont = get_exponent_continuation(exp);
                
                combifield = combination_field(expcont,tempMSD);
                expcont = expcont.substring(2);
                $(outputElement).text(signbit + " " + combifield + " " + expcont + " " + tempbcd);
                }
                break;
                
            case "RTNE":
                console.log('Option2');
                newSignificand = round_to_nearest_even(significand);
                tempMSD = newSignificand[0];
                tempbcd = newSignificand.substring(1);

                tempbcd = densely_fixer(tempbcd);
                expcont = get_exponent_continuation(exp);
                combifield = combination_field(expcont,tempMSD);
                expcont = expcont.substring(2);
                $(outputElement).text(signbit + " " + combifield + " " + expcont + " " + tempbcd);
                break;

            default:
                console.log('Default case');
                $(outputElement).text('No rounding method selected.');
                $(outputElement).css('color', 'red');
        }
    });
});