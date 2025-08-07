import React from "react";
import { useAccountStore } from "../store/account";

const User: React.FC = () => {
  const account = useAccountStore();
  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-br text-white p-6 flex flex-col items-center ">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">个人资料</h1>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10 transition-all duration-300 hover:bg-white/8 w-[36rem]">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img
              src={account.face || "https://picsum.photos/200/200"}
              alt="用户头像"
              className="rounded-full size-36 object-cover border-4 border-primary"
            />
            <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full shadow-lg hover:bg-primary/80 transition-colors"></button>
          </div>
          <h2 className="text-2xl font-bold mb-1">{account.uname || "未登录用户"}</h2>
          <p className="text-gray-400">{account.isLogin ? "已登录" : "未登录"}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="bg-primary/20 p-2 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-400 text-sm">用户名</p>
              <p className="font-medium">{account.uname || "未设置"}</p>
            </div>
          </div>

          {account.isLogin && (
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="bg-primary/20 p-2 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">用户ID</p>
                <p className="font-medium">{account.mid || "未知"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
