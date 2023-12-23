import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../context/auth";
import classes from "../styles/Nav.module.css";
import { IoIosSettings } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { log } from "console";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState("/");
  const router = useRouter();

  const handleLogoutClick = () => {
    setActiveNav("/logout");
    logout();
  };

  return (
    <header className="bg-gray-700 bg-gradient-to-br from-teal-600  via-teal-700 to-teal-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="text-2xl font-medium">
            DiaryEase+
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <Link
              href="/"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
            >
              <FaPencilAlt />
              日記作成
            </Link>
            <Link
              href="/viewDiary"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
            >
              <MdLibraryBooks />
              日記一覧
            </Link>
            {user && (
              <Link
                href={`/calendar/${user.id}`}
                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
              >
                <FaRegCalendarAlt />
                カレンダー
              </Link>
            )}
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
                >
                  <IoMdPerson />
                  プロフィール
                </Link>
                <button
                  onClick={logout}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
                >
                  <IoLogIn />
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1 "
                >
                  <IoLogOut />
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
                >
                  <IoMdPersonAdd />
                  サインアップ
                </Link>
              </>
            )}
            <Link
              href="/setting"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
            >
              <IoIosSettings />
              設定
            </Link>
            <Link
              href="/question"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1"
            >
              <FaRegQuestionCircle />
              使い方
            </Link>
          </ul>
        </nav>
        {/* <nav className={classes.nav}>
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
          {user && (
            <Link
              href={`/calendar/${user.id}`}
              onClick={() => setActiveNav("/calendar")}
              className={activeNav === "/calendar" ? classes.active : ""}
            >
              <FaRegCalendarAlt />
            </Link>
          )}
          {user ? (
            <>
              <Link
                href={`/profile/${user.id}`}
                onClick={() => setActiveNav("/profile")}
                className={activeNav === "/profile" ? classes.active : ""}
              >
                <IoMdPerson />
              </Link>
              <button
                onClick={handleLogoutClick}
                className={activeNav === "/logout" ? classes.active : ""}
              >
                <IoLogOut />
              </button>
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
        </nav> */}
      </div>
    </header>
  );
};

export default Navbar;
