$(document).ready(function() {
    $('#round-method-1-btn').on('click', function() {
        $('#rounding-method-display').text('No Rounding');
        $('#rounding-method').text('NR');
    });
    $('#round-method-2-btn').on('click', function() {
        $('#rounding-method-display').text('Round to Nearest Even');
        $('#rounding-method').text('RTNE');
    });

    /* Reset fields to default */
    $('#resetButton').on('click', function() {
        $('#inputValue').val('');
        $('#output-value').text('');
        $('#rounding-method').text('NR');
        $('#rounding-method-display').text('No Rounding');
    });

    /* Copy text to clipboard */
    $('#copyButton').on('click', function() {
        var text = $('#output-value').text();

        // https://stackoverflow.com/questions/18812948/make-hidden-div-appear-then-fade-away
        $('.tooltiptext').finish().show().delay(1000).fadeOut("slow");

        navigator.clipboard.writeText(text);
    });
});