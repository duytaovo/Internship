import * as yup from "yup";

export const schema = yup
  .object({
    passwordOld: yup
      .string()
      .required(" * Bạn phải nhập password cũ")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự  ")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu"
      ),
    passwordNew: yup
      .string()
      .required(" * Bạn phải nhập password mới")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự ")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu"
      ),
    confirmPasswordNew: yup
      .string()
      .oneOf([yup.ref("password"), null], " * Mật khẩu chưa khớp."),
  })
  .required();
