import React from "react";

// UsernameStep 컴포넌트에서 필요한 props 정의
interface UsernameStepProps {
  username: string; // 현재 입력된 유저네임 값
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 유저네임 변경 핸들러
  error: string | null; // 유저네임 유효성 검사 오류 메시지
  prevStep: () => void; // 이전 스텝으로 이동하는 함수
  handleSubmit: (e: React.FormEvent) => void; // 폼 제출 함수
}

// UsernameStep 컴포넌트 정의
export const UsernameStep: React.FC<UsernameStepProps> = ({
  username,
  onUsernameChange,
  error,
  prevStep,
  handleSubmit,
}) => {
  return (
    <div>
      {/* 유저네임 입력 필드 */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
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
      {/* 폼 제출 버튼 */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
      >
        가입완료
      </button>
    </div>
  );
};
