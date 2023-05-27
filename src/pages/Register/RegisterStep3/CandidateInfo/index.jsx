import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import './styles.scss'
import ArrowButton from '../../../../components/ArrowButton/index'
import Button from '../../../../components/Button'
import CustomInput from '../../../../components/CustomInput/index'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { errorSelector } from '../../../../store/selectors/main/registerSelectors'
import { genderList, schema } from './data'
import { getMajorList } from '../../../../store/slices/Admin/major/majorSlice'
import SelectCustom from '../../../../components/Select'
import { registerCandidate } from 'src/store/slices/main/register/registerSlice'
import { TabTitle } from 'src/utils/GeneralFunctions'
import {  } from 'src/components/CustomInput/components'
import InputFile from 'src/components/InputFile'

const CandidateInfo = () => {
  TabTitle("Đăng ký - Ứng viên");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const errorMessage = useSelector(errorSelector);
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getMajorList());
  }, [dispatch]);

  // const status = useSelector(statusSelector);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // const step2Data = JSON.parse(sessionStorage.getItem("account"));
    const userData = {
      fileCV: data.cv[0],
      fileAvatar: data.avatar[0],
      candidate: JSON.stringify({
        createUser: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: parseInt(data.gender),
          lastName: data.lastname,
          firstName: data.firstname,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.major),
        },
      }),
    };

    try {
      const res = await dispatch(registerCandidate(userData));
      if (res.payload.status === 200) {
        toast.success("Đăng ký tài khoản thành công");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="reg-candidate">
      <p className="title-requirement">
        (<span className="field-requirment"> * </span>)Trường bắt buộc
      </p>
      <form
        className="reg-candidate__form"
        autoComplete="off"
        encType="multipart/form-data"
      >
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
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
          visibility
        >
          {errors.password?.message}
          {errorMessage?.Password}
        </CustomInput>
        <CustomInput
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          type="password"
          placeholder="Xác nhận mật khẩu"
          register={register}
          visibility
        >
          {errors.confirmPassword?.message}
        </CustomInput>
        <p className="reg-candidate__title-infor">Cập nhật thông tin</p>
        <div className="reg-candidate__form--name">
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
            {errors?.firstname?.message}
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
          {errors.phone?.message}
        </SelectCustom>
        <SelectCustom
          label="Chuyên ngành"
          placeholder="Vui lòng chọn..."
          options={majorList}
          id="major"
          register={register}
        >
          {errors.major?.message}
        </SelectCustom>
        <InputFile
          label="Ảnh đại diện"
          requirementField={false}
          id="avatar"
          format="image"
          setValue={setValue}
          register={register}
        >
          {errors.avatar?.message}
        </InputFile>
        <InputFile
          label="CV"
          requirementField={false}
          id="cv"
          format="pdf"
          setValue={setValue}
          register={register}
        >
          {errors.cv?.message}
        </InputFile>
        <div className="reg-candidate__btns">
          <div className="reg-candidate__btns--item" onClick={handleBackClick}>
            <ArrowButton fontSize="16px" text="Trở lại" direction="left" />
          </div>
          <div className="reg-candidate__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CandidateInfo;
