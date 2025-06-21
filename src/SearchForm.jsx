import * as React from 'react';

import { InputWithLabel } from './InputWithLabel';

const SearchForm = ({
    searchTerm,
    onSearchInput,
    searchAction,
}) => (
    <form action={searchAction}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>

        <button
            type="submit"
            disabled={!searchTerm}
        >
            Submit
        </button>
    </form>
);
