import useEmailWindow from "@/app/helper/windows-hooks/use-email-window";
import ServiceCommon from "@/app/service/admin/service-common";
import Buttons from "@/components/Buttons";
import { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css"
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from "@toast-ui/react-editor";

/**
 * 이메일 발송 모달
 */
const SendEmailModal = () => {

  const { memberList } = useEmailWindow();

  console.log('이메일 발송 모달에서의 memberList ', memberList);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recipients, setRecipients] = useState([]);

  const editorRef = useRef(null);

  // 메일 발송
  const sendEmail = async () => {
    try {
      if (!title) {
        alert("제목을 입력해주세요.")
        return;
      }
      if(!content) {
        alert("내용을 입력해주세요.")
        return;
      }

      if (!Array.isArray(recipients)) {
        alert("수신자 목록이 올바르지 않습니다");
        return;
      } else {
        console.log("Recipients is an array.");
      }   

      const saveData = {
        title,
        content,
        recipients: recipients.map((member) => ({ id: member.id, name: member.name, email: member.email })),
      };
      await ServiceCommon.sendEmail(saveData);
      alert("메일 발송이 완료되었습니다.");
      window.close();
    } catch (e) {
      alert(e.message);
    }
  };


  useEffect(() => {
    setRecipients(memberList);
  }, [memberList]);

  return (
    <div className="layout-popup-wrap">
      <div className="ui-location-wrap">
        <div className="ui-location-title">메일발송</div>
      </div>

      <div className="ui-info-table th-left sp-mt-5">
        <table>
          <colgroup>
            <col style={{ width: 150 }} />
          </colgroup>
          <tbody>
            <tr>
              <th>받는 사람</th>
              <td>
                <div className="flex gap">
                  <div className="flex1">
                    <select
                      className="input-init"
                      multiple
                      style={{ width: "100%" }}
                    >
                      {!!recipients &&
                        recipients.map((member, idx) => (
                          <option key={member.name + idx}>
                            {member.name}
                            ({member.email})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input
                  type="text"
                  className="input-init full"
                  placeholder="제목을 입력 하세요."
                  onChange={({ target: { value } }) => setTitle(value)}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <Editor 
                  initialValue={content ? content : " "}
                  ref={editorRef}
                  previewStyle="tab"
                  height="400px"
                  toolbarItems={[
                    // 툴바 옵션 설정
                    ["heading", "bold", "italic", "strike"],
                    ["hr", "quote"],
                    ["ul", "ol", "task", "indent", "outdent"],
                    ["table", /*"image",*/ 
                    "link"],
                    ["code", "codeblock"],
                  ]}
                  usageStatistics={false}
                  onChange={() => {
                    const changeContent = editorRef.current.getInstance().getHTML();
                    setContent(changeContent)
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="layout-between sp-mt-20">
        <div className="ml-auto gap-s">
          <Buttons className="outlined mid" onClick={() => window.close()}>
            닫기
          </Buttons>
          <Buttons className="primary mid" onClick={sendEmail}>
            발송
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal;
