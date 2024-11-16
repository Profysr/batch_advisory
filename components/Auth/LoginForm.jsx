"use client";
import { InputField } from "../Gen/InputField";
import MagicButton from "../Gen/Button";
import { useActionState } from "react";
import { loginFn } from "@/helper/serverActions";

const LoginForm = () => {
  const [state, loginAction] = useActionState(loginFn, undefined);
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center relative overflow-hidden"
      aria-label="Login Form Component"
    >
      <div className="w-full max-w-96 p-8 md:py-12 text-sm flex flex-col gap-6 rounded-lg">
        <div className="text-left font-semibold text-3xl">Login</div>
        <form className="flex flex-col gap-5" action={loginAction}>
          <div className="relative">
            <InputField
              id="email"
              name="email"
              title="Email"
              type="email"
              placeholder="Enter Your Email"
            />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>
          <div className="relative">
            <InputField
              id="password"
              name="password"
              title={"Password"}
              type={"password"}
              placeholder={"Enter Your Password"}
            />
            {state?.errors?.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
          </div>
          <MagicButton title="Sign In" type="submit" otherClasses="!w-full" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
