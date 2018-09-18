$( document ).ready(function() {

    $("#form").submit(function (event) {
        event.preventDefault();
        var userName = event.target.username.value;
            email = event.target.email.value,
            password1 = event.target.password1.value,
            password2 = event.target.password2.value;
        var formCompleted = userName && email && password1 && password2;

        if (formCompleted && (password1 === password2)) {
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
            $(".footer__error").addClass("footer__error--display");
            $(".footer__button").html("Try again");        
        }
    })
});