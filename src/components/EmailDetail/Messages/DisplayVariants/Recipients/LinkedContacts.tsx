import { useState } from 'react'
import { handleContactConversion } from '../../../../../utils/convertToContact'
import * as S from '../../../EmailDetailStyles'
import * as GS from '../../../../../styles/globalStyles'
import * as compose from '../../../../../constants/composeEmailConstants'
import * as emailDetail from '../../../../../constants/emailDetailConstants'
import senderNameFull from '../../../../Elements/SenderName/senderNameFull'
import ContactCard from '../../../../Elements/ContactCard/ContactCard'
import { selectProfile } from '../../../../../store/baseSlice'
import { useAppSelector } from '../../../../../store/hooks'
import { IEmailMessage } from '../../../../../store/storeTypes/emailListTypes'
import { IContact } from '../../../../../store/storeTypes/contactsTypes'

const MappedContacts = ({
  contactsMap,
  title,
}: {
  contactsMap: IContact[]
  title: string
}) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <S.ToFromBCCInner>
      <GS.TextMutedSpanSmall style={{ marginRight: '4px' }}>
        {title}
      </GS.TextMutedSpanSmall>
      <S.SmallTextTruncated>
        {contactsMap.length > 2 ? (
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {contactsMap
              .slice(0, showAll ? contactsMap.length : 3)
              .map((contact, index) => (
                <S.SmallTextTruncated
                  key={contact.emailAddress}
                  showComma={index !== (showAll ? contactsMap.length : 3) - 1}
                >
                  <ContactCard
                    avatarURL={contact.emailAddress}
                    contact={contact}
                  >
                    <S.SmallTextTruncated title={contact.emailAddress}>
                      {contact.name}
                    </S.SmallTextTruncated>
                  </ContactCard>
                </S.SmallTextTruncated>
              ))}
            {!showAll && (
              <span
                style={{ marginLeft: '6px', cursor: 'pointer' }}
                onClick={() => setShowAll(true)}
                aria-hidden="true"
              >
                {' '}
                & {contactsMap.length - 3} others
              </span>
            )}
          </div>
        ) : (
          contactsMap.map((contact, index) => (
            <S.SmallTextTruncated
              key={contact.emailAddress}
              showComma={index !== contactsMap.length - 1}
            >
              <ContactCard avatarURL={contact.name} contact={contact}>
                <S.SmallTextTruncated>{contact.name}</S.SmallTextTruncated>
              </ContactCard>
            </S.SmallTextTruncated>
          ))
        )}
      </S.SmallTextTruncated>
    </S.ToFromBCCInner>
  )
}

const LinkedContants = ({ message }: { message: IEmailMessage }) => {
  const { emailAddress } = useAppSelector(selectProfile)
  const senderName = senderNameFull(message.payload.headers?.from, emailAddress)
  const senderContact = handleContactConversion(message?.payload?.headers?.from)
  const toNameFull = handleContactConversion(message?.payload?.headers?.to)
  const ccNameFull = handleContactConversion(message?.payload?.headers?.cc)
  const bccNameFull = handleContactConversion(message?.payload?.headers?.bcc)

  return (
    <>
      <S.ContactsContainer>
        <S.ToFromBCCInner>
          <GS.TextMutedSpanSmall style={{ marginRight: '4px' }}>
            {emailDetail.FROM_LABEL}
          </GS.TextMutedSpanSmall>
          <ContactCard avatarURL={senderName} contact={senderContact[0]}>
            <S.SmallTextTruncated>{senderName}</S.SmallTextTruncated>
          </ContactCard>
        </S.ToFromBCCInner>
      </S.ContactsContainer>
      <S.ContactsContainer>
        <MappedContacts contactsMap={toNameFull} title={emailDetail.TO_LABEL} />
      </S.ContactsContainer>
      {ccNameFull.length > 0 && (
        <S.ContactsContainer>
          <MappedContacts contactsMap={ccNameFull} title={compose.CC_LABEL} />
        </S.ContactsContainer>
      )}
      {bccNameFull.length > 0 && (
        <S.ContactsContainer>
          <MappedContacts contactsMap={bccNameFull} title={compose.CC_LABEL} />
        </S.ContactsContainer>
      )}
    </>
  )
}

export default LinkedContants
