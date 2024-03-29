import Head from "next/head";
import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import FormLeftContent from "../components/FormLeftContent ";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { error } from "../context/hotToast";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmationPasswordVisibility = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //パスワードと確認用パスワードが合っているかどうかを確認
    if (password !== passwordConfirmation) {
      error("パスワードと確認用パスワードが異なっています");
    } else {
      try {
        //新規登録を行うAPIを叩く
        await apiClient.post("/auth/register", {
          username,
          email,
          password,
        });
        //   ログインページに飛ばす
        router.push("/login");

        // しょうがなくanyを使う泣
      } catch (err: any) {
        console.log(err);
        if (err.response.data.emailErorr) {
          // サーバーからのエラーレスポンスにemailErorrが含まれている場合
          error(err.response.data.emailErorr);
        } else {
          // それ以外のエラーの場合
          error("入力内容が正しくありません。");
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-cover bg-[url('https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg')] flex items-center justify-center">
      <Head>
        <title>新規登録</title>
      </Head>
      <div className="w-10/12 h-4/5 grid grid-cols-12">
        <div className="col-span-7 flex items-center justify-center flex-col max-xl:hidden">
          <FormLeftContent />
        </div>

        <div className="col-span-5 flex items-center justify-center max-xl:col-span-12">
          <form
            className="h-[480px] w-full p-5 bg-white rounded-xl flex flex-col justify-between shadowーmd"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p className="text-center font-semibold text-xl my-3 font-mono">
              新規登録してみよう
            </p>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="ユーザー名"
                  required
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Eメール"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  className="block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required
                  minLength={6}
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center px-2 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmationPassword ? "text" : "password"}
                  name="confirmationーpassword"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required
                  minLength={6}
                  placeholder="確認用パスワード"
                  value={passwordConfirmation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordConfirmation(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={toggleConfirmationPasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center px-2 cursor-pointer"
                >
                  {showConfirmationPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-3 px-4 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <BsFillPersonPlusFill
                  className="h-5 w-5  group-hover:text-gray-100 text-gray-300"
                  aria-hidden="true"
                />
              </span>
              アカウントを作成
            </button>
            <Link href="/login" className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative flex w-2/3 max-sm:w-full justify-center rounded-md border border-transparent bg-green-600 py-3 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <RiShieldKeyholeFill
                    className="h-5 w-5  group-hover:text-gray-100 text-gray-300"
                    aria-hidden="true"
                  />
                </span>
                <p className="max-sm:text-xs">ログインはこちら</p>
              </button>
            </Link>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
