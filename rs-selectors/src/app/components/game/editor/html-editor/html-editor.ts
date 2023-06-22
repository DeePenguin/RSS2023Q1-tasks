import { HtmlEditorParams } from '../../../../../types/enums/editor'
import { Editor } from '../editor'

import './html-editor.scss'

export class HtmlEditor extends Editor {
  constructor() {
    super(HtmlEditorParams.minLinesAmount)
    this.addClass('editor-html')
    this.title.setContent(HtmlEditorParams.title)
    this.fileName.setContent(HtmlEditorParams.fileName)
  }

  public show(content: string): void {
    this.content.node.innerHTML = content
  }
}
