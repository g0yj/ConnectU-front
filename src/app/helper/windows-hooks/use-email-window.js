import useCrossTab from "@/hooks/useCrossTab";
import { WINDOWS, openWindow } from "../helper-window";
import { useEffect } from "react";

/**
 * 메일 발송 윈도우 훅
 * @returns {{memberList: Array, openEmailWindow: Function}}
 */
const useEmailWindow = () => {
  console.log('userEmailWindow 열림')
  const [memberList, setMemberList] = useCrossTab(WINDOWS.SEND_EMAIL.id, []);
  console.log('선언된 memberList', memberList);
  /**
   *
   * @param {Array} memberList // 선택된 회원 리스트
   * @param {string} memberList[].name // 회원 이름
   * @param {string} memberList[].email // 회원 이메일
   */
  const openEmailWindow = (selectedMemberList) => {
    if (memberList.length === 0) {
      alert("선택된 회원이 없습니다.");
      return;
    }

    setMemberList([...selectedMemberList]);
    openWindow(WINDOWS.SEND_EMAIL);
  };

  // memberList가 업데이트된 후에 수행할 로직
  useEffect(() => {
    if (memberList.length > 0) {
      console.log('memberList가 업데이트됨: ', memberList);
      // memberList가 업데이트된 후 필요한 작업을 추가할 수 있습니다.
    }
  }, [memberList]); // memberList가 변경될 때마다 실행

  return { memberList, openEmailWindow };
};

export default useEmailWindow;
