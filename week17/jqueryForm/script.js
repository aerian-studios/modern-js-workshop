$( document ).ready(function() {
    
    function handlePasswordCheck() {
        var password1 = $('#password1').val();
        var password2 = $('#password2').val();
        var passwordMatch = password1 === password2;
        
        $(".footer__button").prop("disabled", !passwordMatch);
        $(".footer__error").toggleClass("footer__error--display", !passwordMatch);
    }

    function handleSubmition () {
        $(".footer__error").removeClass("footer__error--display");
        $(".footer__button").html("Submited &#10003;");
    }

    function handleRetry () {
        $(".footer__button").html("Try again");      
    }

    function logResults (userName, email, password1, password2) {
        console.table([
            ["user name", userName], 
            ["email:", email], 
            ["password1:", password1], 
            ["password2:", password2]
        ])
    }

    function submitForm(event) {
        event.preventDefault();
        var userName = event.target.username.value;
            email = event.target.email.value,
            password1 = event.target.password1.value,
            password2 = event.target.password2.value;
        var formCompleted = userName && email && password1 && password2;

        if (formCompleted && (password1 === password2)) {
            // Post form data
            handleSubmition();
            logResults(userName, email, password1, password2);
        } else {
            handleRetry();
        }
    }

    $("#password2").keyup(function (event) {
        handlePasswordCheck(event);
    })

    $("#form").submit(function (event) {
        submitForm(event);
    })
});