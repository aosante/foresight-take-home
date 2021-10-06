# Foresight Take Home Challenge

## Getting Started

- Clone the repo locally by running `git clone https://github.com/aosante/foresight-take-home.git`
- Add a `.env.local` file to the root directory and add the following variables:

```
REACT_APP_BASE_URL=https://fs-appointments.herokuapp.com/api
REACT_APP_CSRF_TOKEN=<replace with csrf_token for POST requests>
```

- Run the project by running `npm start`

## Potential Improvements

### State Management

Since this is a fairly simple application, state management is handled with just local component state and one-level deep props.

If this was a bigger and more complex application, solutions like Composition, the Context API, and even Redux would be the best options for managing state.

### Testing

I had the intention of adding unit tests to show my experience with either the React Testing Library or Jest & Enzyme.

There was poor time management from my part leaving the tests for the last day, and then a pet emergency rendered that day useless for adding the mentioned tests.

### Form Validation

All form fields are validated using the `react-hook-form` library except for date pickers. Date pickers should be validated with this library too.

### Imports

Personally I don't like using relative imports to import components and modules. I left it that way due to the size of the project but normally I would implement absolute imports for a better development experience.
