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
