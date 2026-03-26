import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import ReactToast from "../components/ReactToast";
import { errorNotify, successNotify } from "../utils/toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

type LoginDataType = {
  username: string;
  password: string;
};

const Login = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDataType>({
    mode: "onChange",
    defaultValues: {
      username: import.meta.env.VITE_EMAIL,
      password: import.meta.env.VITE_PASSWORD,
    },
  });

  const navigate = useNavigate();

  // week1 - 登入按鈕
  const handleLoginSubmit = async (formData: LoginDataType) => {
    try {
      // e.preventDefault();
      const url = `${API_BASE_URL}/v2/admin/signin`;
      const response = await axios.post(url, formData);
      const { token, expired } = response.data;
      document.cookie = `someCookieName=${token}; expires=${new Date(expired)}`;
      // toast
      successNotify(response.data.message);
      // 跳轉回首頁
      navigate("/");
      // fetchProducts();
      // setIsAuthenticated(true);
    } catch (error) {
      // setIsAuthenticated(false);
      if (axios.isAxiosError(error)) {
        errorNotify(error.response?.data.error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-3">
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            {/*  */}
            <div className="form-floating mb-3">
              <input
                type="email"
                id="username"
                // name="username"
                {...register("username", {
                  required: { value: true, message: "email必填" },
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Email格式不正確",
                  },
                })}
                className="form-control"
                // value={account.username}
                placeholder="name@example.com"
                // onChange={(e) => handleLoginInputChange(e)}
              />
              <label htmlFor="username">Email address</label>
              {errors.username ? (
                <p className="text-danger">
                  {errors.username.message as string}
                </p>
              ) : null}
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="floatingPassword"
                // name="password"
                {...register("password", {
                  required: { value: true, message: "密碼必填" },
                  minLength: { value: 6, message: "密碼至少6位數" },
                })}
                placeholder="Password"
                className="form-control"
                // value={account.password}
                // onChange={(e) => handleLoginInputChange(e)}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password ? (
                <p className="text-danger">
                  {errors.password.message as string}
                </p>
              ) : null}
            </div>

            {/*  */}

            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary mt-3 w-100"
            >
              登入
            </button>
            <ReactToast />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
