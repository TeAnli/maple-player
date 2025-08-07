import React from "react";
import { useAccountStore } from "../store/account";
import AuthIcon from "@/assets/icons/Auth.svg"
type InfomationProps = {
  title: string,
  data: string,
}
const InfoCard: React.FC<InfomationProps> = ({ title, data }) => {
  return (
    <div className="bg-neutral-600/20 backdrop-blur-lg rounded-xl p-4 items-center justify-center text-center">
      <p className="text-base text-neutral-600">{title}</p>
      <p className="text-3xl font-bold">{data}</p>
    </div>
  )
}

const User: React.FC = () => {
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
                    src={AuthIcon}
                    alt="用户头像"
                    className="rounded-2xl object-cover size-48 bg-neutral-700"
                  />
              }


            </div>
            <div className="flex flex-col gap-2 py-4">
              <p className="text-4xl font-bold">{account.name || "未登录用户"}</p>
              <p className="text-neutral-400 ">{account.sign || "未知的签名信息"}</p>
              <p className="text-neutral-400 ">UID: {account.mid || "未知uid"} </p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4 items-center justify-center">
            <InfoCard title="关注" data="1211"></InfoCard>
            <InfoCard title="粉丝" data="121"></InfoCard>
            <InfoCard title="动态" data="1211"></InfoCard>

            <InfoCard title="播放数" data="1211"></InfoCard>
          </div>
        </div>
      </div>
    </div >
  );
};

export default User;
