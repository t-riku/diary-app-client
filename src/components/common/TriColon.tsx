import React, { useState } from "react";
import Modal, { Styles } from "react-modal";
import styles from "../../styles/Timeline.module.css";
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { PostType } from "../../types";
import { useAuth } from "../../context/auth";
import apiClient from "../../lib/apiClient";
import { Toaster } from "react-hot-toast";
import { success, error } from "../../context/hotToast";

type Props = {
  post: PostType;
  setLatestPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

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
    minWidth: "50%",
    maxHeight: "80%",
    borderRadius: "0.5rem",
    padding: "1.5rem",
  },
};

const TriColon = (props: Props) => {
  const { post } = props;
  const { setLatestPosts } = props;

  const { user } = useAuth();
  // userはnullの場合はLoginしていない場合
  const userId = user ? user.id : null;

  const [isIconClick, setIsIconClick] = useState<boolean>(false);
  const [diaryText, setDiaryText] = useState<string>(post.content);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isSettingResetLoading, setIsSettingResetLoading] =
    useState<boolean>(false);

  const handleDiaryTextChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDiaryText(e.target.value);
  };

  const handleIconClick = () => {
    setIsIconClick(true);
  };

  const handleEditClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (diaryText.length === 0) {
      error("テキストが見つかりません");
      return;
    }
    if (diaryText === post.content) {
      error("同じ内容です");
      return;
    }

    e.preventDefault();
    setIsEditLoading(true);

    try {
      const editedPost = await apiClient.post(`/posts/edit/${post.id}`, {
        content: diaryText,
      });

      setEditModalIsOpen(false);
      setIsIconClick(false);
      setLatestPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
          post.id === editedPost.data.id ? editedPost.data : post
        );

        // もし editedPost.data.id が既存のポストのIDに存在しない場合、新しいポストを先頭に追加
        if (!prevPosts.some((post) => post.id === editedPost.data.id)) {
          return [editedPost.data, ...updatedPosts];
        }

        return updatedPosts;
      });

      success("投稿を更新しました");
    } catch (err) {
      error("投稿の更新に失敗しました");
      console.error("Error calling OPEN AI API:", err);
    }

    setIsEditLoading(false);
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const isConfirmed = window.confirm("本当に削除しますか？");

    if (isConfirmed) {
      e.preventDefault();
      setIsDeleteLoading(true);
      try {
        await apiClient.post(`posts/delete/${post.id}`);
        setLatestPosts((prevPosts) => [...prevPosts]);
        success("投稿を削除しました");
      } catch (err) {
        error("投稿の削除に失敗しました");
        console.error("Error calling OPEN AI API:", err);
      }
      setIsDeleteLoading(false);
    } else {
      return;
    }
  };

  const handleSettingReset = () => {
    setIsSettingResetLoading(true);
    setDiaryText(post.content);
    setIsSettingResetLoading(false);
  };

  return (
    <div>
      {userId === post.authorId &&
        (isIconClick ? (
          <div>
            <button
              onClick={() => {
                setEditModalIsOpen(true);
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 text-sm"
              disabled={isEditLoading ? true : false}
            >
              編集
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
              disabled={isDeleteLoading ? true : false}
            >
              {isDeleteLoading ? "削除中" : "削除"}
            </button>

            <Modal
              isOpen={editModalIsOpen}
              onRequestClose={() => setEditModalIsOpen(false)}
              style={customStyles}
            >
              <div className="mt-5 mb-10 mx-auto w-fit">
                <div className="relative">
                  <button
                    onClick={() => {
                      setEditModalIsOpen(false);
                    }}
                    className="w-12 h-12 absolute -top-6 right-2 bg-rose-600 flex items-center justify-center rounded-full text-white transition-transform transform hover:bg-rose-400"
                  >
                    ×
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold mb-4">日記の編集</h1>
                    <textarea
                      rows={15}
                      cols={50}
                      className="bg-gray-100 my-4 p-4 rounded-lg shadow-inner outline-none transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      placeholder="リセットボタンを押せば元の日記に戻ります"
                      onChange={handleDiaryTextChange}
                      value={diaryText}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {/* 編集ボタン */}
                    <button
                      className={styles.button}
                      onClick={handleEditClick}
                      disabled={isEditLoading ? true : false}
                    >
                      <span
                        className={`${
                          isEditLoading
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
                            isEditLoading
                              ? `${styles.button__text} text-white`
                              : `${styles.button__text} text-black`
                          }`}
                        >
                          {isEditLoading ? "更新中" : "更新"}
                        </span>
                      </div>
                    </button>

                    {/* 元の入力値に戻すボタン */}
                    <button
                      className={`${
                        isSettingResetLoading
                          ? `${styles.button} bg-gray-500`
                          : `${styles.button} bg-blue-500`
                      } `}
                      onClick={handleSettingReset}
                      disabled={isSettingResetLoading ? true : false}
                    >
                      <span
                        className={`${
                          isSettingResetLoading
                            ? `${styles.button__decor} translate-x-0`
                            : `${styles.button__decor} transform -translate-x-full`
                        }`}
                      ></span>
                      <div className={styles.button__content}>
                        <div className={styles.button__icon}>
                          <GrPowerReset />
                        </div>
                        <span
                          className={`${
                            isSettingResetLoading
                              ? `${styles.button__text} text-white`
                              : `${styles.button__text} text-black`
                          }`}
                        >
                          {isSettingResetLoading ? "リセット中" : "リセット"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <button
            onClick={handleIconClick}
            className="px-4 py-2 rounded-md hover:bg-slate-100"
          >
            ...
          </button>
        ))}
      <Toaster />
    </div>
  );
};

export default TriColon;
