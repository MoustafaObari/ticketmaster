import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../partials/header";
import axios from '../../axiosConfig';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/users/login`, {
        username: data.userName,
        password: data.password,
      });

      // Check if the user was found
      if (response.status === 200) {
        // Assuming the response data contains the user ID
        const userId = response.data.user._id;

        // save userToken to local storage
        // localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userId", userId);
        navigate(`/`);
      } else {
        // Handle the case where the user was not found
        alert("User not found. Please check the username.");
      }
    } catch (error) {
      console.error("Error fetching user by username:", error);
      alert("Error fetching user by username. Please try again later.");
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <h1 className="mb-3">Login</h1>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input
            type="text"
            className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
            id="userName"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <div className="invalid-feedback">User Name is required and must be valid</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>

        <button className="btn btn-primary" type="submit">
          Log In
        </button>

        <a className="btn btn-outline-primary ms-4" href="/signup">
          Sign Up
        </a>
      </form>
    </div>
  );
}

export default LoginForm;
