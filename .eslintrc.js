module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"], // 문자열 더블 쿼터 허용
    "react/no-unescaped-entities": "off", //문자열 내에서 " ' > } 허용
    "spaced-comment": "off", //주석을 뒤에 달 수 있게 허용
    "react/react-in-jsx-scope": "off", // React를 꼭 import할 필요 없음
    "linebreak-style": 0, // Expected linebreaks to be 'LF' but found 'CRLF' 경고 제거
    "no-use-before-define": "off", // 'React' was used before it was defined 경고 제거
    "no-console": "off", // console.log 허용
    "react/jsx-props-no-spreading": "off", // Props에 spread 연산자 허용
    "arrow-body-style": "off", //화살표 함수 안에 return 사용 허용
    "no-param-reassign": "off", // 변수 재할당 허용
    "import/prefer-default-export": "off", // 오직 export default만 사용하지 않아도 됨
    "comma-dangle": "off", // 마지막에 , 을 적을 필요 없게 해줌
    "react/jsx-one-expression-per-line": "off", // 한 라인에 문자열과 변수를 같이 적을 수 있게 허용
    "react/no-array-index-key": "off", // key값으로 index를 사용할 수 있게 허용
    "implicit-arrow-linebreak": "off", // 화살표 함수 다음에 줄 바꿈을 사용할 수 있음
    "object-curly-newline": "off", // { 다음 줄 바꿈을 강제로 사용하지 않아도 됨
    "@typescript-eslint/no-use-before-define": ["warn"], // 선언하기 전에 사용한다면 경고
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] }, //jsx를 사용가능한 파일 확장자명 설정
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      }, //import 시 확장자명을 써 줄 필요 없음
    ],
  },
  settings: {
    "import/resolver": {
      // Typescript BaseUrl 설정 시 Unable to resolve path to module 경고 제거
      typescript: {},
      node: {
        // Unable to resolve path to module 경고 제거
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
};
