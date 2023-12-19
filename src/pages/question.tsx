import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoIosSettings } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";

import "react-tabs/style/react-tabs.css";

const question = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="flex flex-col items-center">
          <div className="w-full">
            <div className="bg-gray-100 w-full p-4  overflow-y-scroll rounded-lg">
              <div className="text-gray-900 py-2 px-3 rounded-lg font-medium flex items-center gap-1">
                <FaRegQuestionCircle />
                <span className="text-center block font-bold text-2xl">
                  使い方
                </span>
              </div>
            </div>

            <Tabs className="bg-white">
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
                <h1>日記作成の使い方です</h1>
              </TabPanel>
              <TabPanel>
                <h1>日記一覧の使い方です</h1>
              </TabPanel>
              <TabPanel>
                <h1>カレンダーの使い方です</h1>
              </TabPanel>
              <TabPanel>
                <h1>プロフィールの使い方です</h1>
              </TabPanel>
              <TabPanel>
                <h1>設定の使い方です</h1>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default question;
