import "./styles.scss";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import {
  createMark,
  deleteMark,
  getMarkByUser,
  getMarkByUserAndJob,
} from "src/store/slices/main/mark/markSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import Tooltip from "@mui/material/Tooltip";
const no = process.env.NO_OF_PAGE;
const limit = process.env.LIMIT_OF_PAGE || 5;

const ButtonMark = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  // get global state from redux store
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  const { profile } = useSelector((state) => state.authentication);
  useEffect(() => {
    profile.username !== undefined &&
      dispatch(getCandidateByUserName(profile.username));
  }, []);

  const handleClickMarkJob = async (e) => {
    e.stopPropagation();

    const dataGetMarkByUser = {
      userName: profile.username,
      page: {
        no: 0,
        limit: limit,
      },
    };
    if (props.isMark === false) {
      const dataCareList = {
        candidateCare: {
          id: candidateInfoByUsername.id,
        },
        jobCare: {
          id: props.jobId,
        },
        note: "Đây là công việc ưa thích của mình",
      };

      await dispatch(createMark(dataCareList));
      await dispatch(getMarkByUser(dataGetMarkByUser));
      setMark(!mark);
      toast.success("Đã lưu việc làm thành công");
    } else {
      if (profile.role !== undefined && profile.role === "Role_Candidate") {
        const dataByUserAndJob = {
          userName: profile.username,
          idJob: Number(props.jobId),
          page: {
            no: 0,
            limit: limit,
          },
        };
        const res = await dispatch(getMarkByUserAndJob(dataByUserAndJob));
        await dispatch(deleteMark(res.payload.id));
        await dispatch(getMarkByUser(dataGetMarkByUser));
        setMark(false);
        toast.success("Đã hủy lưu việc làm ");
      }
    }
  };
  const handleLogin = async (e) => {
    e.stopPropagation();
    if (profile.username === undefined) {
      toast.error("Bạn cần đăng nhập với candidate để đánh dấu công việc");
      await navigate("/login");
    } else {
      navigate("/candidate");
    }
  };
  return (
    <Tooltip title="Lưu công việc">
      <IconButton
        style={{
          border: props.border ? props.border : "1px solid #F1F1F1",
          borderRadius: "4px",
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        aria-label="mark"
        className="buttonMark__wrapper"
        onClick={handleClickMarkJob}
      >
        {pathUrl === "/candidate" ||
        pathUrl === "/candidate/information_company/4" ? (
          props.isMark === false && mark === false ? (
            <BookmarkBorderIcon style={{ fontSize: `${props.fontSize}` }} 
            sx={{color: "#04bf8a"}}/>
          ) : (
            <BookmarkIcon
              className="buttonMark__isChecking"
              style={{ fontSize: `${props.fontSize}` }}
              sx={{color: "#04bf8a"}}
            />
          )
        ) : (
          <BookmarkBorderIcon
            style={{ fontSize: `${props.fontSize}` }}
            onClick={handleLogin}
            sx={{color: "#04bf8a"}}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonMark;
