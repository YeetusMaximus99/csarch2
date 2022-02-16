$(document).ready(function() {
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
        $('#toggle-hex-btn').hide();

        if (input == '') {
            $(outputElement).text('No input given.');
            $(outputElement).css('color', 'red');
            return;
        }
        let pattern = /e/;
        let pattern1 = /E/;
        console.log(pattern.test(input.toString()));
        if (pattern.test(input.toString())) {
            var array = input.split('e');
            significand = array[0];
            console.log(significand);
            exp = parseInt(array[1]);

        } else if (pattern1.test(input.toString())) {
            var array = input.split('E');
            significand = array[0];
            console.log(array[0]);
            exp = parseInt(array[1]);

        } else {
            significand = input;
        }


        significand = significand.toString();
        signbit = get_sign_bit(input);
        if (signbit == 1) {
            significand = significand.substring(1);

        }



        var i = 0;
        var array;
        var temp;
        var temp2;
        temp2 = significand.toString();

        temp2 = temp2.length - 1;
        exp = parseInt(exp);
        console.log("len = " + significand.toString().split('.').join("").length);
        if (significand.toString().split('.').join("").length <= 7) {
            while (significand.toString().includes('.')) {
                temp = significand.toString();
                temp = temp.split('.');
                temp = temp[0].length;

                if (temp < temp2) {
                    significand = parseFloat(significand);
                    significand = significand * 10;
                    significand = significand.toFixed(temp2);
                    exp = exp - 1;
                } else if (temp == temp2 && temp != 7) {
                    significand = '0' + significand;

                } else {

                    significand = significand.toString();
                    array = significand.split('.');
                    significand = array[0];
                    console.log(array[1]);
                }
                console.log("significand = " + significand)
            }
            significand = significand.toString();
            while (significand.toString().length < 7) {
                significand = '0' + significand;

            }
        } else {
            console.log("I here");
            temp = significand.toString().split('.');
            //temp = temp[0]
            while (temp[0].length < 7) {
                significand *= 10;
                temp = significand.toString().split('.');
                exp -= 1;
                //temp = temp[0]
                console.log("templen1 = " + temp[0].length);
            }
            while (temp[0].length > 7) {
                significand /= 10;
                temp = significand.toString().split('.');
                exp += 1;
                console.log("templen2 = " + temp[0].length);
            }
            console.log("I here");
            significand = "0" + significand.toString() * 10
            console.log("significand = " + significand);
        }

        /*5.673459e6*/


        tempMSD = significand[0];
        tempbcd = significand.substring(1);
        switch (method) {
            case "NR":
                if (significand.length > 7) {
                    $(outputElement).text("Input greater than 7 digits.");
                    $(outputElement).css('color', 'red');
                } else {
                    console.log(tempbcd);
                    console.log("sign = " + signbit); //<===
                    tempbcd = densely_fixer(tempbcd);
                    expcont = get_exponent_continuation(exp);
                    console.log("e' = " + expcont); //<===
                    combifield = combination_field(expcont, tempMSD);
                    console.log("combi = " + combifield); //<===
                    if (combifield.localeCompare("Infinity") == 0) {
                        $(outputElement).text("Infinity");
                    } else if (combifield.localeCompare("NaN") == 0) {
                        $(outputElement).text("NaN");
                    } else {
                        expcont = expcont.substring(2);
                        console.log("exp cont. = " + expcont); //<===
                        $(outputElement).text(signbit + " " + combifield + " " + expcont + " " + tempbcd);
                    }
                    $('#output-value-hex').text(binaryToHex($(outputElement).text().replaceAll(' ', '')));
                    $('#toggle-hex-btn').show();
                }
                break;

            case "RTNE":
                console.log('Option3');

                newSignificand = round_to_nearest_even(parseInt(significand));
                tempMSD = newSignificand[0];
                tempbcd = newSignificand.substring(1).split('.');
                // newSignificand = significand.substring(0, 9)
                //newSignificand = Math.round(parseFloat(newSignificand) / 2) * 2
                //newSignificand = newSignificand.toString();
                console.log("newSignificand = " + newSignificand); //<===
                tempbcd = tempbcd[0];
                console.log("tempbcd = " + tempbcd); //<===

                console.log(tempbcd);
                console.log("sign = " + signbit); //<===
                tempbcd = densely_fixer(tempbcd);
                expcont = get_exponent_continuation(exp);
                console.log("e' = " + expcont); //<===
                combifield = combination_field(expcont, tempMSD);
                console.log("combi = " + combifield); //<===
                if (combifield.localeCompare("Infinity") == 0) {
                    $(outputElement).text("Infinity");
                } else if (combifield.localeCompare("NaN") == 0) {
                    $(outputElement).text("NaN");
                } else {
                    expcont = expcont.substring(2);
                    console.log("exp cont. = " + expcont); //<===
                    $(outputElement).text(signbit + " " + combifield + " " + expcont + " " + tempbcd);
                }
                $('#output-value-hex').text(binaryToHex($(outputElement).text().replaceAll(' ', '')));
                $('#toggle-hex-btn').show();
                break;

            case "Truncate":
                console.log('Option3');

                //significand = significand.substring(0, 8)
                tempMSD = significand[1];
                tempbcd = significand.substring(2, 8)
                console.log("tempbcd = " + tempbcd); //<===

                console.log(tempbcd);
                console.log("sign = " + signbit); //<===
                tempbcd = densely_fixer(tempbcd);
                expcont = get_exponent_continuation(exp);
                console.log("e' = " + expcont); //<===
                combifield = combination_field(expcont, tempMSD);
                console.log("combi = " + combifield); //<===
                if (combifield.localeCompare("Infinity") == 0) {
                    $(outputElement).text("Infinity");
                } else if (combifield.localeCompare("NaN") == 0) {
                    $(outputElement).text("NaN");
                } else {
                    expcont = expcont.substring(2);
                    console.log("exp cont. = " + expcont); //<===
                    $(outputElement).text(signbit + " " + combifield + " " + expcont + " " + tempbcd);
                }
                $('#output-value-hex').text(binaryToHex($(outputElement).text().replaceAll(' ', '')));
                $('#toggle-hex-btn').show();
                break;


            default:
                console.log('Default case');
                $(outputElement).text('No rounding method selected.');
                $(outputElement).css('color', 'red');
        }
    });
});

const hexMap = {
    '0000': '0',
    '0001': '1',
    '0010': '2',
    '0011': '3',
    '0100': '4',
    '0101': '5',
    '0110': '6',
    '0111': '7',
    '1000': '8',
    '1001': '9',
    '1010': 'A',
    '1011': 'B',
    '1100': 'C',
    '1101': 'D',
    '1110': 'E',
    '1111': 'F',
};

function binaryToHex(input) {
    var hex = '';

    for (var i = input.length - 4; i >= 0; i -= 4) {
        var temp = input.slice(i, i + 4);
        hex = hexMap[temp] + hex;
    }
    return hex;
}