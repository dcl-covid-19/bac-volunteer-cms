import React from "react";
import clsx from 'clsx';
import { Droppable, Draggable, } from "react-beautiful-dnd";
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { HEADERS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  draggable: {
    display: 'flex',
    userSelect: 'none',
    background: theme.palette.background.paper,
  },
  dragging: {
    background: lighten(theme.palette.primary.light, 0.85),
  },
  droppable: {
    minHeight: '20px',
  },
  draggingOver: {
    background: theme.palette.grey['100'],
  },
}));

export interface IListResult {
  shown: string[];
  hidden: string[];
}

interface ReorderListProps {
  lists: IListResult;
  id: keyof IListResult;
}

export const ReorderList: React.FunctionComponent<ReorderListProps> = (props) => {
  const classes = useStyles();
  const { lists, id } = props;

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={clsx(classes.droppable, {
              [classes.draggingOver]: snapshot.isDraggingOver,
            })}
          >
            {lists[id].map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {// tslint:disable-next-line:no-shadowed-variable
                (provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={provided.draggableProps.style}
                    className={clsx(classes.draggable, {
                      [classes.dragging]: snapshot.isDragging,
                    })}
                  >
                    <DragIndicatorIcon color="disabled" fontSize="small" />
                    {HEADERS[item]}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
      )}
    </Droppable>
  );
}

export default ReorderList;
