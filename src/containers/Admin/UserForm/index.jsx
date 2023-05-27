import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import Button from "../../../components/Button";
import { roleList, schema } from "./handleForm.js";
import InputFile from "src/components/InputFile";
import CustomSelect from "src/components/CustomSelect";
import { genderList } from "src/pages/Register/RegisterStep3/PartnerInfo/data";

const UserForm = (props) => {
  const { isAdd } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <form autoComplete="off" className="user-form">
        <div className="user-form__wrapper">
          <div className="user-form__avatar">
            <InputFile
              label="Ảnh đại diện"
              requirementField={false}
              id="avatar"
              format="image"
              className="avatar-input"
              setValue={setValue}
              register={register}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="user-form__input-infor">
            <div className="row">
              <CustomInput
                id="username"
                label="Tên tài khoản"
                className="user-form__input-item"
                type="text"
                placeholder="vd. abcdef..."
                register={register}
              >
                {errors.username?.message}
              </CustomInput>
              <CustomInput
                id="email"
                className="user-form__input-item"
                label="Email"
                type="email"
                placeholder="vd. abc@gmail.com..."
                register={register}
              >
                {errors.email?.message}
              </CustomInput>
            </div>
            <div className="row">
              <CustomInput
                id="password"
                className="user-form__input-item"
                label="Mật khẩu"
                type="password"
                visibility={true}
                placeholder="vd. Abc123..."
                register={register}
              >
                {errors.password?.message}
              </CustomInput>
              <CustomInput
                id="confirmPassword"
                className="user-form__input-item"
                label="Xác nhận mật khẩu"
                type="password"
                visibility={true}
                placeholder="vd. Abc123..."
                register={register}
              >
                {errors.confirmPassword?.message}
              </CustomInput>
            </div>
            <div className="row">
              <CustomInput
                id="firstName"
                className="user-form__input-item"
                label="Họ"
                type="text"
                placeholder="vd. Nguyễn Văn..."
                register={register}
              >
                {errors.firstName?.message}
              </CustomInput>
              <CustomInput
                id="lastName"
                className="user-form__input-item"
                label="Tên"
                type="text"
                placeholder="vd. An..."
                register={register}
              >
                {errors.lastName?.message}
              </CustomInput>
            </div>
            <div className="row">
              <CustomInput
                id="phone"
                className="user-form__input-item"
                label="Số điện thoại"
                type="tel"
                placeholder="vd. 0964xxx473..."
                register={register}
              >
                {errors.phone?.message}
              </CustomInput>
              <CustomSelect
                id="gender"
                className="user-form__input-item"
                label="Giới tính"
                placeholder="Chọn giới tính..."
                register={register}
                options={genderList}
              >
                {errors.gender?.message}
              </CustomSelect>
            </div>
            <div className="row">
              <CustomSelect
                id="role"
                className="user-form__input-item"
                label="Vai trò"
                placeholder="Chọn vai trò..."
                register={register}
                options={roleList}
              >
                {errors.role?.message}
              </CustomSelect>
            </div>
          </div>
        </div>
        <div className="user-form__submit">
          <Button name="Thêm người dùng" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </>
  );
};

export default UserForm;
