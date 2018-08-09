import { testStateMachine } from "react-automata";
import App from "./App";
import { loginFlow } from "./loginFlow";

const fixtures = {
  LoggingIn: {
    SUCCESS: {
      username: "aerian",
      password: "isCool,reallyCool"
    },
    ERROR: {
      username: "afds",
      password: ""
    }
  }
};

it("State chart", () => {
  testStateMachine(App, { fixtures });
});
