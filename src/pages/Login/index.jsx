import React from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomInput from "../../components/CustomInput/index";
import Button from "../../components/Button/index";
import { loginUser } from "../../store/slices/main/login/loginSlice";
import { schema } from "./validate";
import { TabTitle } from "src/utils/GeneralFunctions";
import { authenticationSelector } from "src/store/selectors/main/loginSelectors";
import { toast } from "react-toastify";

const Login = () => {
  TabTitle("Login");
  let checked = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(authenticationSelector);

  if (status === "success") {
    const role = JSON.parse(sessionStorage.getItem("userPresent"))?.role;
    switch (role) {
      case "Role_HR":
        navigate("/hr", { replace: true });
        break;
      case "Role_Partner":
        navigate("/partner", { replace: true });
        break;
      case "Role_Candidate":
        navigate("/candidate", { replace: true });
        break;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await dispatch(loginUser(userData));
      if (res.payload.token) {
        const role = res.payload.role;
        if (checked === false) {
          localStorage.removeItem("userPresent");
        }
        switch (role) {
          case "Role_Partner":
            navigate(`/partner`, { replace: true });
            break;
          case "Role_HR":
            navigate(`/hr`, { replace: true });
            break;
          case "Role_Candidate":
            navigate(`/candidate`, { replace: true });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSaveLogin = (e) => {
    const check = e.target.checked;
    checked = check;
  };

  return (
    <div className="login-form__container">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CustomInput
          label="Tài khoản"
          id="username"
          type="text"
          placeholder="Tài khoản..."
          register={register}
          requirementField={false}
        >
          {errors.username?.message}
        </CustomInput>
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
          visibility={true}
          requirementField={false}
        >
          {errors.password?.message}
        </CustomInput>
        <div className="login-form__save-pass" onChange={handleSaveLogin}>
          <CustomCheckbox label="Lưu phiên đăng nhập" />
        </div>
        <div className="login-form__btn">
          <Button name="ĐĂNG NHẬP" onClick={handleSubmit(onSubmit)}></Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
