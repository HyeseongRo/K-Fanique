import React from "react";

// EmailStep 컴포넌트에서 필요한 props 정의
interface EmailStepProps {
  email: string; // 현재 입력된 이메일 값
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이메일 변경 핸들러
  error: string | null; // 이메일 유효성 검사 오류 메시지
  nextStep: () => void; // 다음 스텝으로 이동하는 함수
}

// EmailStep 컴포넌트 정의
export const EmailStep: React.FC<EmailStepProps> = ({
  email,
  onEmailChange,
  error,
  nextStep,
}) => {
  return (
    <div>
      {/* 이메일 입력 필드 */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        className="border w-full p-2 rounded mb-4"
        required
      />
      {/* 오류가 있을 경우 출력 */}
      {error && <p className="text-red-500">{error}</p>}
      {/* 다음 스텝으로 이동 버튼 */}
      <button
        type="button"
        onClick={nextStep}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        다음
      </button>
    </div>
  );
};
