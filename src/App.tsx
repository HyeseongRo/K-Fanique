import React from "react";
import "./styles/App.css"; // 기존 스타일이 있으면 그대로 유지
import { LoginForm } from "./components/LoginForm"; // LoginForm 경로 확인

function App() {
  return (
    <div className="App">
      <LoginForm /> {/* LoginForm을 렌더링 */}
    </div>
  );
}

export default App;
