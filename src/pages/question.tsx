import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoIosSettings } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import createDiaryImg01 from "../../public/assets/question/createDiary/01.png";

import "react-tabs/style/react-tabs.css";
import Description from "../components/common/Description";

const question = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="flex flex-col items-center">
          <div className="w-full">
            <Tabs className="bg-white rounded-md">
              <TabList className="flex flex-col sm:flex-row">
                <Tab className="text-gray-600 py-4 px-6  hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500 flex items-center gap-1">
                  <FaPencilAlt />
                  日記作成
                </Tab>
                <Tab className="text-gray-600 py-4 px-6 hover:text-blue-500 focus:outline-none flex items-center gap-1">
                  <MdLibraryBooks />
                  日記一覧
                </Tab>
                <Tab className="text-gray-600 py-4 px-6 hover:text-blue-500 focus:outline-none flex items-center gap-1">
                  <FaRegCalendarAlt />
                  カレンダー
                </Tab>
                <Tab className="text-gray-600 py-4 px-6 hover:text-blue-500 focus:outline-none flex items-center gap-1">
                  <IoMdPerson />
                  プロフィール
                </Tab>
                <Tab className="text-gray-600 py-4 px-6 hover:text-blue-500 focus:outline-none flex items-center gap-1">
                  <IoIosSettings />
                  設定
                </Tab>
              </TabList>

              <TabPanel>
                {/* 日記作成 */}
                <div className="px-10 pt-4">
                  <Description
                    type="Summary"
                    text={`日記作成ページでこのページでは主に日記の作成をすることができます。
                    ボタンとしてはテキストエリアに入力した作って欲しい日記の内容をOpen AI APIに送り、
                    日記を作成してもらう「作成」ボタン。実際に日記をDBに保存して日記の一覧で見ることができる様になる
                    「保存」ボタン。作ってもらった日記の候補を削除し、押すだけで簡単にリセットできる「リセット」ボタン。
                    日記をどんなふうに作ってもらうかを指定できる「設定」のアイコンがあり、日記作成ページでも
                    日記を表示して、自分が保存した日記をすぐに確認できるようにしています。`}
                  />
                  <Description
                    stepNumber={1}
                    text={`テキストボックスに嬉しかったことや驚いたことなど今日あった出来事を入力して作成ボタンを押してみましょう。
                    するとAIが日記を作成してくれます。`}
                    imageUrl={createDiaryImg01}
                  />
                  <Description
                    stepNumber={2}
                    text={`するとAIが日記を作成してくれます。`}
                    imageUrl={createDiaryImg01}
                  />
                  <Description
                    stepNumber={3}
                    text={`送信ボタンをクリックして日記を送信してみましょう。`}
                    imageUrl={createDiaryImg01}
                  />
                  <Description
                    stepNumber={4}
                    text={`すると日記が保存され、下にスクロールするか日記一覧ページで保存した日記を確認することができます。`}
                    imageUrl={createDiaryImg01}
                  />
                  <Description
                    type="Supplemental"
                    text={`設定アイコンをクリックして自分好みの設定にして、オリジナルの日記を作成してみてください！`}
                  />
                  <Description
                    exampleNumber={1}
                    text={`文字数：400 口調：絵文字多めにで作った日記。`}
                    imageUrl={createDiaryImg01}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                {/* 日記一覧 */}
                <div className="px-10 pt-4">
                  <Description
                    type="Summary"
                    text={`日記一覧ページでは自分が投稿した日記だけでなく他の人が投稿した日記も閲覧することができるようになっている。
                    自分が保存した日記では...ボタンを押すことで日記を編集したり削除したりすることができる。`}
                  />
                  <Description
                    text={`テキストボックスに嬉しかったことや驚いたことなど今日あった出来事を入力して作成ボタンを押してみましょう。`}
                    imageUrl={createDiaryImg01}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="px-10 pt-4">
                  <h1>カレンダーの使い方です</h1>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="px-10 pt-4">
                  <h1>プロフィールの使い方です</h1>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="px-10 pt-4">
                  <h1>設定の使い方です</h1>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default question;
