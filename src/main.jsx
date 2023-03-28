import React from 'react';
import { createRoot } from 'react-dom/client'
import { CalendarApp } from './CalendarApp';

import './styles.css'

const app = createRoot(document.getElementById('root'));

// !react_devtools_backend.js:4012 Warning: Using UNSAFE_componentWillReceiveProps in strict mode is
// ! not recommended and may indicate bugs in your code. 
// !See https://reactjs.org/link/unsafe-component-lifecycles for details.

// !  Move data fetching code or side effects to componentDidUpdate.
// !  If you're updating state whenever props change, refactor your code 
// ! to use memoization techniques or move it to static getDerivedStateFromProps. 
// ! Learn more at: https://reactjs.org/link/derived-state

// Please update the following components: DayColumn2

app.render(
  // <React.StrictMode>
      <CalendarApp />
  // </React.StrictMode>,
)

