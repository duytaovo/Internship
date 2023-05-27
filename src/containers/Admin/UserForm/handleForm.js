import * as yup from "yup";

// yup validation for company table
const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const IMAGE_TYPES = [
  "image/img",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/bmp",
];
export const schema = yup
  .object({
    avatar: yup
      .mixed()
      .nullable()
      .test("FILE_SIZE", " * Kích thước ảnh quá lớn.", (value) => {
        if (value?.size) {
          return value?.size <= 512 * 1024;
        } else return true;
      })
      .test(
        "FILE_TYPE",
        ` * Chỉ hỗ trợ ${IMAGE_TYPES.map((str) => {
          return " " + "." + str;
        })}.`,
        (value) => {
          if (value?.type) {
            return IMAGE_TYPES.includes(value?.type);
          } else return true;
        }
      ),
    username: yup
      .string()
      .required(" * Bạn phải nhập tên đăng nhập cho người dùng.")
      .min(6, " * Tên tài khoản phải lơn hơn 5 kí tự."),
    password: yup
      .string()
      .required(" * Bạn phải nhập mật khẩu cho người dùng.")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        "Vui lòng nhập lại mật khẩu."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], " * Mật khẩu chưa khớp."),
    email: yup
      .string()
      .required(" * Bạn phải nhập email cho người dùng.")
      .matches(email_regex, " * Email không hợp lệ."),
    phone: yup
      .string()
      .required(" * Bạn phải nhập số điện thoại cho người dùng.")
      .min(10, " * Số điện thoại không đúng")
      .max(11, " * Số điện thoại không đúng.")
      .matches(vnf_regex, " * Số điện thoại không đúng."),
    firstName: yup.string().required(" * Bạn phải nhập họ cho người dùng."),
    lastName: yup.string().required(" * Bạn phải nhập tên cho người dùng."),
    gender: yup.string().required(" * Bạn phải chọn giới tính cho người dùng."),
    role: yup.string().required(" * Bạn phải chọn vai trò cho người dùng."),
  })
  .required();

// list gender
export const genderList = [
  { name: "Nam", id: 0 },
  { name: "Nữ", id: 1 },
  { name: "Khác", id: 2 },
];

// list gender
export const roleList = [
  { name: "Ứng viên", id: 3 },
  { name: "Nhà tuyển dụng", id: 1 },
  { name: "Cộng tác viên", id: 4 },
];
