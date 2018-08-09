import React from "react";

import LoginForm from "./components/LoginForm";

const App = () => {
    return (
        <main>
            <LoginForm
                login={() => {
                    alert("loggin in");
                }}
            />
        </main>
    );
};

export default App;
