import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { trackEvent, trackFormEvent } from 'api/gtm'
import Spinner from 'components/Spinner'
import FinalFormInput from 'components/forms/FinalFormInput'
import ArrowButton from 'components/ArrowButton'
import { required } from 'components/forms/validators'
import FinalFormInputMask from 'components/forms/FinalFormInputMask'
import { addressValidator, emailValidator } from 'components/forms/validators'
import './AddressStep.scss'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const AddressStep: React.FC<Props> = ({ info, onSubmit }) => {
  const nextStep = (values) => {
    trackFormEvent(AddressStep.displayName, '')
    trackEvent({
      event: 'lead_submit',
      form_version: 1,
    })

    onSubmit(values)
  }

  const onNextClick = (errors: any, formData: any) => {
    // track event if form is invalid
    if (Object.keys(errors).length > 0) {
      trackFormEvent(AddressStep.displayName, '', 1, 'next', 'error')
    }
  }

  useEffect(() => {
    // caculate margin top
    const doc = document.documentElement
    doc.style.setProperty(
      '--address-form-gap',
      `${Math.max(20, (window.innerHeight - 80 - 595) / 2)}px`,
    )

    // lead scripts
    document.getElementById('LeadiDscript_campaign')?.remove()
    ;(function () {
      // remove old scripts

      let s = document.createElement('script')
      s.id = 'LeadiDscript_campaign'
      s.type = 'text/javascript'
      s.async = true
      s.src =
        '//create.lidstatic.com/campaign/1a72ea9a-e602-297f-f916-02c9c37134bf.js?snippet_version=2'
      let LeadiDscript = document.getElementById('LeadiDscript')
      LeadiDscript.parentNode.insertBefore(s, LeadiDscript)
    })()

    document.getElementById('xxTrustedForm_script')?.remove()
    // trustform scripts
    ;(function () {
      let field = 'xxTrustedFormCertUrl'
      let provideReferrer: any = false
      let invertFieldSensitivity = false
      let tf = document.createElement('script')
      tf.id = 'xxTrustedForm_script'
      tf.type = 'text/javascript'
      tf.async = true
      tf.src =
        'http' +
        ('https:' === document.location.protocol ? 's' : '') +
        '://api.trustedform.com/trustedform.js?provide_referrer=' +
        escape(provideReferrer) +
        '&field=' +
        escape(field) +
        '&l=' +
        new Date().getTime() +
        Math.random() +
        '&invert_field_sensitivity=' +
        invertFieldSensitivity
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(tf, s)
    })()
  }, [])

  const [isEditDetail, setEditDetail] = useState(false)

  return (
    <div className='address-form-container step-address'>
      <div className='form-wrapper'>
        <Form
          onSubmit={(val) => nextStep(val)}
          render={({ handleSubmit, submitting, errors, values }) => (
            <form
              className='form-step'
              onSubmit={handleSubmit}
              autoComplete='off'
            >
              <h4 className='title'>
                {info.firstName}, you qualify for major discounts!
              </h4>
              <p className='text-desc'>
                Complete the final step to see how much you save!
              </p>

              <div className='content'>
                <div className={`options ${isEditDetail && 'edit-address'}`}>
                  <Field
                    name='address'
                    label='Street address'
                    placeholder='Street address'
                    defaultValue={info.address}
                    validate={addressValidator}
                  >
                    {(props) => <FinalFormInput {...props} autoFocus={true} />}
                  </Field>

                  {isEditDetail ? (
                    <>
                      <Field
                        type='text'
                        name='city'
                        label='City'
                        placeholder='City'
                        defaultValue={info.city}
                        validate={required}
                      >
                        {(props) => <FinalFormInput {...props} />}
                      </Field>

                      <Field
                        type='text'
                        name='state'
                        label='State'
                        placeholder='State'
                        defaultValue={info.state}
                        validate={required}
                      >
                        {(props) => <FinalFormInput {...props} />}
                      </Field>

                      <Field
                        type='tel'
                        name='zip'
                        label='Zip code'
                        placeholder='Zip code'
                        defaultValue={info.zip}
                        validate={required}
                      >
                        {(props) => (
                          <FinalFormInputMask
                            mask='99999'
                            maskPlaceholder=''
                            {...props}
                          />
                        )}
                      </Field>
                    </>
                  ) : (
                    <div
                      role='button'
                      className='state'
                      title='Click to edit'
                      onClick={() => setEditDetail(true)}
                    >{`${info.city}, ${info.state} ${info.zip}`}</div>
                  )}

                  <Field
                    type='email'
                    name='email'
                    label='Email'
                    placeholder='Email'
                    defaultValue={info.email}
                    validate={emailValidator}
                  >
                    {(props) => <FinalFormInput {...props} />}
                  </Field>

                  <Field
                    type='tel'
                    name='phone'
                    label='Phone number'
                    placeholder='Phone number'
                    defaultValue={info.phone}
                    validate={required}
                  >
                    {(props) => (
                      <FinalFormInputMask
                        mask='(999) 999-9999'
                        maskPlaceholder=''
                        {...props}
                      />
                    )}
                  </Field>
                </div>

                <ArrowButton
                  type='submit'
                  className='btn btn-blue'
                  disabled={submitting}
                  onClick={() => onNextClick(errors, values)}
                >
                  View My Quotes
                </ArrowButton>
              </div>

              {submitting && <Spinner />}
            </form>
          )}
        />
      </div>
      <input type='hidden' id='leadid_tcpa_disclosure' checked={true} />
      <input type='hidden' name='universal_leadid' id='leadid_token' />

      <input type='hidden' id='leadid_tcpa_disclosure' />

      <label
        className='tcp-text mx-auto'
        id='tcp_text'
        htmlFor='leadid_tcpa_disclosure'
      >
        By clicking "View My Quotes" above, I provide my electronic signature
        and express written consent to be contacted for marketing purposes at
        the email and phone number provided above by up to five Marketing
        Partners via phone calls (including wireless numbers), text messages
        SMS/MMS, emails, postal mail regarding insurance products and services
        within this application. I further expressly consent to be contacted by
        the means provided above, even if it is a wireless number, regardless of
        whether I am on any Federal or State DNC ("Do Not Call") and/or DNE ("Do
        Not Email") list or registry and I agree that such contact may be made
        using an automatic telephone dialing system and/or artificial or
        prerecorded voice calls and messages. I understand and acknowledge that
        my consent is not a condition of purchasing any property, goods, or
        services and that I may revoke my consent at any time. I understand and
        acknowledge that data and message rates may apply and I am over 18 years
        of age. Insurance companies, agents or representatives that receive my
        information from this website or its partner companies, may confirm my
        information through the use of a consumer report. Agents are not
        connected with or endorsed by the U.S. government or the federal
        programs. One of these parties may handle your insurance case.
        Optimze.Ad complies with applicable Federal civil rights laws and does
        not discriminate on the basis of race, color, national origin, age,
        disability, or sex.
        <br />
        <br />
        Additionally, by clicking "View My Quotes" I acknowledge that I have
        read, understand, and agree to this website's{' '}
        <Link to='/privacy-policy'>Privacy Policy</Link> and&nbsp;
        <Link to='/terms-of-use'>Terms of Use</Link>&nbsp;
        and am directing them to share my information to providers within the
        websites network for the purposes of providing me information about the
        services and products requested within this application.
      </label>
    </div>
  )
}

AddressStep.displayName = 'Contact details'

export default AddressStep
