import React, { ChangeEvent, FC, useState } from "react";
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
  convertTone,
  convertTextFormat,
  convertDiaryFormat,
  convertTopic,
  convertEmotion,
  convertMe,
  convertPerson,
} from "../context/options";
import { FaSave } from "react-icons/fa";
import styles from "../styles/Timeline.module.css";
import { GrPowerReset } from "react-icons/gr";
import { GoNumber } from "react-icons/go";

interface SelectedValues {
  tone: string;
  textFormat: string;
  diaryFormat: string;
  topic: string;
  emotion: string;
  me: string;
  person: string;
}

type ConvertedValues = {
  tone?: string;
  textFormat?: string;
  diaryFormat?: string;
  topic?: string;
  emotion?: string;
  me?: string;
  person?: string;
};

type Props = {
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const setting: FC<Props> = ({ setEditModalIsOpen }) => {
  const [isSettingLoading, setIsSettingLoading] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    tone: "",
    textFormat: "",
    diaryFormat: "",
    topic: "",
    emotion: "",
    me: "",
    person: "",
  });
  const [maxToken, setMaxToken] = useState<number>(150);
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(1);

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
  };

  const handleSettingSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSettingLoading(true);
    try {
      // 空文字でないプロパティのみを抽出
      const nonEmptyValues = Object.fromEntries(
        Object.entries(selectedValues).filter(([key, value]) => value !== "")
      );

      // 各プロパティを変換
      const convertedValues: ConvertedValues = {};
      if (nonEmptyValues.tone) {
        convertedValues.tone = convertTone(nonEmptyValues.tone);
      }
      if (nonEmptyValues.textFormat) {
        convertedValues.textFormat = convertTextFormat(
          nonEmptyValues.textFormat
        );
      }
      if (nonEmptyValues.diaryFormat) {
        convertedValues.diaryFormat = convertDiaryFormat(
          nonEmptyValues.diaryFormat
        );
      }
      if (nonEmptyValues.topic) {
        convertedValues.topic = convertTopic(nonEmptyValues.topic);
      }
      if (nonEmptyValues.emotion) {
        convertedValues.emotion = convertEmotion(nonEmptyValues.emotion);
      }
      if (nonEmptyValues.me) {
        convertedValues.me = convertMe(nonEmptyValues.me);
      }
      if (nonEmptyValues.person) {
        convertedValues.person = convertPerson(nonEmptyValues.person);
      }
      const contextText: string = Object.values(convertedValues)
        .filter(Boolean)
        .join(", ");

      setEditModalIsOpen(false);
      setIsSettingLoading(false);
      window.alert("設定項目の保存に成功しました。");

      await apiClient.post("/chat/setting", {
        contextText,
        maxToken,
        frequencyPenalty,
        temperature,
      });
    } catch (error) {
      setIsSettingLoading(false);
      console.error("設定項目の保存に失敗しました。", error);
    }
  };

  return (
    <div className="my-10 mx-auto w-fit">
      <h1 className="text-2xl font-bold mb-4">日記の設定</h1>

      <div className="">
        {/* 文字数の日記選択 */}
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2 flex items-center">
            <GoNumber />
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
          <label className="block text-sm font-semibold mb-2">文字の形式</label>
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
          <label className="block text-sm font-semibold mb-2">日記の形式</label>
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
          <label className="block text-sm font-semibold mb-2">気分・感情</label>
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
          <label className="block text-sm font-semibold mb-2">自分の指定</label>
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
          <label className="block text-sm font-semibold mb-2">相手の指定</label>
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
          <label className="block text-sm font-semibold mb-2">ランダム性</label>
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
            isSettingLoading
              ? `${styles.button} bg-gray-500`
              : `${styles.button} bg-blue-500`
          } mt-4`}
          onClick={handleSettingReset}
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
              <GrPowerReset />
            </div>
            <span
              className={`${
                isSettingLoading
                  ? `${styles.button__text} text-white`
                  : `${styles.button__text} text-black`
              }`}
            >
              {isSettingLoading ? "リセット中" : "リセット"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default setting;
