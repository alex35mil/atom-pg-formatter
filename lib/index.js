'use babel';

import { CompositeDisposable } from 'atom';
import { format } from 'pg-formatter';

import config from './config';

export default {
  config,
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'pg-formatter:format': () => this.triggerFormat(),
      }),
    );
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor =>
        this.subscriptions.add(
          editor.getBuffer().onWillSave(() => this.triggerFormatOnSave(editor)),
        ),
      ),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  triggerFormat() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      const isSelection = !!editor.getSelectedText();
      if (isSelection) {
        editor
          .getSelectedBufferRanges()
          .forEach(bufferRange => this.formatSource(editor, bufferRange));
      } else {
        const bufferRange = editor.getBuffer().getRange();
        this.formatSource(editor, bufferRange);
      }
    }
  },

  triggerFormatOnSave(editor) {
    const { formatOnSave, scopes } = atom.config.get(
      'pg-formatter.editorOptions',
    );
    if (!formatOnSave) return;
    const { scopeName } = editor.getGrammar();
    if (!scopes.includes(scopeName)) return;
    const bufferRange = editor.getBuffer().getRange();
    this.formatSource(editor, bufferRange);
  },

  formatSource(editor, bufferRange) {
    const cursorPosition = editor.getCursorScreenPosition();
    const textToFormat = editor.getTextInBufferRange(bufferRange);
    const pgFormatterOptions = atom.config.get(
      'pg-formatter.pgFormatterOptions',
    );
    const formattedText = format(textToFormat, pgFormatterOptions);
    const isTextUnchanged = formattedText === textToFormat;
    if (!formattedText || isTextUnchanged) return;
    editor.setTextInBufferRange(bufferRange, formattedText);
    editor.setCursorScreenPosition(cursorPosition);
  },
};
