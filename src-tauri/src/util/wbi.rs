/*
代码逻辑取自Bilibili-API-Collect 仓库 的 WBI鉴权
并修改部分代码以适配于本程序
根据Bilibili-API-Collect仓库描述

wbi鉴权通常需要两个参数wts和w_rid
wts 为当前以秒为单位的 Unix 时间戳
w_rid 为签名

需要先计算wts和请求参数的排列，之后利用排列后的值计算w_rid签名即可
*/
use reqwest::header::USER_AGENT;
use serde::Deserialize;
use std::time::{SystemTime, UNIX_EPOCH};

/**
 * 重排映射表
 */
const MIXIN_TAB: [usize; 64] = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29,
    28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25,
    54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
];

/**
 * 通过重排映射表，重新排列img_url和sub_url并合并
 */
pub fn get_mixin_key(orig: &[u8]) -> String {
    MIXIN_TAB
        .iter()
        .take(32)
        .map(|&index| orig[index] as char)
        .collect::<String>()
}

pub fn get_url_encoded(url: &str) -> String {
    url.chars()
        .filter_map(
            |char| match char.is_ascii_alphanumeric() || "-_.~".contains(char) {
                true => Some(char.to_string()),
                false => {
                    // 过滤 value 中的 "!'()*" 字符
                    if "!'()*".contains(char) {
                        return None;
                    }
                    let encoded = char
                        .encode_utf8(&mut [0; 4])
                        .bytes()
                        .fold("".to_string(), |acc, b| acc + &format!("%{:02X}", b));
                    Some(encoded)
                }
            },
        )
        .collect::<String>()
}

// 为请求参数进行 wbi 签名
pub fn encode_wbi(params: Vec<(&str, String)>, (img_key, sub_key): (String, String)) -> String {
    let cur_time = match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(t) => t.as_secs(),
        Err(_) => panic!("SystemTime before UNIX EPOCH!"),
    };
    _encode_wbi(params, (img_key, sub_key), cur_time)
}

fn _encode_wbi(
    mut params: Vec<(&str, String)>,
    (img_key, sub_key): (String, String),
    timestamp: u64,
) -> String {
    let mixin_key = get_mixin_key((img_key + &sub_key).as_bytes());
    // 添加当前时间戳
    params.push(("wts", timestamp.to_string()));
    // 重新排序
    params.sort_by(|a, b| a.0.cmp(b.0));
    // 拼接参数
    let query = params
        .iter()
        .map(|(k, v)| format!("{}={}", get_url_encoded(k), get_url_encoded(v)))
        .collect::<Vec<_>>()
        .join("&");
    // 计算签名
    let web_sign = format!("{:?}", md5::compute(query.clone() + &mixin_key));
    // 返回最终的 query
    query + &format!("&w_rid={}", web_sign)
}
pub fn take_filename(url: String) -> Option<String> {
    url.rsplit_once('/')
        .and_then(|(_, s)| s.rsplit_once('.'))
        .map(|(s, _)| s.to_string())
}
