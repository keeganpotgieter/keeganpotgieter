import { commandExists } from '../../utils/commandExists';
import { useShell } from '../../utils/shellProvider';
import {
  getCommandSuggestion,
  handleTabCompletion,
} from '../../utils/tabCompletion';
import { useTheme } from '../../utils/themeProvider';
import Username from '../username';
import React from 'react';

const BLANK = `\u200B`;
const BLANK_VALUE = '';

const trimZeroWidthSpace = (str: string, extended: boolean = false) => {
  const parsedString = str.replace(/[\u200B-\u200D\uFEFF]/g, '');
  if (extended && parsedString !== '') return parsedString.trimStart();
  return parsedString.trim();
};

const setCaretToEnd = (element: HTMLDivElement) => {
  const inputSpan = element.querySelector<HTMLSpanElement>('#input-value');
  if (!inputSpan || inputSpan.childNodes[0] === undefined) return;

  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(inputSpan.childNodes[0], inputSpan.textContent?.length || 0);
  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
  element.focus();
};

export const Input = ({
  inputRef,
  containerRef,
}: {
  inputRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { theme } = useTheme();
  const [value, setValue] = React.useState(BLANK_VALUE);
  const [suggestion, setSuggestion] = React.useState('');
  const [lastSuggestionIndex, setLastSuggestionIndex] =
    React.useState<number>(1);
  const {
    setCommand,
    history,
    lastCommandIndex,
    setLastCommandIndex,
    clearHistory,
  } = useShell();

  React.useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    if (inputRef.current) {
      inputRef.current.innerText = BLANK;
    }
  }, [history]);

  const updateContent = (val: string, sugg: string) => {
    if (inputRef.current) {
      inputRef.current.innerHTML = `
        <span id="input-value">${val}</span><span id="input-suggestion" style="opacity: 0.2">${sugg}</span>
      `;
      setCaretToEnd(inputRef.current);
    }
  };

  const handleSetValue = (
    value: string | undefined,
    suggestion: string = '',
  ) => {
    if (!value || value.length === 0) {
      setValue(BLANK_VALUE);
      if (inputRef.current) {
        updateContent(BLANK, suggestion);
        setSuggestion('');
        setCaretToEnd(inputRef.current);
      }
    } else {
      setValue(value);
      if (inputRef.current) {
        updateContent(value, suggestion);
        setSuggestion(suggestion);
        setCaretToEnd(inputRef.current);
      }
    }
  };

  const onSubmit = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setLastSuggestionIndex(0);

      clearHistory();
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();

      handleTabCompletion(
        value,
        handleSetValue,
        lastSuggestionIndex,
        setLastCommandIndex,
      );
      setLastSuggestionIndex(0);
      return;
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();

      setLastCommandIndex(0);

      setCommand(value);

      handleSetValue(undefined);
      setLastSuggestionIndex(0);
      return;
    }

    const commands: string[] = history
      .map(({ command }) => command)
      .filter((value: string) => value);

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex + 1;

      if (index <= commands.length) {
        setLastCommandIndex(index);
        handleSetValue(commands[commands.length - index]);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex - 1;

      if (index > 0) {
        setLastCommandIndex(index);
        handleSetValue(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        handleSetValue(undefined);
      }
      return;
    }

    if (event.key === 'ArrowRight' && suggestion) {
      handleSetValue(value + suggestion);
      setLastSuggestionIndex(0);
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const _text = trimZeroWidthSpace(
      event.target.textContent || BLANK_VALUE,
      false,
    );
    let text = '';
    const inputSpan = event.currentTarget.querySelector('#input-value');
    const suggestionSpan =
      event.currentTarget.querySelector('#input-suggestion');

    const _textWithoutSuggestion = suggestionSpan?.textContent
      ? _text.replace(suggestionSpan?.textContent, '')
      : _text;

    if (
      inputSpan &&
      inputSpan.textContent !== undefined &&
      inputSpan.textContent !== null
    ) {
      text = trimZeroWidthSpace(inputSpan.textContent, true);
    } else {
      text = _textWithoutSuggestion;
    }

    const _suggestion =
      getCommandSuggestion(text, lastSuggestionIndex, setLastSuggestionIndex) ??
      '';
    const suggestion = text.length > 0 ? _suggestion : '';
    handleSetValue(text, suggestion);
  };

  return (
    <div className='_flex relative w-full max-w-full flex-row'>
      <label htmlFor='prompt' className='_h-fit float-left flex-shrink'>
        <Username />
      </label>

      <div
        contentEditable
        role='textbox'
        ref={inputRef}
        id='prompt'
        className='overflow-x-clip focus:outline-none'
        aria-label='prompt'
        style={{
          backgroundColor: theme.background,
          color: commandExists(value) || value === '' ? theme.green : theme.red,
        }}
        onInput={handleChange}
        autoFocus
        onKeyDown={onSubmit}
        autoCorrect='off'
        autoCapitalize='off'
      ></div>
    </div>
  );
};

export default Input;
