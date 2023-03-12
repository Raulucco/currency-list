import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock';
import 'jest-styled-components';
import 'jest-localstorage-mock';

fetchMock.enableMocks();
jest.mock('zustand');
