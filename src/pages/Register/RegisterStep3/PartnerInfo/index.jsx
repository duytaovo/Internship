import React, { useEffect } from "react";
import "./styles.scss";
import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput/index";
import Select from "../../../../components/Select";
import SelectCustom from "src/components/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { addUniversity } from "src/store/slices/Admin/university/unversitySlice";
import { useDispatch, useSelector } from "react-redux";
import { genderList, schema } from "./data";
import { errorSelector } from "src/store/selectors/main/registerSelectors";
import { TabTitle } from "src/utils/GeneralFunctions";
import { toast } from "react-toastify";
import {
  getProvinceList,
  getDistrictList,
} from "src/store/slices/location/locationSlice";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import Textarea from "src/components/Textarea";
import InputFile from "src/components/InputFile";

const countryList = [
  {
    id: 84,
    name: "Việt Nam",
  },
];

const PartnerInfo = () => {
  TabTitle("Đăng ký - Cộng tác viên trường");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { districtList, provinceList } = useSelector((state) => state.location);
  const { majorList } = useSelector((state) => state.major);
  const { status } = useSelector(state => state.university);
  const errorMessage = useSelector(errorSelector);

  useEffect(() => {
    dispatch(getMajorList());
    dispatch(getProvinceList());
  }, []);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = async (data) => {
    // const data = JSON.parse(sessionStorage.getItem("account"));
    const partnerData = {
      avatarUser: data.avatar[0],
      logo: data.logo[0],
      university: JSON.stringify({
        name: data.schoolName,
        shortName: data.shortName,
        email: data.emailSchool,
        description: "mô tả",
        website: data.website,
        phone: data.phoneSchool,
        majors: [
          {
            id: data.major,
          },
        ],
        location: [
          {
            district: {
              id: data.district,
            },
            address: data.address,
            note: "",
          },
        ],
      }),
      partner: JSON.stringify({
        position: data.position,
        userCreationDTO: {
          username: data.username,
          password: data.password,
          confirmPassword: data.passwordConfirmation,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          gender: parseInt(data.gender),
          email: data.email,
          role: {
            id: 4,
          },
        },
      }),
    };
    console.log(partnerData);
    dispatch(addUniversity(partnerData))

    if (status === "success") {
      navigate('/login')
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="reg-partner">
      <p className="title-requirement">
        (<span className="field-requirment"> * </span>)Trường bắt buộc
      </p>
      <form
        className="reg-partner__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="section-input__container">
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
        <div className="section-input__container">
          <CustomInput
            label="Mật khẩu"
            id="password"
            type="password"
            placeholder="Mật khẩu"
            register={register}
            visibility={true}
            requirementField={true}
          >
            {errors.password?.message}
            {errorMessage?.Password}
          </CustomInput>

          <CustomInput
            label="Xác nhận mật khẩu"
            id="passwordConfirmation"
            type="password"
            placeholder="Xác nhận mật khẩu"
            register={register}
            visibility={true}
            requirementField={true}
          >
            {errors.passwordConfirmation?.message}
          </CustomInput>
        </div>

        <p className="reg-partner__title-infor">Cập nhật thông tin</p>
        <div className="reg-partner__form--name">
          <CustomInput
            label="Họ"
            id="lastName"
            type="text"
            placeholder="Họ..."
            register={register}
          >
            {errors.lastName?.message}
          </CustomInput>

          <CustomInput
            label="Tên"
            id="firstName"
            type="text"
            placeholder="Tên..."
            register={register}
          >
            {errors.firstName?.message}
          </CustomInput>
        </div>

        <div className="section-input__container">
          <CustomInput
            label="Số điện thoại"
            id="phone"
            type="phone"
            placeholder="Vd. 999-999-9999"
            register={register}
          >
            {errors.phone?.message}
          </CustomInput>

          <div className="gender-container-partner-page">
            <Select
              label="Giới tính"
              placeholder="Vui lòng chọn..."
              options={genderList}
              id="gender"
              register={register}
            />
          </div>
        </div>

        <div className="reg-partner__form--name">
          <InputFile
            label="Ảnh đại diện"
            id="avatar"
            type="file"
            format="image"
            register={register}
            setValue={setValue}
            // check={true}
          >
            {errors.avatar?.message}
          </InputFile>

          <InputFile
            label="Logo Trường"
            id="logo"
            type="file"
            format="image"
            setValue={setValue}
            register={register}
            // check={true}
          >
            {errors.logo?.message}
          </InputFile>
        </div>

        <div className="section-input__container">
          <CustomInput
            label="Tên trường"
            type="text"
            id="schoolName"
            placeholder="Vd. Đại học Bách Khoa"
            register={register}
          >
            {errors.schoolName?.message}
          </CustomInput>
          <CustomInput
            label="Tên viết tắt của trường"
            type="text"
            id="shortName"
            placeholder="Vd. hust"
            register={register}
          >
            {errors.shortName?.message}
          </CustomInput>
        </div>

        <div className="section-input__container">
          <CustomInput
            label="Vai trò tại trường"
            id="position"
            type="text"
            placeholder="Vai trò tại trường"
            register={register}
          >
            {errors.position?.message}
          </CustomInput>

          <CustomInput
            label="Website"
            id="website"
            type="text"
            placeholder="Vd. hust.edu.vn"
            register={register}
          >
            {errors.website?.message}
          </CustomInput>
        </div>

        <div className="section-input__container">
          <CustomInput
            label="Email của Trường"
            id="emailSchool"
            type="email"
            placeholder="Email"
            register={register}
          >
            {errors.emailSchool?.message}
          </CustomInput>
          <CustomInput
            label="Số điện thoại của Trường"
            id="phoneSchool"
            type="text"
            placeholder="Vd. 999-999-9999"
            register={register}
          >
            {errors.phoneSchool?.message}
          </CustomInput>
        </div>

        <SelectCustom
          id="major"
          label="Chuyên ngành"
          placeholder="Vui lòng chọn"
          options={majorList}
          register={register}
        >
          {errors.major?.message}
        </SelectCustom>
        <div className={"row-3-col"}>
          <div className={"university-register__select-location"}>
            <SelectCustom
              id="country"
              label="Quốc gia"
              placeholder="Vui lòng chọn"
              options={countryList}
              register={register}
            >
              {errors.country?.message}
            </SelectCustom>
          </div>
          <div className={"university-register__select-location"}>
            <SelectCustom
              id="province"
              label="Tỉnh/Thành phố"
              placeholder="Vui lòng chọn"
              dispatch={dispatch}
              action={getDistrictList}
              options={provinceList}
              register={register}
            >
              {errors.province?.message}
            </SelectCustom>
          </div>
          <div className={"university-register__select-location"}>
            <SelectCustom
              id="district"
              label="Quận/Huyện"
              placeholder="Vui lòng chọn"
              options={districtList}
              register={register}
            >
              {errors.district?.message}
            </SelectCustom>
          </div>
        </div>
        <CustomInput
          label="Địa chỉ"
          id="address"
          type="text"
          placeholder="Vd. 254, Dương Đình Hội"
          register={register}
        >
          {errors.address?.message}
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

export default PartnerInfo;
