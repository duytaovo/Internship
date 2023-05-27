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
];

const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const CV_FORMATS = ["application/pdf"];

export const schema = yup.object({
  username: yup
    .string()
    .required(" * Bạn phải nhập tài khoản.")
    .min(6, " * Tài khoản cần phải có ít nhất 6 ký tự."),
  email: yup
    .string()
    .required(" * Bạn phải nhập email.")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      " * Vui lòng nhập lại email"
    ),
  password: yup
    .string()
    .required(" * Bạn phải nhập password.")
    .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự bao gồm chữ hoa và số.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
      " * Vui lòng nhập lại mật khẩu"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], " * Mật khẩu chưa khớp."),
  firstname: yup.string().required("* Bạn phải nhập tên."),
  lastname: yup.string().required("* Bạn phải nhập họ."),
  phone: yup
    .string()
    .required(" * Bạn phải nhập số điện thoại.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      " * Số điện thoại không đúng."
    ),
  gender: yup.string().required(" * Bạn phải chọn giới tính."),
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
  major: yup.string().required("* Bạn phải chọn chuyên ngành."),
  cv: yup
    .mixed()
    .test("type", " * CV phải là file có đuôi là: .pdf", (value) => {
      return value && CV_FORMATS.includes(value?.type);
    })
    .test("fileSize", " * CV vượt quá kích thước 500kb", (value) => {
      return value && value?.size <= 512000;
    }),
  // .required("Bạn phải tải CV lên"),
});
//   .required();
