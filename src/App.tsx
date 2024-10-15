import React from "react";
import "./styles/App.css";
import SignUpForm from "./components/SignUpForm/SignUpForm"; // 경로 확인

function App() {
  return (
    <div className="App">
      <h1>회원가입</h1>
      <SignUpForm />
    </div>
  );
}

export default App;
