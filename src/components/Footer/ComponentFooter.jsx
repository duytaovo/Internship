import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

const ComponentFooter = ({header, tabContent}) => {
  const tabContents = [
    {
      link: "/",
      content: "Trang chủ",
    },
    {
      link: "/",
      content: "Về chúng tôi",
    },
    {
      link: "/",
      content: "Liên hệ",
    },
    {
      link: "/",
      content: "Câu hỏi thường gặp",
    },
  ];
  return (
    <div className="contact__container">
      <div>
        <div className="elementor-column-populated">
          <div className="heading-primary-wrap">
            <h2 style={{textAlign: "left"}} className="heading-primary elementor-heading-title">{header}</h2>
          </div>
          <div className="contact__list">
            <div className="maxcoach-list">
              {tabContent.map((content, i) => (
                <div key={i} className="item">
                  <div className="">
                    <div className="list-header">
                      <div className="text-wrap">
                        <Link to={content.link}>
                          <div className="text">{content.content}</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentFooter;
