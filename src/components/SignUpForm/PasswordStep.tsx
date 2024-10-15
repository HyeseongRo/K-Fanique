import React from "react";

// PasswordStep 컴포넌트에서 필요한 props 정의
interface PasswordStepProps {
  password: string; // 현재 입력된 비밀번호 값
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 비밀번호 변경 핸들러
  error: string | null; // 비밀번호 유효성 검사 오류 메시지
  nextStep: () => void; // 다음 스텝으로 이동하는 함수
  prevStep: () => void; // 이전 스텝으로 이동하는 함수
}

// PasswordStep 컴포넌트 정의
const PasswordStep: React.FC<PasswordStepProps> = ({
  password,
  onPasswordChange,
  error,
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      {/* 비밀번호 입력 필드 */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        className="border w-full p-2 rounded mb-4"
        required
      />
      {/* 오류가 있을 경우 출력 */}
      {error && <p className="text-red-500">{error}</p>}
      {/* 이전 스텝으로 이동 버튼 */}
      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        이전
      </button>
      {/* 다음 스텝으로 이동 버튼 */}
      <button
        type="button"
        onClick={nextStep}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
      >
        다음
      </button>
    </div>
  );
};

export default PasswordStep;
