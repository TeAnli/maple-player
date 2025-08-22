import Volume from "../assets/icons/Volume.svg";
import Volume1 from "../assets/icons/Volume 1.svg";
import Volume2 from "../assets/icons/Volume 2.svg";
import VolumeX from "../assets/icons/Volume x.svg";
import ColorThief from "colorthief";
/**
 * 通过当前的音量大小，获取特定的图标
 * @param volume 音量大小 范围在 [0, 1]
 * @returns 音量图标
 */
export function formatVolume(volume: number) {
  if (volume > 0.7) {
    return Volume2;
  } else if (volume <= 0.7 && volume > 0.3) {
    return Volume1;
  } else if (volume <= 0.3 && volume > 0.01) {
    return Volume;
  } else {
    return VolumeX;
  }
}
/**
 * 格式化当前时间
 * @param time 经过的秒数
 * @returns 格式化后的时间 例：00:01
 */
export function formatTime(time: number): string {
  let secondsText: string = "00";
  let minutesText: string = "00";
  let minute = Math.floor(time / 60);
  let second = Math.round(time % 60);
  if (second > 0 && second < 10) {
    secondsText = `0${second}`;
  } else if (second >= 10 && second < 60) {
    secondsText = second.toString();
  }
  if (second == 60) {
    minute += 1;
  }
  if (minute > 0 && minute < 10) {
    minutesText = `0${minute}`;
  } else if (minute >= 10 && minute < 60) {
    minutesText = minute.toString();
  }
  return `${minutesText}:${secondsText}`;
}

/**
 * 转换音视频链接为代理服务器链接来获取音视频数据
 * @param url 音视频地址
 * @returns 返回转换为代理服务器的地址
 */
export function convertToProxy(url: string): string {
  const temp = url.split("/");
  temp[0] = "http:";
  temp[2] = "127.0.0.1:29417";
  return temp.join("/");
}

/**
 * 获取指定图片的主色调
 * @param coverUrl 图片路径
 * @returns ColorThief 的RGB对象
 */
export function getAverageColor(coverUrl: string): ColorThief.RGBColor {
  let colorThief = new ColorThief();
  let image = new Image();
  image.src = coverUrl;
  return colorThief.getColor(image);
}
