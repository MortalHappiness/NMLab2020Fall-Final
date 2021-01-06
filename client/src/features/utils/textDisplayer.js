import React, { useState } from 'react';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './textEditor.css'

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

const RichDisplayer = (props) => {
  const { displayerState } = props

  return (
    <div className="RichDisplayer-root">
      <div className="RichEditor-editor">
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={displayerState}
          readOnly
        />
      </div>
    </div>
  );
}

export default RichDisplayer;