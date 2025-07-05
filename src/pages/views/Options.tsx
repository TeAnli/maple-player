import React from 'react';
import InputField from '../../components/InputField';

const Options: React.FC = () => {
  return (
    <div className="flex-1 flex-col w-full h-full p-6 gap-4">
      <div className="size-96 rounded-md shadow-md p-4">
        歌曲下载路径

        <InputField
          className=""
          type="file"
          placeholder="请输入歌曲下载路径"
          onChange={(value) => {
          }}
        />
      </div>

    </div>
  );
};

export default Options;

