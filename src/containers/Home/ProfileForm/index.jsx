import "./styles.scss";
import Button from "src/components/Button";
import ButtonOutline from "src/components/ButtonOutline";
import CustomInput from "src/components/CustomInput";
import { useForm } from "react-hook-form";
import { schema } from "./validateForm";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectCustom from "src/components/Select";
import { useEffect } from "react";
import { genderList } from "./validateForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "src/store/slices/Admin/user/userSlice";
import InputFile from "src/components/InputFile";

const ProfileForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    // setValue("avatar", profile?.user.avatar);
    setValue(
      "firstName",
      profile?.user?.firstName || profile?.userDTO?.firstName
    );
    setValue("lastName", profile?.user?.lastName || profile?.userDTO?.lastName);
    setValue("email", profile?.user?.email || profile?.userDTO?.email);
    setValue("phone", profile?.user?.phone || profile?.userDTO?.phone);
  }, []);

  const onSubmit = (data) => {
    const profileData = {
      hr: JSON.stringify({
        user: {
          username: profile?.user?.username,
          gender: parseInt(data.gender),
          phone: data.phone,
          email: profile?.user?.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: profile?.user?.role,
        },
        position: profile.position,
        company: { id: profile.company?.id },
      }),
      fileAvatar: data.avatar,
    };
    console.log(profileData);
    dispatch(updateUser([profileData, profile.id]));
    handleClose();
  };

  return (
    <>
      <form className="profile-form__wrapper" autoComplete="off">
        <div className="profile-form__content">
          <p className="title-requirement">
            (<span className="field-requirment"> * </span>)Trường bắt buộc
          </p>
          <div className="profile-form__content-item">
            <InputFile
              label="Ảnh đại diện"
              requirementField={false}
              id="avatar"
              format="image"
              radius="2px"
              setValue={setValue}
              register={register}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="lastName"
              label="Họ"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1.6px solid #777777"
            >
              {errors.lastName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="firstName"
              label="Tên"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1.6px solid #777777"
            >
              {errors.firstName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <SelectCustom
              register={register}
              id="gender"
              label="Giới tính"
              defaultValue={profile.user?.gender}
              options={genderList}
            >
              {errors.gender?.message}
            </SelectCustom>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="phone"
              type="text"
              label="Số điện thoại"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1.6px solid #777777"
            >
              {errors.phone?.message}
            </CustomInput>
          </div>
        </div>
      </form>
      <div className="profile-form__action">
        <Button
          name="Lưu"
          onClick={handleSubmit(onSubmit)}
          fz="14px"
          outline="1.5px solid #DEDEDE"
          className="profile-form__action-btn"
        />
        <span style={{ margin: "0 4px" }}></span>
        <ButtonOutline
          name="Hủy"
          onClick={handleClose}
          bg="#F3F4F6"
          outline="1.5px solid #DEDEDE"
          color="#111111"
          fz="14px"
          className="profile-form__action-btn"
          radius="4px"
        />
      </div>
    </>
  );
};

export default ProfileForm;
