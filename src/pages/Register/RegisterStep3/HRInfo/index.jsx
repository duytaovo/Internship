import { useEffect } from "react";
import "./styles.scss";
import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registerHr } from "../../../../store/slices/main/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { genderList, schema } from "./handForm";
import { errorSelector } from "src/store/selectors/main/registerSelectors";
import SelectCustom from "../../../../components/Select";
import { getCompanyList } from "src/store/slices/Admin/company/companySlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import InputFile from "src/components/InputFile";

const HRInfo = () => {
  TabTitle("Đăng ký - Nhà tuyển dụng");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(errorSelector);
  const { companyList } = useSelector((state) => state.company);
  const { status } = useSelector((state) => state.register);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getCompanyList([1, 20]));
    if (status === "success") {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data) => {
    const hrData = {
      hr: JSON.stringify({
        user: {
          username: data.username,
          phone: data.phone,
          gender: parseInt(data.gender),
          email: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        position: data.position,
        company: {
          id: parseInt(data.company),
        },
      }),
      fileAvatar: data.avatar || null,
    };
    console.log("hrData", hrData.fileAvatar)
    dispatch(registerHr({ hrData, navigate }));
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="reg-hr">
      <p className="title-requirement">
        (<span className="field-requirment"> * </span>)Trường bắt buộc
      </p>
      <form className="reg-hr__form" autoComplete="off">
        <div className="reg-hr__form--name">
          <CustomInput
            label="Tài khoản"
            id="username"
            type="text"
            placeholder="Tài khoản..."
            register={register}
          >
            {errors.username?.message}
            {errorMessage?.Username}
          </CustomInput>
          <CustomInput
            label="Email"
            id="email"
            type="email"
            placeholder="Email..."
            register={register}
          >
            {errors.email?.message}
            {errorMessage?.Email}
          </CustomInput>
        </div>
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          visibility={true}
          placeholder="Mật khẩu"
          register={register}
        >
          {errors.password?.message}
        </CustomInput>
        <CustomInput
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          type="password"
          visibility={true}
          placeholder="Xác nhận mật khẩu"
          register={register}
        >
          {errors.confirmPassword?.message}
        </CustomInput>
        <p className="reg-hr__title-infor">Cập nhật thông tin</p>
        <div className="reg-hr__form--name">
          <CustomInput
            label="Họ"
            id="lastname"
            type="text"
            placeholder="Họ..."
            register={register}
          >
            {errors.lastname?.message}
          </CustomInput>

          <CustomInput
            label="Tên"
            id="firstname"
            type="text"
            placeholder="Tên..."
            register={register}
          >
            {errors.firstname?.message}
          </CustomInput>
        </div>
        <CustomInput
          label="Số điện thoại"
          id="phone"
          type="phone"
          placeholder="Số điện thoại"
          register={register}
        >
          {errors.phone?.message}
        </CustomInput>
        <SelectCustom
          label="Giới tính"
          placeholder="Vui lòng chọn..."
          options={genderList}
          id="gender"
          register={register}
        >
          {errors.gender?.message}
        </SelectCustom>
        <InputFile
          label="Ảnh đại diện"
          id="avatar"
          format="image"
          register={register}
          setValue={setValue}
          requirementField={false}
        >
          {errors.avatar?.message}
        </InputFile>
        <SelectCustom
          label="Công ty"
          placeholder="Vui lòng chọn..."
          options={companyList}
          id="company"
          register={register}
        >
          {errors.company?.message}
        </SelectCustom>

        <CustomInput
          label="Vai trò tại công ty"
          id="position"
          type="text"
          placeholder="Vị trí..."
          register={register}
        >
          {errors.position?.message}
        </CustomInput>

        <div className="reg-hr__btns">
          <div className="reg-hr__btns--item" onClick={handleBackClick}>
            <ArrowButton fontSize="16px" text="Trở lại" direction="left" />
          </div>
          <div className="reg-hr__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default HRInfo;
