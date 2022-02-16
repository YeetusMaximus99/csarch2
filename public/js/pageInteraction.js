$(document).ready(function() {
    $('#round-method-1-btn').on('click', function() {
        $('#rounding-method-display').text('No Rounding');
        $('#rounding-method').text('NR');
    });
    $('#round-method-2-btn').on('click', function() {
        $('#rounding-method-display').text('Round to Nearest Even');
        $('#rounding-method').text('RTNE');
    });
    $('#round-method-3-btn').on('click', function() {
        $('#rounding-method-display').text('Truncate');
        $('#rounding-method').text('Truncate');
    });

    /* Reset fields to default */
    $('#resetButton').on('click', function() {
        $('#input-value').val('');
        $('#output-value').text('');
        $('#rounding-method').text('RTNE');
        $('#rounding-method-display').text('Round to Nearest Even');
    });

    /* Copy text to clipboard */
    $('#copyButton').on('click', function() {
        var text = $('#output-value').text();

        // https://stackoverflow.com/questions/18812948/make-hidden-div-appear-then-fade-away
        $('.tooltiptext').finish().show().delay(1000).fadeOut("slow");

        navigator.clipboard.writeText(text);
    });

    $('#toggle-hex-btn').on('click', function() {
        $('#output-value').hide();
        $('#toggle-hex-btn').hide();

        $('#output-value-hex').show();
        $('#toggle-binary-btn').show();

    });

    $('#toggle-binary-btn').on('click', function() {
        $('#output-value').show();
        $('#output-value-hex').hide();

        $('#toggle-hex-btn').show();
        $('#toggle-binary-btn').hide();
    });
});