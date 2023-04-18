import { useState } from "react";
import { useForm } from "react-hook-form";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import mobileBackgroundImg from "../assets/bg-intro-mobile.png";
import desktopBackgroundImg from "../assets/bg-intro-desktop.png";

interface IFormInput {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

function Form() {
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
      <GlobalStyle />
      <main>
        {isRegistered ? (
          <h1>Great! You are now registered</h1>
        ) : (
          <Flex>
            <InfoWrapper>
              <h1>Learn to code by watching others</h1>
              <p>
                {" "}
                See how experienced developers solve problems in real-time.
                Watching scripted tutorials is great, but understanding how
                developers think is invaluable.{" "}
              </p>
            </InfoWrapper>
            <FormContainer>
              <SaleWrapper>
                <h2>Try it free 7 days then</h2>
                <p>$20/mo. thereafter</p>
              </SaleWrapper>
              <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    placeholder="First Name"
                    color="red"
                    {...register("firstName", {
                      required: true,
                    })}
                  />
                </div>
                {errors?.firstName?.type === "required" && (
                  <span>First Name cannot be empty</span>
                )}

                <div>
                  <input
                    placeholder="Last Name"
                    {...register("lastName", {
                      required: true,
                    })}
                  />
                </div>

                {errors?.lastName?.type === "required" && (
                  <span>Last Name cannot be empty</span>
                )}

                <div>
                  {" "}
                  <input
                    placeholder="Email Address"
                    {...register("emailAddress", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                  />
                </div>
                {errors?.emailAddress?.type === "required" && (
                  <span>Email cannot be empty</span>
                )}
                {errors?.emailAddress?.type === "pattern" && (
                  <span> Looks like this is not an email</span>
                )}

                <div>
                  <input
                    placeholder="Password"
                    type="password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                    })}
                  />
                </div>
                {errors?.password?.type === "required" && (
                  <span>Password cannot be empty</span>
                )}
                {errors?.password?.type === "pattern" && (
                  <span>
                    8 Characters long or longer. At least one lowercase letter,
                    one uppercase letter, one digit, or symbol
                  </span>
                )}
                <button>CLAIM YOUR FREE TRIAL</button>
                <Terms>
                  <p>By clicking the button, you are agreeing to our</p>
                  <span>Terms and Services</span>
                </Terms>
              </FormWrapper>
            </FormContainer>
          </Flex>
        )}
      </main>
    </>
  );
}
enum Colors {
  red = "hsl(0, 100%, 74%)",
  green = "hsl(154, 59%, 51%)",
  greenHover = "hsla(154, 65%, 68%, 1)",
  blue = "hsl(248, 32%, 49%)",
  darkBlue = "hsl(249, 10%, 26%)",
  grayishBlue = "hsl(246, 25%, 77%)",
}

const GlobalStyle = createGlobalStyle`
   * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Poppins,sans-serif;
    text-align: center;
  }

  body {
    background: #ff7a7a;
    background-image: url(${mobileBackgroundImg});
    margin: 0 24px;
    padding: 88px 0;
    color: white;
   @media (min-width:1200px) {
    background-image: url(${desktopBackgroundImg});
   }
  }
  span{
    color: #ff7a7a;
    font-weight: 700;
    font-size: 11px;
    margin-bottom: 10px;
  }
`;

const InfoWrapper = styled.div`
  h1 {
    font-size: 28px;
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 64px;
  }
  @media (min-width: 1200px) {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      text-align: left !important;
      font-size: 50px;
    }
    p {
      text-align: left !important;
    }
  }
`;
const SaleWrapper = styled.div`
  height: 88px;
  background: #6055a5;
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.147);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 15px;
  }
`;
const FormWrapper = styled.form`
  background: #fff;
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.147);
  border-radius: 10px;
  height: 90%;
  padding: 24px;
  margin-top: 24px;

  input {
    margin-bottom: 16px;
    width: 279px;
    height: 56px;
    background: #fff;
    border: 1px solid #dedede;
    border-radius: 5px;
    font-weight: 600;
    width: 90%;
    color: #3e3c49 !important;
  }
  button {
    all: unset;
    background: #38cc8b;
    box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.091);
    border-radius: 5px;
    width: 279px;
    height: 56px;
    cursor: pointer;
    margin-bottom: 8px;
    font-weight: 600;
    width: 90%;
    &:hover {
      background: hsla(154, 65%, 68%, 1);
    }
  }
`;
const Terms = styled.div`
  p {
    color: #b9b6d3;
    font-size: 11px;
    margin-bottom: 10px;
  }
`;
const FormContainer = styled.div`
  @media (min-width: 1200px) {
    width: 40%;
  }
`;
const Flex = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    justify-content: space-evenly;
  }
`;
export default Form;
