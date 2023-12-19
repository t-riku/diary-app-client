import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import { useAuth } from "../context/auth";
import Link from "next/link";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import FormLeftContent from "../components/FormLeftContent ";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const { login } = useAuth();

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
    // <div
    //   style={{ height: "88vh" }}
    //   className="flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    // >
    //   <Head>
    //     <title>ログイン</title>
    //   </Head>
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //       アカウントにログイン
    //     </h2>
    //   </div>
    //   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             メールアドレス
    //           </label>
    //           <input
    //             id="email"
    //             name="email"
    //             type="email"
    //             autoComplete="email"
    //             required
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //               setEmail(e.target.value)
    //             }
    //           />
    //         </div>
    //         <div className="mt-6">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             パスワード
    //           </label>
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             autoComplete="current-password"
    //             required
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //               setPassword(e.target.value)
    //             }
    //           />
    //         </div>
    //         <div className="mt-6">
    //           <button
    //             type="submit"
    //             className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             ログイン
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="w-screen h-screen bg-cover bg-[url('https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg')] flex items-center justify-center">
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="w-10/12 h-4/5 grid grid-cols-12">
        <div className="col-span-7 flex items-center justify-center flex-col">
          <FormLeftContent />
        </div>

        <div className="col-span-5 flex items-center justify-center">
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
              <div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  minLength={6}
                  placeholder="パスワード"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
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
            <span className="text-center text-gray-500 text-xs hover:bg-gray-200 w-max p-2 mx-auto">
              パスワードを忘れた方へ
            </span>
            <Link href="/signup" className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative flex w-2/3 justify-center rounded-md border border-transparent bg-green-600 py-3 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BsFillPersonPlusFill
                    className="h-5 w-5  group-hover:text-gray-100 text-gray-300"
                    aria-hidden="true"
                  />
                </span>
                アカウント作成はこちら
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
