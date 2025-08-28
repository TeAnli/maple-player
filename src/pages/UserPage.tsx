import React from "react";
import { useAccountStore } from "../store/account";
import UserIcon from "@/assets/icons/Send.svg"
import Folderlist from "@/components/music/Folderlist";
interface InfomationProps {
  title: string,
  data: number,
}

const InfoCard: React.FC<InfomationProps> = ({ title, data = 0 }) => {
  return (
    <div className="bg-neutral-600/20 backdrop-blur-lg rounded-xl p-4 items-center justify-center text-center">
      <p className="text-base text-neutral-600">{title}</p>
      <p className="text-3xl font-bold">{data}</p>
    </div>
  )
}

const UserPage: React.FC = () => {
  const account = useAccountStore();
  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-br text-white p-2 flex flex-col">
      {/* 用户信息卡片 */}
      <div className="backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-white/8">
        <div className="w-full flex flex-row gap-12 p-4">
          <div className="w-full flex flex-row items-end gap-4">
            <div className="relative flex flex-row">
              {
                account.isLogin ?
                  <img
                    src={account.face}
                    alt="用户头像"
                    className="rounded-2xl size-48 object-cover"
                  /> :
                  <img
                    src={UserIcon}
                    alt="用户头像"
                    className="rounded-2xl object-cover size-48 bg-neutral-700"
                  />
              }


            </div>
            <div className="flex flex-col gap-2 py-4">
              <a target="_blank"
                rel="noopener noreferrer"
                href={`https://space.bilibili.com/${account.mid}`}
                className="text-4xl font-bold hover:underline">{account.name || "未登录用户"}</a>
              <p className="text-neutral-400 ">{account.sign || "未知的签名信息"}</p>
              <p className="text-neutral-400 ">UID: {account.mid || "未知uid"} </p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4 items-center justify-center">
            <InfoCard title="关注" data={account.attention}></InfoCard>
            <InfoCard title="粉丝" data={account.fans}></InfoCard>
            <InfoCard title="作品" data={account.archive_count}></InfoCard>
          </div>
        </div>
      </div>
      <Folderlist></Folderlist>
    </div >
  );
};

export default UserPage;
