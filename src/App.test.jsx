import { describe, it, expect } from 'vitest';
import * as vitest from 'vitest';
import { 
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react';

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
        const action = { type: 'REMOVE_STORY', payload: storyOne };
        const state = { data: stories, isLoading: false, isError: false };

        const newState = storiesReducer(state, action);

        const expectedState = {
            data: [storyTwo],
            isLoading: false,
            isError: false,
        };

        expect(newState).toStrictEqual(expectedState);
    });
});

describe('Item', () => {
    it('renders all properties', () => {
        render(<Item item={storyOne} />);
        
        vitest.expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
        expect(screen.getByText('React')).toHaveAttribute(
            'href',
            'https://reactjs.org/'
        );
    });
});