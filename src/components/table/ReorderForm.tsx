import React from "react";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";
import Typography from '@material-ui/core/Typography';

import { ReorderList, IListResult } from './ReorderList';

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: string[],
  destination: string[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

interface ReorderFormProps {
  lists: IListResult;
  setLists: React.Dispatch<React.SetStateAction<IListResult>>;
}

const ReorderForm: React.FunctionComponent<ReorderFormProps> = (props) => {
  const { lists, setLists } = props;
  const onDragEnd = React.useCallback((result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      setLists(lists => ({
        ...lists,
        [source.droppableId]: reorder(
          source.droppableId === 'shown' ? lists.shown : lists.hidden,
          result.source.index,
          result.destination!.index,
        ),
      }));
    } else {
      setLists(lists => move(
        source.droppableId === 'shown' ? lists.shown : lists.hidden,
        destination.droppableId === 'shown' ? lists.shown : lists.hidden,
        source,
        destination
      ));
    }
  }, [setLists]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Typography>Shown</Typography>
      <ReorderList lists={lists} id="shown" />
      <Typography>Hidden</Typography>
      <ReorderList lists={lists} id="hidden" />
    </DragDropContext>
  );
}

export default ReorderForm;
