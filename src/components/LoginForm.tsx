// LoginForm.tsx
import React, { useState } from "react";
import { EmailStep } from "./SignUpForm/EmailStep";
import { PasswordStep } from "./SignUpForm/PasswordStep";
import { UsernameStep } from "./SignUpForm/UsernameStep";
import "../styles/LoginForm.css";

// LoginForm 컴포넌트 정의
export const LoginForm: React.FC = () => {
  // 현재 진행 중인 스텝을 상태로 관리
  const [step, setStep] = useState<"login" | "email" | "password" | "username">(
    "login"
  );

  // 사용자 입력 데이터를 상태로 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // 오류 메시지를 상태로 관리
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  // 입력 값이 변경될 때마다 formData 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 각 필드별 유효성 검사를 실행하는 함수
  const validateEmail = (): boolean => {
    if (!formData.email.includes("@")) {
      setErrors({ ...errors, email: "올바른 이메일을 입력해주세요." });
      return false;
    }
    setErrors({ ...errors, email: "" });
    return true;
  };

  const validatePassword = (): boolean => {
    if (formData.password.length < 8) {
      setErrors({ ...errors, password: "비밀번호는 8자 이상이어야 합니다." });
      return false;
    }
    setErrors({ ...errors, password: "" });
    return true;
  };

  // 각 스텝별로 적절한 컴포넌트 렌더링
  return (
    <div className="login-form-container">
      <h1>덕업일치 계정으로 로그인해주세요.</h1>
      {step === "login" && (
        <form>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      )}
      {step === "email" && (
        <EmailStep
          email={formData.email}
          onEmailChange={handleChange}
          error={errors.email}
          nextStep={() => {
            if (validateEmail()) setStep("password");
          }}
        />
      )}
      {step === "password" && (
        <PasswordStep
          password={formData.password}
          onPasswordChange={handleChange}
          error={errors.password}
          prevStep={() => setStep("email")} // 이전 스텝으로 이동
          nextStep={() => {
            if (validatePassword()) setStep("username");
          }}
        />
      )}
      {step === "username" && (
        <UsernameStep
          username={formData.username}
          onUsernameChange={handleChange}
          error={errors.username}
          prevStep={() => setStep("password")} // 이전 스텝으로 이동
          handleSubmit={() => {
            // 최종 제출 로직
            console.log("회원가입 완료");
          }}
        />
      )}
    </div>
  );
};
