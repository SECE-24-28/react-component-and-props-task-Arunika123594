import React, {useState} from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import TextInput from 'ink-text-input';

export default function App() {
  const {exit} = useApp();
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState('normal'); // 'normal' | 'adding' | 'toggle'
  const [inputValue, setInputValue] = useState('');

  useInput((input, key) => {
    if (mode === 'normal') {
      if (input === 'a') setMode('adding');
      if (input === 't') setMode('toggle');
      if (input === 'c') setTasks([]);
      if (input === 'q') exit();
    }
  });

  const onSubmit = (value) => {
    if (mode === 'adding') {
      const parts = value.split('|').map(s => s.trim());
      const title = parts[0] || 'Untitled';
      const hours = parseFloat(parts[1]) || 0;
      setTasks(prev => [...prev, {title, hours, done: false}]);
      setInputValue('');
      setMode('normal');
      return;
    }

    if (mode === 'toggle') {
      const idx = parseInt(value, 10);
      if (!isNaN(idx) && idx >= 1 && idx <= tasks.length) {
        setTasks(prev => prev.map((t, i) => i === idx - 1 ? {...t, done: !t.done} : t));
      }
      setInputValue('');
      setMode('normal');
      return;
    }
  };

  const total = tasks.reduce((s, t) => s + (t.hours || 0), 0);
  const completed = tasks.reduce((s, t) => s + ((t.done ? t.hours : 0) || 0), 0);

  return (
    React.createElement(Box, {flexDirection: 'column'},
      React.createElement(Box, null, React.createElement(Text, {bold: true}, 'Terminal React (Ink) To-Do — Calculations')),
      React.createElement(Box, null, React.createElement(Text, null, "Commands: [a] Add, [t] Toggle, [c] Clear, [q] Quit")),

      React.createElement(Box, {flexDirection: 'column', marginTop: 1},
        tasks.length === 0 ? React.createElement(Text, {color: 'gray'}, 'No tasks yet') :
          tasks.map((t, i) => React.createElement(Box, {key: i},
            React.createElement(Text, null, `${i + 1}. [${t.done ? 'x' : ' '}] ${t.title} — ${t.hours}h`)
          ))
      ),

      React.createElement(Box, {marginTop: 1}, React.createElement(Text, null, `Total estimated: ${total}h — Completed: ${completed}h`)),

      mode === 'adding' && React.createElement(Box, {marginTop: 1},
        React.createElement(Text, null, 'Enter "title | hours": '),
        React.createElement(TextInput, {value: inputValue, onChange: setInputValue, onSubmit})
      ),

      mode === 'toggle' && React.createElement(Box, {marginTop: 1},
        React.createElement(Text, null, 'Enter task number to toggle: '),
        React.createElement(TextInput, {value: inputValue, onChange: setInputValue, onSubmit})
      ),

      mode === 'normal' && React.createElement(Box, {marginTop: 1}, React.createElement(Text, {dimColor: true}, "Press 'a' to add, 't' to toggle, 'c' clear, 'q' quit."))
    )
  );
}
