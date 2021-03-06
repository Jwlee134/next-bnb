//* "token=value" 를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    // "token=value" => ["token", "value"]
    const pair = cookieString.split(/\s*=\s*/);
    // { "token" : "value" }
    cookies[pair[0]] = pair[1];
  }
  return cookies;
};

// 문자열에서 숫자를 추출하는 함수
export const getNumber = (string: string) => {
  const number = string.match(/\d/g)?.join("");
  return Number(number);
};

// 금액을 입력하면 금액에 ,를 넣어주는 함수
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numberWithCommas = (input: string) => {
  return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

// query string 만들기
export const makeQueryString = (url: string, queryObject: Object) => {
  const keys = Object.keys(queryObject);
  const values = Object.values(queryObject);
  let queryString = `${url}?`;
  // value가 존재할때만 queryString에 추가
  values.forEach((value, i) => {
    if (value) queryString += `${keys[i]}=${value}&`;
  });
  // 마지막 & 제거
  return queryString.slice(0, -1);
};
