import React, { ChangeEvent, FC, useEffect, useState } from "react";
import apiClient from "../lib/apiClient";
import {
  topicOptions,
  toneOptions,
  emotionOptions,
  meOptions,
  personOptions,
  diaryFormats,
  textFormats,
  diaryLengthOptions,
  frequencyPenaltyOptions,
  temperatureOptions,
} from "../context/options";
import { FaSave } from "react-icons/fa";
import styles from "../styles/Timeline.module.css";
import { GrPowerReset } from "react-icons/gr";
import { Toaster } from "react-hot-toast";
import { success, error } from "../context/hotToast";
import { useAuth } from "../context/auth";

interface SelectedValues {
  tone: string;
  textFormat: string;
  diaryFormat: string;
  topic: string;
  emotion: string;
  me: string;
  person: string;
}

type Props = {
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialSettingData = {
  tone: "",
  textFormat: "",
  diaryFormat: "",
  topic: "",
  emotion: "",
  me: "",
  person: "",
};

const Setting: FC<Props> = ({ setEditModalIsOpen }) => {
  const [isSettingLoading, setIsSettingLoading] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] =
    useState<SelectedValues>(initialSettingData);
  const [maxToken, setMaxToken] = useState<number>(150);
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(1);
  const [isSettingResetLoading, setIsSettingResetLoading] =
    useState<boolean>(false);

  const { user } = useAuth();
  // userはnullの場合はLoginしていない場合
  const userId = user ? user.id : null;

  const handleSelectChange = (
    field: keyof SelectedValues,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setSelectedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSettingReset = () => {
    setIsSettingResetLoading(true);
    setSelectedValues({
      tone: "",
      textFormat: "",
      diaryFormat: "",
      topic: "",
      emotion: "",
      me: "",
      person: "",
    });
    setMaxToken(150);
    setFrequencyPenalty(0);
    setTemperature(1);
    setIsSettingResetLoading(false);
  };

  // 空文字でないプロパティのみを抽出
  const nonEmptyValues = Object.fromEntries(
    Object.entries(selectedValues).filter(([key, value]) => value !== "")
  );

  const handleSettingSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSettingLoading(true);
    try {
      await apiClient.post(`/chat/setting/save/${userId}`, {
        ...nonEmptyValues,
        maxToken,
        frequencyPenalty,
        temperature,
      });
      success("設定項目の保存に成功しました。");
      setEditModalIsOpen(false);
      setIsSettingLoading(false);
    } catch (err) {
      error("設定項目の保存に失敗しました。");
      console.error("設定項目の保存に失敗しました。", err);
      setIsSettingLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.post(`/chat/setting/get/${userId}`);
        const setting = response.data.settings;
        setSelectedValues((prevValues) => ({
          ...prevValues,
          ...setting,
        }));
        setMaxToken(setting.maxToken);
        setFrequencyPenalty(setting.frequencyPenalty);
        setTemperature(setting.temperature);
      } catch (err) {
        error("設定項目の取得に失敗しました。");
        console.error("Error fetching data:", err);
      }
    };

    if (userId) {
      fetchData(); // userIdが存在する場合のみfetchData関数を実行
    } else {
      // userIdがnullの場合は何もしない
      return () => {};
    }
  }, [userId]); // userIdを依存リストに指定

  return (
    <div className="my-10 mx-auto w-fit">
      <h1 className="text-2xl font-bold mb-4">日記の設定</h1>
      <div className="flex items-center justify-around gap-7 max-lg:flex-col max-lg:gap-0 max-lg:items-start">
        <div>
          {/* 文字数の日記選択 */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2 flex items-center">
              文字数
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => setMaxToken(Number(e.target.value))}
              value={maxToken}
            >
              {diaryLengthOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 口調の選択 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">口調</label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("tone", e)}
              value={selectedValues.tone}
            >
              {toneOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 文字の形式の選択 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              文字の形式
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("textFormat", e)}
              value={selectedValues.textFormat}
            >
              {textFormats.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 日記の形式の選択 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              日記の形式
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("diaryFormat", e)}
              value={selectedValues.diaryFormat}
            >
              {diaryFormats.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 気分や感情の指定 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              気分・感情
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("emotion", e)}
              value={selectedValues.emotion}
            >
              {emotionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          {/* トピックの指定 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">トピック</label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("topic", e)}
              value={selectedValues.topic}
            >
              {topicOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 自分の指定 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              自分の指定
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("me", e)}
              value={selectedValues.me}
            >
              {meOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 相手の指定 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              相手の指定
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => handleSelectChange("person", e)}
              value={selectedValues.person}
            >
              {personOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* frequency_penalty の選択 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">多様性</label>
            <select
              className="border rounded p-2"
              onChange={(e) => setFrequencyPenalty(Number(e.target.value))}
              value={frequencyPenalty}
            >
              <option value={0}>指定なし</option>
              {frequencyPenaltyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* temperature の選択 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              ランダム性
            </label>
            <select
              className="border rounded p-2"
              onChange={(e) => setTemperature(Number(e.target.value))}
              value={temperature}
            >
              <option value={1}>指定なし</option>
              {temperatureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 保存ボタン */}
        <button
          className={`${
            isSettingLoading
              ? `${styles.button} bg-gray-500`
              : `${styles.button} bg-blue-500`
          } mt-4`}
          onClick={(e) => handleSettingSave(e)}
          disabled={isSettingLoading ? true : false}
        >
          <span
            className={`${
              isSettingLoading
                ? `${styles.button__decor} translate-x-0`
                : `${styles.button__decor} transform -translate-x-full`
            }`}
          ></span>
          <div className={styles.button__content}>
            <div className={styles.button__icon}>
              <FaSave />
            </div>
            <span
              className={`${
                isSettingLoading
                  ? `${styles.button__text} text-white`
                  : `${styles.button__text} text-black`
              }`}
            >
              {isSettingLoading ? "保存中" : "保存"}
            </span>
          </div>
        </button>

        {/* 元の入力値に戻すボタン */}
        <button
          className={`${
            isSettingResetLoading
              ? `${styles.button} bg-gray-500`
              : `${styles.button} bg-blue-500`
          } mt-4`}
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
      <Toaster />
    </div>
  );
};

export default Setting;
