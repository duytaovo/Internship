import moment from "moment";
import * as yup from "yup";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();
const dateNow = moment(Date.now()).format("DD-MM-YYYY").toString();
const tomorow = new Date();
const tomorowFormat = moment(tomorow.setDate(tomorow.getDate() + 1)).format(
  "MM-DD-YYYY"
);

export const schemaFormRepost = yup.object({
  name: yup.string().required(" * Bạn phải điền chức danh."),
  jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
  major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
  jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
  amount: yup
    .number()
    .typeError(
      " * Số lượng ứng viên không được để trống hoặc không phải là số."
    )
    .min(1, " * Số lượng ứng viên phải lớn hơn 0. ")
    .integer(" * Số lượng ứng viên phải là số nguyên. "),
  timeStart: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày bắt đầu tuyển dụng.")
    .min(`${date}`, ` * Bạn không thể chọn ngày bắt đầu tuyển ở quá khứ.`),
  timeEnd: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày kết thúc tuyển dụng.")
    .min(yup.ref("timeStart"), " * Ngày hết hạn phải lớn hơn ngày bắt đầu."),
  district: yup.string().required(" * Bạn phải chọn quận/huyện."),
  province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
  country: yup.string().required(" * Bạn phải chọn quốc gia."),
  address: yup.string().required(" * Bạn phải nhập chi tiết địa chỉ."),
  jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
  jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
  benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
  salaryMin: yup
    .number()
    .required(" * Bạn phải nhập mức lương tối thiểu.")
    .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
    .min(1000, " * Số tiền trợ cấp phải lớn hơn 1000."),
  salaryMax: yup
    .number()
    .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
    .min(
      yup.ref("salaryMin"),
      " * Mức trợ cấp tối đa phải lớn hơn hoặc bằng mức tối thiểu."
    ),
});
