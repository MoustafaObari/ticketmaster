import { useForm } from "react-hook-form";
import axios from "../../axiosConfig";
import { useEffect, useState } from "react";
import NavBar from "../partials/header";

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const userId = localStorage.getItem("userId");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(userId);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`)
      .then((response) => {
        setUserDetails(response.data);

        // Setting form values
        setValue('username', response.data.username);
        setValue('email', response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(`/api/users/${userId}`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log(response.data); 
      alert("User successfully updated!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again later.");
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete? You cannot undo this process.");
    if (confirmDelete) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`)
        .then(() => {
          alert("User Deleted");
          localStorage.removeItem("userId");
          window.location.href = '/';
        })
        .catch((error) => {
          alert("Error deleting user. Please try again later.");
        });
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
        <h1 className="mb-3">Profile</h1>
        
      <div className="mb-3">
        <label htmlFor="username" className="form-label">User Name</label>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          id="username"
          {...register("username", { required: true })}
          defaultValue={userDetails.username}
        />
        {errors.username && (
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
          defaultValue={userDetails.email}
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

        <button className="btn btn-primary" type="submit">Update</button>

        <button
          type="button"
          className="btn btn-outline-danger ms-2"
          onClick={handleDelete}
        >
        Delete
      </button>
      </form>
    </div>
  );
}


export default ProfileForm;
