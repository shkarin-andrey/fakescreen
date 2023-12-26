import { FC, memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { IDnDWrapper } from './DnDWrapper.interface';

const DnDWrapper: FC<IDnDWrapper> = ({ children, id, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging, handlerId }, connectDrag] = useDrag({
    type: 'message',
    item: { id, index },
    collect: (monitor) => {
      const result = {
        handlerId: monitor.getHandlerId(),
        isDragging: monitor.isDragging(),
      };
      return result;
    },
  });

  const [, connectDrop] = useDrop({
    accept: 'message',
    hover: ({ id: draggedId }: { id: string; type: string }) => {
      if (draggedId !== id) {
        moveCard(draggedId, id);
      }
    },
  });

  connectDrag(ref);
  connectDrop(ref);

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={ref} key={id} style={{ opacity }} data-handler-id={handlerId}>
      {children}
    </div>
  );
};

export default memo(DnDWrapper);
