import useSmsWindow from "@/app/helper/windows-hooks/use-sms-window";
import ServiceCommon from "@/app/service/admin/service-common";
import Buttons from "@/components/Buttons";
import { useEffect, useState } from "react";

/**
 * SMS발송 모달
 */
const SendSmsModal = () => {
  const { memberList } = useSmsWindow();

  const [recipients, setRecipients] = useState([]);
  const [content, setContent] = useState("");

  const onChangeSendData = (e) => {
    setContent(e.target.value);
  };


  // sms발송
const sendSms = async () => {
  try {
    const sendData = {
      content,
      recipients: recipients.map((member) => {
        return {
          id: member.id,     
          name: member.name,
          cellPhone: member.cellPhone
        };
      })
    };
    console.log('sms데이터 ', sendData);
    await ServiceCommon.sendSms(sendData);

    alert("SMS 발송이 완료되었습니다.");
    window.close();
  } catch (e) {
    alert(e.message);
  }
};


  useEffect(() => {
    setRecipients(memberList);
  }, [memberList]);

  useEffect(() => {
    setContent(content);
  }, [content]);

  return (
    <div className="layout-popup-wrap">
      <div className="ui-location-wrap">
        <div className="ui-location-title">SMS 발송</div>
      </div>
      <div className="ui-info-table th-left sp-mt-5">
        <table>
          <colgroup>
            <col style={{ width: 150 }} />
          </colgroup>
          <tbody>
            <tr>
              <th>발송대상</th>
              <td>
                <div className="flex gap">
                  <div className="flex1">
                    <select
                      className="input-init"
                      multiple
                      style={{ width: "100%" }}
                      
                    >
                      {!!recipients &&
                        recipients?.map((member, idx) => (
                          <option key={member.name + idx}>
                            {member.name} ({member.cellPhone || member.phone})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flexColumn gap" style={{ alignSelf: "flex-end" }}></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  className="input-init full"
                  style={{ height: 200 }}
                  value={content}
                  onChange={onChangeSendData}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="layout-between sp-mt-20">
        <div className="ml-auto gap-s">
          <Buttons className="primary mid" onClick={sendSms}>발송</Buttons>
        </div>
      </div>
    </div>
  );
};

export default SendSmsModal;
