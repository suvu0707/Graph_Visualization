// UndoRedoControls.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { undo, redo } from '../../redux/slices/historySlice.tsx';

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ margin: '10px' }}>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default UndoRedoControls;
