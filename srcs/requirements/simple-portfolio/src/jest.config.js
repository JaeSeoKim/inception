module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svgrMock.tsx",
  },
};
