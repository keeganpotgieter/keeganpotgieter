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

const findFirstDiffIndex = (str1: string, str2: string | undefined) => {
  if (!str2) return -1;

  const maxLength = Math.max(str1.length, str2.length);
  for (let i = 0; i < maxLength; i++) {
    if (str1[i] !== str2[i]) {
      return i;
    }
  }
  return -1; // If the strings are identical
};

const setCaretToEnd = (
  element: HTMLDivElement,
  prevValue: string | undefined = undefined,
) => {
  const inputSpan = element.querySelector<HTMLSpanElement>('#input-value');
  if (inputSpan?.childNodes[0] === undefined) return;

  const text = inputSpan.textContent ?? '';

  const diffIndex = findFirstDiffIndex(inputSpan.textContent ?? '', prevValue);

  const _diffOffset = text.length < (prevValue?.length ?? 0) ? 0 : 1;
  const offset =
    diffIndex >= 0
      ? diffIndex + _diffOffset
      : inputSpan.textContent?.length || 0;

  console.log({
    l: inputSpan.textContent?.length,
    ccp: getCursorPosition(element),
    prevValue,
    diff: findFirstDiffIndex(inputSpan.textContent || '', prevValue || ''),
    offset,
  });

  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(inputSpan.childNodes[0], offset);
  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
  element.focus();
};

const getCursorPosition = (element: HTMLDivElement) => {
  const selection = window.getSelection();
  if (selection && (selection.rangeCount ?? -1 > 0)) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const cursorPosition = preCaretRange.toString().length;
    return cursorPosition;
  }
  return 0;
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
  const prevValue = React.useRef<string | undefined>(undefined);
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
      setCaretToEnd(inputRef.current, prevValue.current);
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
      }
    } else {
      setValue(value);
      if (inputRef.current) {
        updateContent(value, suggestion);
        setSuggestion(suggestion);
      }
    }

    prevValue.current = value;
  };

  const onSubmit = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      prevValue.current = undefined;

      setLastSuggestionIndex(0);

      clearHistory();
      return;
    }

    if (key === 'Tab') {
      event.preventDefault();
      prevValue.current = undefined;

      await handleTabCompletion(
        value,
        handleSetValue,
        lastSuggestionIndex,
        setLastCommandIndex,
      );
      setLastSuggestionIndex(0);
    }

    if (key === 'Enter' || event.code === '13') {
      event.preventDefault();
      prevValue.current = undefined;

      setLastCommandIndex(0);

      setCommand(value);

      handleSetValue(undefined);
      setLastSuggestionIndex(0);
    }

    const commands: string[] = history
      .map(({ command }) => command)
      .filter((value: string) => value);

    if (key === 'ArrowUp') {
      event.preventDefault();
      prevValue.current = undefined;

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex + 1;

      if (index <= commands.length) {
        setLastCommandIndex(index);
        handleSetValue(commands[commands.length - index]);
      }
    }

    if (key === 'ArrowDown') {
      event.preventDefault();
      prevValue.current = undefined;

      const index: number = lastCommandIndex - 1;

      if (index > 0) {
        setLastCommandIndex(index);
        handleSetValue(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        handleSetValue(undefined);
      }
    }

    if (key === 'ArrowRight' && suggestion) {
      handleSetValue(value + suggestion);
      prevValue.current = undefined;
      setLastSuggestionIndex(0);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLDivElement>) => {
    const _text = trimZeroWidthSpace(
      event.currentTarget.textContent ?? BLANK_VALUE,
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
      inputSpan?.textContent !== undefined &&
      inputSpan.textContent !== null
    ) {
      text = trimZeroWidthSpace(inputSpan.textContent, true);
    } else {
      text = _textWithoutSuggestion;
    }

    const _suggestion =
      (await getCommandSuggestion(
        text,
        lastSuggestionIndex,
        setLastSuggestionIndex,
      )) ?? '';
    const suggestion = text.length > 0 ? _suggestion : '';
    handleSetValue(text, suggestion);

    prevValue.current = text;
  };

  const onFocus = () => {
    if (inputRef.current) setCaretToEnd(inputRef.current, undefined);
  };

  return (
    <div className='relative w-full max-w-full flex-row'>
      <label htmlFor='prompt' className='float-left flex-shrink'>
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
        onKeyDown={onSubmit}
        autoFocus
        onFocus={onFocus}
        onInput={handleChange}
        autoCorrect='off'
        autoCapitalize='off'
      ></div>
    </div>
  );
};

export default Input;