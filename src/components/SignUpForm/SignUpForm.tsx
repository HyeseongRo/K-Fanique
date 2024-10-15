import React, { useState } from "react";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";
import { UsernameStep } from "./UsernameStep";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";
import { z } from "zod";

// 유효성 검사 스키마 정의 (이메일, 비밀번호, 유저네임)
const signupSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .regex(/[A-Z]/, {
      message: "비밀번호에는 최소 하나의 대문자가 포함되어야 합니다.",
    })
    .regex(/\d/, {
      message: "비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "비밀번호에는 최소 하나의 특수 문자가 포함되어야 합니다.",
    }),
  username: z.string().min(1, { message: "유저네임은 필수 입력 항목입니다." }),
});

// SignUpForm 컴포넌트 정의
export const SignUpForm: React.FC = () => {
  // 사용자 입력 데이터를 상태로 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // 오류 메시지를 상태로 관리
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1); // 현재 폼 스텝 상태

  // 스텝에 따른 제목 변경 로직
  const getTitle = () => {
    if (currentStep === 1) return "이메일";
    if (currentStep === 2) return "비밀번호";
    if (currentStep === 3) return "닉네임";
    return "회원가입";
  };

  // 입력 값이 변경될 때마다 formData 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 각 스텝별 유효성 검사를 실행하는 함수
  const validateStep = (step: number) => {
    try {
      if (step === 1) {
        signupSchema.pick({ email: true }).parse({ email: formData.email });
      } else if (step === 2) {
        signupSchema
          .pick({ password: true })
          .parse({ password: formData.password });
      } else if (step === 3) {
        signupSchema
          .pick({ username: true })
          .parse({ username: formData.username });
      }
      setErrors({});
      return true;
    } catch (error: any) {
      setErrors({ [error.errors[0].path[0]]: error.errors[0].message });
      return false;
    }
  };

  // 다음 스텝으로 이동하는 함수
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 스텝으로 돌아가는 함수
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // 폼이 제출될 때 실행되는 함수 (서버와 통신 또는 모의 테스트)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 마지막 스텝 유효성 검사 후, 서버로 데이터 전송
    if (validateStep(3)) {
      try {
        // 실제 서버 요청 주석 처리 (백엔드 준비되면 사용)
        /*
        const response = await axios.post(
          "http://localhost:8080/api/register",
          formData
        );
        alert("회원가입이 성공적으로 완료되었습니다.");
        */

        // 모의 API 응답
        const mockResponse = {
          status: 200,
          data: {
            message: "회원가입이 성공적으로 완료되었습니다.",
          },
        };

        console.log("모의 데이터로 테스트:", mockResponse);
        alert(mockResponse.data.message);
      } catch (error: any) {
        alert("회원가입 실패: " + error.message);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      {/* 동적으로 제목을 출력 */}
      <h2 className="text-2xl font-bold mb-6 text-center">{getTitle()}</h2>
      <form onSubmit={handleSubmit}>
        {/* 스텝에 따라 각각의 컴포넌트를 렌더링 */}
        {currentStep === 1 && (
          <EmailStep
            email={formData.email}
            onEmailChange={(e) => handleChange(e)}
            error={errors.email || null}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <PasswordStep
            password={formData.password}
            onPasswordChange={(e) => handleChange(e)}
            error={errors.password || null}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {currentStep === 3 && (
          <UsernameStep
            username={formData.username}
            onUsernameChange={(e) => handleChange(e)}
            error={errors.username || null}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
    </div>
  );
};
