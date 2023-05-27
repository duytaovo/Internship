import moment from "moment";
import * as yup from "yup";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();
const dateNow = moment(Date.now()).format("DD-MM-YYYY").toString();
const tomorow = new Date();
const tomorowFormat = moment(tomorow.setDate(tomorow.getDate() + 1)).format(
  "MM-DD-YYYY"
);

const fileSV_FORMATS = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
];

// yup validate form post job form
export const schema = yup
  .object({
    jobName: yup.string().required(" * Bạn phải điền chức danh."),
    jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
    major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
    jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
    timeStart: yup
      .date()
      .min(
        `${date}`,
        ` * Bạn không thể chọn ngày bắt đầu tuyển sau ngày ${dateNow}`
      )
      .required(),
    timeEnd: yup
      .date()
      .min(`${tomorowFormat}`, "Ngày hết hạn phải lớn hơn ngày bắt đầu")
      .required(),
    jobDescription: yup.string().required(" * Bạn phải có thư giới thiệu."),
    // jobRequirement: yup.string().required(' * Bạn phải nhập mô tả công việc.'),
    // otherInfo: yup.string(),
    amount: yup
      .number()
      .typeError(
        " * Số lượng ứng viên không được để trống hoặc không phải là số."
      )
      .min(1, " * Số lượng ứng viên phải lớn hơn 0. ")
      .integer(" * Số lượng ứng viên phải là số nguyên. "),
    fileSV: yup
      .mixed()
      .test(
        "fileSize",
        " * Danh sách sinh viên bạn chọn quá lớn. Kích thước tối đa là 512Kb.",
        (value) => {
          if (value?.size) {
            return value && value?.size <= (512 * 1024);
          } else {
            return true;
          }
        }
      )
      .test("type", " * Chỉ hỗ trợ xlsx.", (value) => {
        if (value?.type) {
          return value && fileSV_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      }),
  })
  .required();
