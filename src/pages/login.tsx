import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import { useAuth } from "../context/auth";
import Link from "next/link";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import FormLeftContent from "../components/FormLeftContent ";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ログインを行うAPIを叩く
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      login(token);

      // 最初のページに飛ばす
      router.push("/");
    } catch (err) {
      alert("入力内容が正しくありません。");
    }
  };
  return (
    <div className="w-screen h-screen bg-cover bg-[url('https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg')] flex items-center justify-center">
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="w-10/12 h-4/5 grid grid-cols-12">
        <div className="col-span-7 flex items-center justify-center flex-col max-xl:hidden">
          <FormLeftContent />
        </div>

        <div className="col-span-5 flex items-center justify-center max-xl:col-span-12">
          <form
            className="h-[420px] w-full p-5 bg-white rounded-xl flex flex-col justify-between shadow-md"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p className="text-center font-semibold text-xl my-3 font-mono">
              ログインしてみよう
            </p>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Eメール"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-3 px-4 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <RiShieldKeyholeFill
                  className="h-5 w-5  group-hover:text-gray-100 text-gray-300"
                  aria-hidden="true"
                />
              </span>
              ログイン
            </button>
            {/* <span className="text-center text-gray-500 text-xs hover:bg-gray-200 w-max p-2 mx-auto">
              パスワードを忘れた方へ
            </span> */}
            <Link href="/signup" className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative flex w-2/3 max-sm:w-full justify-center rounded-md border border-transparent bg-green-600 py-3 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BsFillPersonPlusFill
                    className="h-5 w-5  group-hover:text-gray-100 text-gray-300"
                    aria-hidden="true"
                  />
                </span>
                <p className="max-sm:text-xs">アカウント作成はこちら</p>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
