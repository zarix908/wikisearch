import { GlobalWithFetchMock } from "jest-fetch-mock";

import jest_fetch_mock from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
// @ts-ignore
customGlobal.fetch = jest_fetch_mock;
customGlobal.fetchMock = customGlobal.fetch;
