import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import NavBar from "../partials/header";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(`/api/users`,
        {
          username: data.userName,
          email: data.email,
          password: data.password,
        }
      );

      console.log(response.data);
      alert("User successfully created!");


      const responseAdded = await axios.get(`/api/users/username/${data.userName}`);

      const userId = responseAdded.data._id;
      
      localStorage.setItem("userId", userId);

      // Redirect to the home page with the user ID as a parameter
      navigate(`/`);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again later.");
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <h1 className="mb-4">Sign Up</h1>

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
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <div className="invalid-feedback">Email is required and must be valid</div>
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

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
            id="confirmpassword"
            {...register("confirmpassword", { required: true })}
          />
          {errors.confirmpassword && (
            <div className="invalid-feedback">Confirm Password is required</div>
          )}
        </div>

        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
        <a className="btn btn-outline-primary ms-4" href="/login">
          Login
        </a>
      </form>
    </div>
  );
}

export default LoginForm;
