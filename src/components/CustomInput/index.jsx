import React, { useRef } from "react";
import "./styles.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useEffect } from "react";

const CustomInput = ({
  label,
  id,
  type,
  format,
  placeholder,
  children,
  register,
  unregister = null,
  check = false,
  defaultValue,
  requirementField = true,
  visibility = false,
  className,
  radius,
  height,
  border,
  icon,
  setValue,
}) => {
  useEffect(() => {
    if (check) {
      unregister(id);
    }
  }, [check, id, unregister]);

  const [isHide, setIsHide] = useState(false);
  const handleHide = () => {
    setIsHide(!isHide);
  };

  return (
    <div className={`custom-input ${className ? className : ""} `}>
      <label htmlFor={id} className="custom-input__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
      </label>
      <div
        className={` ${type === "file" && "file-input"}
          ${
            check
              ? "custom-input__textfield-disabled"
              : "custom-input__textfield"
          }
          
        `}
      >
        {icon}
        <input
          style={{
            borderRadius: radius ? radius : "",
            height: height ? height : "",
            border: border ? border : "",
          }}
          type={type === "password" ? (isHide ? "text" : "password") : type}
          id={id}
          placeholder={placeholder}
          disabled={check}
          {...register(id)}
        />
        {check ? null : <p className="custom-input__error">{children}</p>}
        {visibility && (
          <div
            className="visibility-icon"
            onClick={handleHide}
          >
            {isHide ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
