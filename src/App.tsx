import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = (data: IFormInput) => {
    setIsRegistered(true);
  };

  return (
    <>
      {isRegistered ? (
        <h1>You are registered</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>First Name</label>
          <input
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          {errors?.firstName?.type === "required" && (
            <p>First Name cannot be empty</p>
          )}
          <label>Last Name</label>
          <input
            {...register("lastName", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          {errors?.lastName?.type === "required" && (
            <p>Last Name cannot be empty</p>
          )}
          <label>Email Address</label>
          <input
            {...register("emailAddress", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors?.emailAddress?.type === "required" && (
            <p>Email cannot be empty</p>
          )}
          {errors?.emailAddress?.type === "pattern" && (
            <p>Looks like this is not an email</p>
          )}
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            })}
          />
          {errors?.password?.type === "required" && (
            <p>Password cannot be empty</p>
          )}
          {errors?.password?.type === "pattern" && (
            <p>
              8 Characters long or longer. At least one lowercase letter, one
              uppercase letter, one digit, or symbol
            </p>
          )}
          <input type="submit" />
        </form>
      )}
    </>
  );
}

export default App;
