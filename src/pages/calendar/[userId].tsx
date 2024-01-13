import { GetServerSideProps } from "next";
import apiClient from "../../lib/apiClient";
import { PostType, Profile } from "../../types";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { insertBreaks } from "../../components/common/insertBreaks";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";

type Props = {
  profile: Profile;
  posts: PostType[];
};

dayjs.locale("ja");

// SNSで頻繁にデータが更新される可能性があるためSSRで実装する
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;

  try {
    const postsResponse = await apiClient.get(`/posts/${userId}`);

    return {
      props: {
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

const Calendar = ({ posts }: Props) => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [filteredContent, setFilteredContent] = useState<string[] | null>(null);
  const [isPostDateArray, setIsPostDateArray] = useState<string[]>([]);

  const month = today.month() + 1;
  const formattedMonth = month < 10 ? "0" + month : month;

  // useEffectを使用してselectedDataが変更されたときにフィルタリングを行う
  useEffect(() => {
    if (!selectDate) {
      return; // selectedDataがnullなら処理をスキップ
    }

    const formattedDate = dayjs(selectDate).format("YYYY-MM-DD");

    // 指定された日付に該当する投稿をフィルタリング
    const filteredPost = posts.filter(
      (post) => dayjs(post.createdAt).format("YYYY-MM-DD") === formattedDate
    );

    // フィルタリングされた投稿のcontentをセット
    setFilteredContent(
      filteredPost ? filteredPost.map((post) => post.content) : null
    );
  }, [selectDate]);

  useEffect(() => {
    if (!today) {
      return;
    }
    const postsArray = posts.filter(
      (post) =>
        dayjs(post.createdAt).format("YYYY-MM") ===
        `${today.year()}-${formattedMonth}`
    );

    const postsDate = postsArray.map((post) =>
      dayjs(post.createdAt).format("YYYY-MM-DD")
    );

    // Setを使用して重複を削除
    const setNums = new Set(postsDate);
    const uniqueNums = Array.from(setNums);

    setIsPostDateArray(uniqueNums);
  }, [today]);

  const JapaneseMonths = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  // 英語の月名を数値に変換し、その後月の値を日本語に変換する関数
  const convertEnglishMonthToJapanese = (englishMonth: string): string => {
    const monthMapping: Record<string, number> = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const numericMonth = monthMapping[englishMonth];

    if (numericMonth) {
      return JapaneseMonths[numericMonth - 1];
    } else {
      return "";
    }
  };

  return (
    <div className="container mx-auto mt-16 max-lg:mt-8">
      <div className="flex gap-10 sm:divide-x justify-center sm:flex-row flex-col items-center">
        <div className="w-96 h-96">
          <div className="flex justify-between items-center">
            <h1 className="select-none font-semibold">
              {today.year()}.
              {convertEnglishMonthToJapanese(months[today.month()])}
            </h1>
            <div className="flex gap-10 items-center ">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className="cursor-pointer hover:scale-105 transition-all text-sm"
                onClick={() => {
                  setToday(currentDate);
                  setSelectDate(currentDate);
                }}
              >
                今日
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 ">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className="grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                const isPostDate = isPostDateArray.some(
                  (postDate) => postDate === date.format("YYYY-MM-DD")
                );
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-red-600 text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none relative"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                      {isPostDate && (
                        <span className="absolute top-[9px] right-2 w-1 h-1 rounded-full bg-green-500"></span>
                      )}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="h-96 w-96 sm:px-5 overflow-y-scroll max-lg:mt-5">
          <h1 className="font-semibold text-lg">
            {dayjs(selectDate).format("YYYY/MM/DD(ddd)")}の日記
          </h1>
          {filteredContent?.length !== 0 ? (
            filteredContent?.map((content, i) => (
              <div key={i} className="mt-4 bg-white p-4 rounded-lg">
                <p>{insertBreaks(content)}</p>
              </div>
            ))
          ) : (
            <div>
              <p className="text-gray-400 pb-4">
                No diary for {dayjs(selectDate).format("YYYY/MM/DD")}.
              </p>

              {dayjs(selectDate).format("YYYY/MM/DD") ===
                dayjs(currentDate).format("YYYY/MM/DD") && (
                <Link
                  href="/"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-2 w-fit hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <FaPencilAlt />
                  <p className="text-sm">今日の日記を作成</p>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
