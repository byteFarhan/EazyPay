import { useForm } from "react-hook-form";
import { LuPhoneCall } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../public/Hooks/useAxiosPublic";
import toast from "react-hot-toast";

// import img from '../../assets/EazyPay.png'
const img_hoisting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imgage_hoisting_key
}`;
const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data) => {
    // console.log(data);
    const { image, ...userInfo } = data;
    // console.log(userInfo);
    const imageFile = {
      image: image[0],
    };
    const imgbbRes = await axiosPublic.post(img_hoisting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    // console.log(imgbbRes);

    if (imgbbRes.data.status === 200) {
      userInfo.image = imgbbRes.data.data.display_url;
    }
    // console.log(userInfo);
    if (imgbbRes.data.success) {
      const res = await axiosPublic.post("/users", userInfo);
      // console.log(res.data);
      if (res.data.insertedId) {
        reset();
        navigate("/");
        toast.success(`Your account created successfully.`);
      } else if (res.data.message === "user already exists!") {
        reset();
        toast.error("User already exists! Login your account.");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full max-w-md"
          >
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-black text-center">
              Register Your Account
            </h3>
            <div>
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Username"
                  {...register("name", { required: true })}
                />
              </div>
              {errors?.name && (
                <span className="text-red-600 font-medium text-sm mt-2">
                  This field is required!
                </span>
              )}
            </div>
            <div>
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                />
              </div>
              {errors?.email && (
                <span className="text-red-600 font-medium text-sm mt-2">
                  This field is required!
                </span>
              )}
            </div>
            <div>
              <div>
                <select
                  defaultValue={"default"}
                  className="block w-full mt-2 px-2.5 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded focus:outline-1 outline-[#D1A054]"
                  {...register("role", { required: true })}
                >
                  <option disabled value={"default"}>
                    Role
                  </option>
                  <option value="user" className="uppercase">
                    user
                  </option>
                  <option value="agent" className="uppercase">
                    agent
                  </option>
                </select>
                {errors.role && (
                  <span className="mt-2 text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <div>
                <input
                  type="file"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  {...register("image", { required: true })}
                />
              </div>
              {errors?.image && (
                <span className="text-red-600 font-medium text-sm mt-2">
                  This field is required!
                </span>
              )}
            </div>

            {/* <div>
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <LuPhoneCall className="size-5 mx-3 text-gray-300 dark:text-gray-500" />
                </span>

                <input
                  type="number"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Phone Number"
                  {...register("phoneNum", { required: true })}
                />
              </div>
              {errors?.phoneNum && (
                <span className="text-red-600 font-medium text-sm mt-2">
                  This field is required!
                </span>
              )}
            </div> */}

            <div>
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              {errors?.password && (
                <span className="text-red-600 font-medium text-sm mt-2">
                  This field is required!
                </span>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Register
              </button>

              <div className="mt-6 text-center ">
                <Link
                  to={"/login"}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
