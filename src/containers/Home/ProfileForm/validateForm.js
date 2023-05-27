import * as yup from "yup";

export const genderList = [
  {
    id: 0,
    name: "Nam",
  },
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Khác",
  },
];

const IMAGE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/bmp",
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object({
  avatar: yup
    .mixed()
    .nullable()
    .test(
      "fileSize",
      " * Ảnh bạn chọn quá lớn. Kích thước tối đa là 512Kb.",
      (value) => {
        if (value?.size) {
          return value?.size <= 512 * 1024;
        } else {
          return true;
        }
      }
    )
    .test("type", " * Chỉ hỗ trợ .jpeg, .jpg, .png, .gif. , .bmp", (value) => {
      if (value?.type) {
        return IMAGE_FORMATS.includes(value?.type);
      } else {
        return true;
      }
    }),
  lastName: yup.string().required(" * Họ của bạn không được để trống."),
  firstName: yup.string().required(" * Tên của bạn không được để trống."),
  phone: yup
    .string()
    .required(" * Số điện thoại của bạn không được để trống.")
    .matches(phoneRegExp, " * Số điện thoại không đúng."),
  gender: yup.string().required(),
});
