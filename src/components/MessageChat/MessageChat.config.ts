import { Message } from '../../redux/state/chatSlice';

export const classNameMessage = (type: Message['type'], matchMessageEmojiLength = 0) => {
  let classNameMessageEmoji: React.HTMLAttributes<HTMLDivElement>['className'] =
    '-tracking-[0.3px]';

  if (matchMessageEmojiLength === 1) {
    classNameMessageEmoji = `inline-flex gap-[10px] translate-y-[3px] ${
      type === 'owner' ? '' : '-translate-x-[1px]'
    }`;
  }

  if (matchMessageEmojiLength === 2) {
    classNameMessageEmoji = `inline-flex gap-[7px] translate-y-[14px] ${
      type === 'owner' ? 'translate-x-[5px]' : '-translate-x-[6px]'
    }`;
  }
  if (matchMessageEmojiLength === 3) {
    classNameMessageEmoji = `inline-flex gap-[9px] translate-y-[14px] ${
      type === 'owner' ? 'translate-x-[4px]' : '-translate-x-[5px]'
    }`;
  }
  if (matchMessageEmojiLength === 4) {
    classNameMessageEmoji = `inline-flex gap-[6px] translate-y-[13px] ${
      type === 'owner' ? 'translate-x-[4px]' : '-translate-x-[6px]'
    }`;
  }
  if (matchMessageEmojiLength === 5) {
    classNameMessageEmoji = `inline-flex translate-y-[12px] ${
      type === 'owner' ? 'translate-x-[5px] gap-[8px]' : '-translate-x-[5px] gap-[7px]'
    }`;
  }
  if (matchMessageEmojiLength === 6) {
    classNameMessageEmoji = `inline-flex gap-[6px] translate-y-[10px] ${
      type === 'owner' ? 'translate-x-[4px]' : '-translate-x-[6px]'
    }`;
  }
  if (matchMessageEmojiLength > 6) {
    classNameMessageEmoji = 'flex gap-[3px] w-fit flex-wrap';
  }

  return classNameMessageEmoji;
};

export const classNameHeigthEmoji = (matchMessageEmojiLength = 0) => {
  if (matchMessageEmojiLength === 1) {
    return 'h-[93px]';
  }

  if (matchMessageEmojiLength === 2) {
    return 'h-[99px]';
  }

  if (matchMessageEmojiLength === 3) {
    return 'h-[85px]';
  }

  if (matchMessageEmojiLength === 4) {
    return 'h-[69px]';
  }

  if (matchMessageEmojiLength === 5) {
    return 'h-[63px]';
  }

  if (matchMessageEmojiLength === 6) {
    return 'h-[53px]';
  }

  return '';
};

export const classNameMessageTime = (
  type: Message['type'],
  matchMessageEmojiLength = 0,
) => {
  const className: string[] = [];

  if (!matchMessageEmojiLength) {
    className.push('translate-x-[4px]');
  }

  if (matchMessageEmojiLength) {
    className.push('pr-[6px]');
  }
  if (matchMessageEmojiLength === 1) {
    className.push('-translate-y-[15px]');
    if (type === 'owner') {
      className.push('translate-x-[4px]');
    } else {
      className.push('translate-x-[3px]');
    }
  }
  if (matchMessageEmojiLength === 2) {
    className.push('translate-y-[18px]');
    if (type === 'owner') {
      className.push('translate-x-[4px]');
    } else {
      className.push('-translate-x-[8px]');
    }
  }

  if (matchMessageEmojiLength === 3) {
    className.push('translate-y-[18px]');
    if (type === 'owner') {
      className.push('translate-x-[4px]');
    } else {
      className.push('-translate-x-[6px]');
    }
  }

  if (matchMessageEmojiLength === 4) {
    className.push('translate-x-[4px] translate-y-[11px]');
  }

  if (matchMessageEmojiLength === 5) {
    className.push(' translate-y-[11px]');
    if (type === 'owner') {
      className.push('translate-x-[5px]');
    } else {
      className.push('-translate-x-[5px]');
    }
  }

  if (matchMessageEmojiLength === 6) {
    className.push('translate-y-[6px]');
    if (type === 'owner') {
      className.push('translate-x-[4px]');
    } else {
      className.push('-translate-x-[7px]');
    }
  }

  if (matchMessageEmojiLength > 6) {
    className.push('translate-y-[1px]');
    if (type === 'owner') {
      className.push('translate-x-[4px]');
    } else {
      className.push('');
    }
  }

  if (!matchMessageEmojiLength) {
    className.push('!pl-0 pb-0');
  } else {
    className.push('pb-[2px] pt-[3px]');
  }

  return className.join(' ');
};

export const classNameImagePadding = (matchMessageEmojiLength = 0) => {
  const defaultClassName = 'pl-[8px] pr-[6px] pb-[3.1px]';
  if (matchMessageEmojiLength > 6) {
    return `${defaultClassName} pt-2`;
  }
  return `${defaultClassName} pt-[4px]`;
};
