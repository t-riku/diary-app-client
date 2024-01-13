import React, { useEffect, useState } from "react";
import Post from "./Post";
import { PostType } from "../types";
import styles from "../styles/Timeline.module.css";
import { IoIosSend, IoIosSettings } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import apiClient from "../lib/apiClient";
import Modal, { Styles } from "react-modal";
import Setting from "./Setting";
import { insertBreaks } from "../components/common/insertBreaks";
import { Toaster } from "react-hot-toast";
import { success, error } from "../context/hotToast";
import { useAuth } from "../context/auth";
import Button from "./common/Button";

const customStyles: Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "55%",
    maxHeight: "80%",
    borderRadius: "0.5rem",
    padding: "1.5rem",
  },
};

interface Message {
  sender: string;
  text: string;
}

const CreateDiary = () => {
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
  const [isDiaryLoading, setIsDiaryLoading] = useState<boolean>(false);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [isResetLoading, setIsResetLoading] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const { user } = useAuth();
  // userはnullの場合はLoginしていない場合
  const userId = user ? user.id : null;

  const handleQuestionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
  };

  const handleAnswerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!message) {
      error("テキストを入力してください。");
      return;
    }

    e.preventDefault();
    setIsMessageLoading(true);

    try {
      const { data } = await apiClient.post(`/chat/content/${userId}`, {
        message,
      }); // 質問をサーバーに送信

      setMessages((prevMessages): any => [
        ...prevMessages,
        { sender: "user", text: message },
        { sender: "system", text: data.answer },
      ]);
    } catch (err) {
      error("ログインしてください");
      // error("日記の作成に失敗しました");
      console.error("Error calling OPEN AI API:", err);
    }

    setMessage("");
    setIsMessageLoading(false);
  };

  const handleDiarySubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (messages.length === 0) {
      error("テキストを入力して、送信ボタンを押してください");
      return;
    }

    const diaryText = [...messages].pop()?.text;

    if (diaryText === message) {
      const isConfirmed = window.confirm(
        "送信した日記と同じ内容ですがよろしいですか？"
      );
      if (!isConfirmed) return;
    }

    e.preventDefault();
    setIsDiaryLoading(true);

    try {
      const newPost = await apiClient.post("/posts/post", {
        content: diaryText,
      });

      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);
      success("日記が送信されました");
    } catch (err) {
      error("日記の送信に失敗しました。");
      console.error("Error calling OPEN AI API:", err);
    }
    setIsDiaryLoading(false);
  };

  const handleReset = () => {
    if (!messages) {
      error("リセットする日記項目がないです");
    }

    setIsResetLoading(true);
    setMessages([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsResetLoading(false);
  };

  useEffect(() => {
    setIsPostsLoading(true);
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatestPosts();
    setIsPostsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="flex flex-col items-center">
          <div className="max-w-lg w-full">
            <div className="bg-gray-100 w-full pt-4 pb-2 rounded-lg">
              <span className="text-center block font-bold text-2xl border-b-2 border-inigo-400 p-2">
                日記を作ってみよう！
              </span>
              {messages.map((message, i) => (
                <div
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mt-4 mb-2 pt-2`}
                  key={i}
                >
                  <div
                    className={`${
                      i === messages.length - 1
                        ? styles.border__grad__block
                        : "" // 最後のメッセージにはボーダーでキラキラしたスタイルを追加
                    }`}
                  >
                    <div
                      className={`${
                        message.sender === "user"
                          ? "bg-indigo-400 text-white"
                          : "bg-gray-200"
                      } p-2 rounded-md ${
                        i === messages.length - 1
                          ? styles.border__grad__content
                          : "" // 最後のメッセージにボーダーでキラキラしたスタイルを追加
                      }`}
                    >
                      {insertBreaks(message.text)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isMessageLoading && (
              <div className={styles.loading}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg w-full gap-3">
              <textarea
                onChange={handleQuestionChange}
                rows={5}
                cols={50}
                className="flex-1 border-2 py-2 px-4 rounded-lg shadow-inner outline-none transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                placeholder="日記を作成しましょう！（嬉しかったことや、特別な日のこと、人生の目標への思いなど、様々なことを文章にしましょう。）"
                value={message}
              />

              <div className="flex flex-col">
                <button
                  className={`${
                    isMessageLoading
                      ? `${styles.button} bg-gray-500`
                      : `${styles.button} bg-blue-500`
                  } mb-2`}
                  onClick={handleAnswerSubmit}
                  disabled={isMessageLoading ? true : false}
                >
                  <span
                    className={`${
                      isMessageLoading
                        ? `${styles.button__decor} translate-x-0`
                        : `${styles.button__decor} transform -translate-x-full`
                    }`}
                  ></span>
                  <div className={styles.button__content}>
                    <div className={styles.button__icon}>
                      <FaPencilAlt />
                    </div>
                    <span
                      className={`${
                        isMessageLoading
                          ? `${styles.button__text} text-white`
                          : `${styles.button__text} text-black`
                      }`}
                    >
                      {isMessageLoading ? "作成中" : "作成"}
                    </span>
                  </div>
                </button>
                <button
                  className={styles.button}
                  onClick={handleReset}
                  disabled={isResetLoading ? true : false}
                >
                  <span
                    className={`${
                      isResetLoading
                        ? `${styles.button__decor} translate-x-0`
                        : `${styles.button__decor} transform -translate-x-full`
                    }`}
                  ></span>
                  <div className={styles.button__content}>
                    <div className={styles.button__icon}>
                      <MdDelete />
                    </div>
                    <span
                      className={`${
                        isResetLoading
                          ? `${styles.button__text} text-white`
                          : `${styles.button__text} text-black`
                      }`}
                    >
                      {isResetLoading ? "リセット中" : "リセット"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around gap-4 mt-3">
            <button
              className={`${
                isDiaryLoading
                  ? `${styles.button} bg-gray-500`
                  : `${styles.button} bg-blue-500`
              }`}
              onClick={handleDiarySubmit}
              disabled={isDiaryLoading ? true : false}
            >
              <span
                className={`${
                  isDiaryLoading
                    ? `${styles.button__decor} translate-x-0`
                    : `${styles.button__decor} transform -translate-x-full`
                }`}
              ></span>
              <div className={styles.button__content}>
                <div className={styles.button__icon}>
                  <IoIosSend />
                </div>
                <span
                  className={`${
                    isDiaryLoading
                      ? `${styles.button__text} text-white`
                      : `${styles.button__text} text-black`
                  }`}
                >
                  {isDiaryLoading ? "送信中" : "送信"}
                </span>
              </div>
            </button>

            {/* <Button
              onClick={handleDiarySubmit}
              loading={false}
              text="送信"
              type="send"
            /> */}

            <button
              onClick={() => {
                setEditModalIsOpen(true);
              }}
              className="flex justify-center items-center gap-2 w-20 h-12 ml-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] hover:shadow-md hover:shadow-green-500  duration-300 hover:from-[#047857] hover:to-[#14b8a6]"
            >
              <IoIosSettings fontSize={25} />
            </button>
          </div>

          <Modal
            isOpen={editModalIsOpen}
            onRequestClose={() => setEditModalIsOpen(false)}
            style={customStyles}
          >
            <div className="relative">
              <button
                onClick={() => {
                  setEditModalIsOpen(false);
                }}
                className="w-12 h-12 absolute -top-8 right-2 bg-rose-600 flex items-center justify-center rounded-full text-white transition-transform transform hover:bg-rose-400"
              >
                ×
              </button>
              <Setting setEditModalIsOpen={setEditModalIsOpen} />
            </div>
          </Modal>
        </div>

        <div className="mt-10">
          {isPostsLoading ? (
            <div className={styles.loading}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div>
              {latestPosts.map((post: PostType) => (
                <Post
                  key={post.id}
                  post={post}
                  setLatestPosts={setLatestPosts}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default CreateDiary;
