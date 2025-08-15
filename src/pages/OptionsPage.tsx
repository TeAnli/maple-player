import React from 'react';
const OptionsPage: React.FC = () => {

  return (
    // 修改根div元素的className
    <div className="flex flex-col h-full p-2 gap-6 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold">设置</h1>
        <div className='bg-primary w-14 h-1 rounded-md'></div>
      </div>


      {/* 下载设置卡片 */}
      <div className="bg-foreground rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold  mb-4">下载设置</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
          </div>
        </div>
      </div>

      {/* 音频设置卡片 */}
      <div className="bg-foreground rounded-xl p-6 shadow-lg  -gray-200">
        <h2 className="text-xl font-semibold  mb-4">音频设置</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1">音频质量</label>
          </div>
        </div>
      </div>


      {/* 主题设置卡片 */}
      <div className="bg-foreground rounded-xl p-6 shadow-lg ">
        <h2 className="text-xl font-semibold  mb-4">主题设置</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1">选择主题</label>
            <div className="flex gap-3">

            </div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end mt-6">
        <button className="rounded-md bg-green-500 px-6 py-2 hover:bg-green-600 transition-colors">
          保存设置
        </button>
      </div>
    </div>
  );
};

export default OptionsPage;
