import RoutesConstants from './routes.json'
import * as global from './globalConstants'

export const getRouteByLabelMap: { [key: string]: string } = {
  [global.INBOX_LABEL]: `${RoutesConstants.INBOX}`,
  [global.TODO_LABEL_NAME]: `${RoutesConstants.TODO}`,
  [global.SPAM_LABEL]: `${RoutesConstants.SPAM}`,
  [global.DRAFT_LABEL]: `${RoutesConstants.DRAFTS}`,
  [global.SENT_LABEL]: `${RoutesConstants.SENT}`,
  [global.ARCHIVE_LABEL]: `${RoutesConstants.ARCHIVE}`,
}

export const getLabelByRoute: { [key: string]: string } = {
  [RoutesConstants.INBOX]: global.INBOX_LABEL,
  [RoutesConstants.TODO]: global.TODO_LABEL_NAME,
  [RoutesConstants.SPAM]: global.SPAM_LABEL,
  [RoutesConstants.DRAFTS]: global.DRAFT_LABEL,
  [RoutesConstants.SENT]: global.SENT_LABEL,
  [RoutesConstants.ARCHIVE]: global.ARCHIVE_LABEL,
}
