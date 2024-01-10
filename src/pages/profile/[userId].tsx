import { GetServerSideProps } from "next";
import React, { useState } from "react";
import apiClient from "../../lib/apiClient";
import { PostType, Profile } from "../../types";
import Modal, { Styles } from "react-modal";
import styles from "../../styles/Timeline.module.css";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { SendImageForm } from "../../components/SendImageForm";

type Props = {
  profile: Profile;
  posts: PostType[];
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

// SNSで頻繁にデータが更新される可能性があるためSSRで実装する
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;

  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);

    const postsResponse = await apiClient.get(`/posts/${userId}`);

    return {
      props: {
        profile: profileResponse.data,
        posts: postsResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const UserProfile = ({ profile, posts }: Props) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isResetLoading, setIsResetLoading] = useState<boolean>(false);
  const [isSettingResetLoading, setIsSettingResetLoading] =
    useState<boolean>(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    profile.profileImageUrl
  );
  const [username, setUsername] = useState<string>(profile.user.username);
  const [bio, setBio] = useState<string>(profile.bio);

  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };
  const handleBioChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBio(e.target.value);
  };

  const handleEditProfile = async () => {
    setIsEditLoading(true);
    try {
      await apiClient.post(`/users/profile/edit/${profile.userId}`, {
        profileImageUrl,
        username,
        bio,
      });
      setIsEditLoading(false);
      setEditModalIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <img
                className="w-20 h-20 rounded-full mr-4"
                alt="User Avatar"
                src={profile.profileImageUrl}
              />
              <div className="mt-2">
                <h2 className="text-2xl font-semibold mb-1">
                  {profile.user.username}
                </h2>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditModalIsOpen(true);
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 text-sm"
              disabled={isEditLoading ? true : false}
            >
              編集
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
                    <h1 className="text-2xl font-bold mb-4">
                      プロフィールの編集
                    </h1>

                    <SendImageForm />

                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ユーザー名:
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="bg-gray-100 my-2 p-4 rounded-lg shadow-inner outline-none transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      placeholder="ユーザー名を入力してください"
                      onChange={handleUsernameChange}
                      value={username}
                    />
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      自己紹介文
                    </label>
                    <textarea
                      id="bio"
                      rows={8}
                      cols={50}
                      className="bg-gray-100 my-2 p-4 rounded-lg shadow-inner outline-none transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      placeholder="はじめまして！"
                      onChange={handleBioChange}
                      value={bio}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {/* 編集ボタン */}
                    <button
                      className={styles.button}
                      onClick={handleEditProfile}
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
                      // onClick={handleSettingReset}
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
        </div>
        {posts.map((post: PostType) => (
          <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={profile.profileImageUrl}
                />
                <div>
                  <h2 className="font-semibold text-md">
                    {post.author.username}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
