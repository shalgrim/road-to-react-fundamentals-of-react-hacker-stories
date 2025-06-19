import { describe, it, expect } from 'vitest';

import App, {
    storiesReducer,
    Item,
    List,
    SearchForm,
    InputWithLabel,
} from './App';

describe('something truthy and falsy', () => {  // test suite
  it('true to be true', () => {  // test case
    expect(true).toBeTruthy();
  });

  it('false to be false', () => {  // test case
    expect(false).toBeFalsy();
  });
});

const storyOne = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
};

const storyTwo = {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
}

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
    it('removes a story from all stories', () => {

    });
});