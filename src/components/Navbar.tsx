import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import classes from "../styles/Nav.module.css";
import { IoIosSettings } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import apiClient from "../lib/apiClient";
import Image from "next/image";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<string>("/");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  // userはnullの場合はLoginしていない場合
  const userId = user ? user.id : null;

  const handleLogoutClick = () => {
    setActiveNav("/logout");
    logout();
  };

  useEffect(() => {
    const profileResponse = async () => {
      try {
        const response = await apiClient.get(`/users/profile/${userId}`);
        setProfileImageUrl(response.data.profileImageUrl);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      profileResponse();
    }
  }, [user]);

  return (
    <>
      <header className="bg-gray-700 bg-gradient-to-br from-teal-600  via-teal-700 to-teal-800 p-4 text-white max-lg:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-semibold text-xl">
            <Link href="/" className="text-2xl font-medium">
              DiaryEase+
            </Link>
          </h1>
          <nav className="flex space-x-4 text-xs transition-all">
            <Link
              href="/"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
            >
              <FaPencilAlt />
              <p className="max-lg:hidden">日記作成</p>
            </Link>
            <Link
              href="/viewDiary"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
            >
              <MdLibraryBooks />
              <p className="max-lg:hidden">日記一覧</p>
            </Link>
            {user ? (
              <>
                <Link
                  href={`/calendar/${userId}`}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
                >
                  <FaRegCalendarAlt />
                  <p className="max-lg:hidden">カレンダー</p>
                </Link>
                <button
                  onClick={logout}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
                >
                  <IoLogIn />
                  <p className="max-lg:hidden">ログアウト</p>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
                >
                  <IoLogOut />
                  <p className="max-lg:hidden">ログイン</p>
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
                >
                  <IoMdPersonAdd />
                  <p className="max-lg:hidden">サインアップ</p>
                </Link>
              </>
            )}
            <Link
              href="/setting"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
            >
              <IoIosSettings />
              <p className="max-lg:hidden">設定</p>
            </Link>
            <Link
              href="/question"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 hover:bg-gray-200"
            >
              <FaRegQuestionCircle />
              <p className="max-lg:hidden">使い方</p>
            </Link>
            {user && profileImageUrl && (
              <Link href={`/profile/${userId}`} className="py-[2px] px-1">
                <Image
                  src={profileImageUrl}
                  alt="Picture of the author"
                  className="rounded-full hover:opacity-80"
                  width={31}
                  height={31}
                />
              </Link>
            )}
          </nav>
        </div>
      </header>

      <nav className={`lg:hidden ${classes.nav}`}>
        <Link
          href="/"
          onClick={() => setActiveNav("/home")}
          className={activeNav === "/home" ? classes.active : ""}
        >
          <FaPencilAlt />
        </Link>
        <Link
          href="/viewDiary"
          onClick={() => setActiveNav("/viewDiary")}
          className={activeNav === "/viewDiary" ? classes.active : ""}
        >
          <MdLibraryBooks />
        </Link>
        {user ? (
          <>
            <Link
              href={`/calendar/${userId}`}
              onClick={() => setActiveNav("/calendar")}
              className={activeNav === "/calendar" ? classes.active : ""}
            >
              <FaRegCalendarAlt />
            </Link>
            <a>
              <button
                onClick={handleLogoutClick}
                className={activeNav === "/logout" ? classes.active : ""}
              >
                <IoLogOut />
              </button>
            </a>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={() => setActiveNav("/login")}
              className={activeNav === "/login" ? classes.active : ""}
            >
              <IoLogIn />
            </Link>
            <Link
              href="/signup"
              onClick={() => setActiveNav("/signup")}
              className={activeNav === "/signup" ? classes.active : ""}
            >
              <IoMdPersonAdd />
            </Link>
          </>
        )}
        <Link
          href="/setting"
          onClick={() => setActiveNav("/setting")}
          className={activeNav === "/setting" ? classes.active : ""}
        >
          <IoIosSettings />
        </Link>
        <Link
          href="/question"
          onClick={() => setActiveNav("/question")}
          className={activeNav === "/question" ? classes.active : ""}
        >
          <FaRegQuestionCircle />
        </Link>
        {user && profileImageUrl && (
          <Link
            href={`/profile/${user.id}`}
            onClick={() => setActiveNav("/profile")}
            className={activeNav === "/profile" ? classes.active : ""}
          >
            <Image
              src={profileImageUrl}
              alt="Picture of the author"
              className="rounded-full"
              width={17}
              height={17}
            />
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;
