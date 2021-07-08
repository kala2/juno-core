import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.scss'
import InputBase from '@material-ui/core/InputBase'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { ComposerContainer, Wrapper } from './ComposeStyles'
import {
  selectComposeEmail,
  SendComposedEmail,
  TrackComposeEmail,
} from '../../Store/composeSlice'
import useDebounce from '../../Hooks/useDebounce'
import * as local from '../../constants/composeEmailConstants'
import emailValidation from '../../utils/emailValidation'
import * as S from './ComposeStyles'

const ComposeEmail = () => {
  const composeEmail = useSelector(selectComposeEmail)
  const [toError, setToError] = useState(false)
  const dispatch = useDispatch()
  const [toValue, setToValue] = useState([])
  const [subjectValue, setSubjectValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const debouncedToValue = useDebounce(toValue, 500)
  const debouncedSubjectValue = useDebounce(subjectValue, 500)
  const debouncedBodyValue = useDebounce(bodyValue, 500)

  const { messageId } = useParams()
  const history = useHistory()

  const handleChange = (event) => {
    if (event.target.id === 'to') {
      setToValue(event.target.value)
    }
    if (event.target.id === 'subject') {
      setSubjectValue(event.target.value)
    }
    if (event.target.id === 'body') {
      setBodyValue(event.target.value)
    }
  }

  useEffect(() => {
    if (debouncedToValue) {
      const updateEventObject = { id: 'to', value: debouncedToValue }
      if (!isEmpty(updateEventObject)) {
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedToValue])

  useEffect(() => {
    if (debouncedSubjectValue) {
      const updateEventObject = {
        id: 'subject',
        value: debouncedSubjectValue,
      }
      if (!isEmpty(updateEventObject)) {
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedSubjectValue])

  useEffect(() => {
    if (debouncedBodyValue) {
      const updateEventObject = { id: 'body', value: debouncedBodyValue }
      if (!isEmpty(updateEventObject)) {
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
  }, [debouncedBodyValue])

  useEffect(() => {
    if (composeEmail) {
      setToValue(composeEmail.to)
      setSubjectValue(composeEmail.subject)
      setBodyValue(composeEmail.body)
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (toValue.length > 0) {
      if (emailValidation(toValue)) {
        dispatch(SendComposedEmail({ history, messageId }))
      } else {
        setToError(true)
      }
    }
  }

  return (
    <Wrapper>
      <>
        <ComposerContainer className="composer composerIsVisible">
          <div className="base">
            <form onSubmit={onSubmit} autoComplete="off">
              <div style={{ marginBottom: `7px` }}>
                <div className="base">
                  <S.Row>
                    <S.Label>
                      <label htmlFor="to" className="label-base">
                        {local.TO_LABEL}
                      </label>
                    </S.Label>
                    <FormControl error={toError}>
                      <InputBase
                        id="to"
                        label={local.TO_LABEL}
                        value={toValue}
                        onChange={handleChange}
                        required
                        fullWidth
                        autoFocus
                      />
                      {toError && (
                        <FormHelperText id="component-helper-text">
                          Please enter a valid email
                        </FormHelperText>
                      )}
                    </FormControl>
                  </S.Row>
                  <S.Row>
                    <S.Label>
                      <label htmlFor="subject" className="label-base">
                        {local.SUBJECT_LABEL}
                      </label>
                    </S.Label>
                    <InputBase
                      id="subject"
                      label={local.SUBJECT_LABEL}
                      value={subjectValue}
                      onChange={handleChange}
                      fullWidth
                    />
                  </S.Row>
                  <S.Row>
                    <S.Label>
                      <label htmlFor="body" className="label-base">
                        {local.BODY_LABEL}
                      </label>
                    </S.Label>
                    <InputBase
                      id="body"
                      label={local.BODY_LABEL}
                      multiline
                      value={bodyValue}
                      onChange={handleChange}
                      rows={12}
                      rowsMax={25}
                      fullWidth
                    />
                  </S.Row>
                </div>
              </div>
              <button
                className="button button-small button-light"
                type="submit"
              >
                {local.SEND_BUTTON}
              </button>
            </form>
          </div>
        </ComposerContainer>
      </>
    </Wrapper>
  )
}

export default ComposeEmail
