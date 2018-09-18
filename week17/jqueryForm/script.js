$( document ).ready(function() {
    
    function handlePasswordMatch(event) {
        var password1 = $('#password1').val();
        var password2 = $('#password2').val();
        var passwordMatch = password1 === password2;
        
        $(".footer__button").prop("disabled", !passwordMatch);
        $(".footer__error").toggleClass("footer__error--display", !passwordMatch);
    }

    function submitForm(event) {
        var userName = event.target.username.value;
            email = event.target.email.value,
            password1 = event.target.password1.value,
            password2 = event.target.password2.value;

        event.preventDefault();

        if ((userName && email && password1 && password2) && (password1 === password2)) {
            // Make post here, if end point existed
            // $.post(url);

            $(".footer__error").removeClass("footer__error--display");
            $(".footer__button").html("Submited &#10003;");

            console.table([
                ["user name", userName], 
                ["email:", email], 
                ["password1:", password1], 
                ["password2:", password2]
            ])
        } else {
            $(".footer__button").html("Try again");        
        }
    }

    $("#password2").keyup(function (event) {
        handlePasswordMatch(event);
    })

    $("#form").submit(function (event) {
        submitForm(event);
    })
});