import React, { useEffect, useState } from 'react'
import {
  FiArchive,
  FiCheckCircle,
  FiCornerUpLeft,
  // FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import ArchiveMail from '../../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../../EmailMoreOptions'
import { FindLabelByName } from '../../../utils'
import // selectEmailList,
  // selectIsFocused,
  // selectIsSorting,
  '../../../Store/emailListSlice'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as todo from '../../../constants/todoConstants'
import * as S from '../EmailDetailStyles'
import { CustomButtonText } from '../../Elements/Buttons'
import SetCompletedMail from '../../EmailOptions/SetCompletedMail'
import SetToDoMail from '../../EmailOptions/SetToDoMail'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { LocationObjectType } from '../../types/globalTypes'

const messageIndex = 0

const EmailDetOptions = ({ messageId, isReplyingListener, threadId }: { messageId: string; isReplyingListener: any, threadId: string }) => {
  // const emailList = useAppSelector(selectEmailList)
  // const isFocused = useAppSelector(selectIsFocused)
  // const isSorting = useAppSelector(selectIsSorting)
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [showMenu, setShowMenu] = useState<Boolean>(false)
  const location = useLocation<LocationObjectType>()

  useEffect(() => {
    setShowMenu(false)
  }, [location])


  return (
    <S.EmailOptionsContainer>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiCornerUpLeft />}
              label={local.BUTTON_REPLY}
              onClick={() => isReplyingListener({ threadId, messageIndex })}
            />
          </div>
          <div>
            {labelIds &&
              labelIds.some(
                (item) =>
                  item ===
                  FindLabelByName({
                    storageLabels,
                    LABEL_NAME: todo.LABEL,
                  })[0].id
              ) ? (
              <CustomButtonText
                className="button option-link"
                icon={<FiCheckCircle />}
                onClick={() =>
                  SetCompletedMail({
                    messageId,
                    history,
                    labelIds,
                    dispatch,
                    location,
                  })
                }
                label={local.BUTTON_MARK_AS_DONE}
              />
            ) : (
              <CustomButtonText
                className="button option-link"
                icon={<FiCheckCircle />}
                onClick={() =>
                  SetToDoMail({
                    history,
                    messageId,
                    labelIds,
                    dispatch,
                    location,
                    storageLabels,
                  })
                }
                label={local.BUTTON_TODO}
              />
            )}
          </div>
          <div>
            {/* <CustomButtonText
              className="button option-link"
              icon={<FiClock />}
              // onClick={ToDoAction}
              label={local.BUTTON_REMIND}
            /> */}
          </div>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiArchive />}
              onClick={() =>
                ArchiveMail({
                  messageId,
                  history,
                  labelIds,
                  location,
                  dispatch,
                })
              }
              label={local.BUTTON_ARCHIVE}
            />
          </div>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiMoreHorizontal />}
              onClick={() => setShowMenu(!showMenu)}
              label={local.BUTTON_MORE}
            />
          </div>
          {showMenu && <EmailMoreOptions messageId={messageId} labelIds={labelIds} />}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetOptions
