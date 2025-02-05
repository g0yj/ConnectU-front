import React, { useState } from "react";
import axios from "axios";

export default function EmailSender() {
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/email/send", email);
      alert("이메일 전송 성공!");
      console.log(response.data);
    } catch (error) {
      console.error("이메일 전송 실패", error);
      alert("이메일 전송 실패");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>이메일 보내기</h2>
      <input
        type="email"
        name="to"
        placeholder="받는 사람 이메일"
        value={email.to}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="text"
        name="subject"
        placeholder="제목"
        value={email.subject}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <textarea
        name="content"
        placeholder="내용 입력"
        value={email.content}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: "8px", height: "100px", marginBottom: "10px" }}
      />
      <button onClick={sendEmail} style={{ width: "100%", padding: "10px", background: "#0056A6", color: "white", border: "none", cursor: "pointer" }}>
        이메일 보내기
      </button>
    </div>
  );
}
