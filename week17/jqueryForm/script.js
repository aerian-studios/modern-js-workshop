$( document ).ready(function() {

    $("#form").submit(function (event) {
        event.preventDefault();
        var userName = event.target.username.value;
            email = event.target.email.value,
            password1 = event.target.password1.value,
            password2 = event.target.password2.value,

        console.table([
            ["userName", userName], 
            ["email:", email], 
            ["password1:", password1], 
            ["password2:", password2]
        ])

        // Make post here is end point existed
        // $.post(url);
    })
});