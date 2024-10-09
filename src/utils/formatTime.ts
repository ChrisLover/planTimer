// 在这里处理时间，格式化时间，获取时间，记录时间

// 获取当前时间
export const getCurrentTime = () => {
  let now = new Date();  
  return formatDate(now);  
}

// 格式化时间
function formatDate(date: any) {  
  let year = date.getFullYear();  
  let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的  
  let day = String(date.getDate()).padStart(2, '0');  
  let hours = String(date.getHours()).padStart(2, '0');  
  let minutes = String(date.getMinutes()).padStart(2, '0');  
  let seconds = String(date.getSeconds()).padStart(2, '0');  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  // 例如: "2023-04-01 12:00:00"
}  

// t计算两个时间字符串相减，例如2024-9-13 09:40:00减去2024-9-13 09:00:00等于00:40:00
export function subtractDates(dateString1: any, dateString2: any) {  
  // 将时间字符串转换为Date对象  
  const date1: any = new Date(dateString1);  
  const date2: any = new Date(dateString2);  
  // 计算时间差（毫秒）  
  const diff = date2 - date1;  
  // 将毫秒转换为小时、分钟、秒  
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));  
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));  
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);  
  // 确保时间组成部分都是两位数  
  const formattedHours = hours.toString().padStart(2, '0');  
  const formattedMinutes = minutes.toString().padStart(2, '0');  
  const formattedSeconds = seconds.toString().padStart(2, '0');  
  // 返回格式化的时间差  
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;  
}  
