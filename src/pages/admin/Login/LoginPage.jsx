import storage from "@/app/local/admin/local-storage";
import ServiceAuth from "@/app/service/admin/service-auth";
import Buttons from "@/components/Buttons";
import { set } from "@/redux/login-user-store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [type, setType] = useState(storage.loginedType.get() || "A");

  const doLogin = async (e) => {
    e.preventDefault();

    try {
      const saveData = {
        id: email,
        password: pwd,
        type,
      };
      const res = await ServiceAuth.login(saveData);
      dispatch(set({ id: res.id, name: res.name, token: res.token, type }));

      storage.loginedId.set(res.id);
      storage.loginedName.set(res.name);
      storage.loginedType.set(type);
      storage.loginedToken.set(res.token);

      if (type === "A") navigate("/admin");
    } catch (error) {
      if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(error.response.data.message))
        alert(error.response.data.message);
    }
  };

  return (
    <div className="login-page-wrap">
      <div className="login-page-inner">
        <form onSubmit={doLogin}>
          <div className="login-inputs" style={{ width: "600px", margin: "0 auto" }}>
            <div className="login-box">
              <div className="login-box-title">
                <strong className="title">Admin</strong>
              </div>

              <div className="ui-input-wrap">
                <div className="inner">
                  <i className="fas fa-user txt-grey700"></i>
                  <input
                    type="text"
                    autoFocus
                    placeholder="User ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="ui-input-wrap">
                <div className="inner">
                  <i className="fas fa-lock txt-grey700"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="ml-auto">
                  <Buttons type="submit" className="ui-button primary large">
                    Login
                  </Buttons>
                </div>
              </div>

              <div className="flexYCenter gap ml-auto size-bodyS">

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
