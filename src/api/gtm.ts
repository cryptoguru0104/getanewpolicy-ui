import TagManager from 'react-gtm-module'

function flushPreviousValues(newDataLayer: any): any {
  const previousDataLayer = window['previousDataLayer'] || {}

  window['previousDataLayer'] = {}
  for (let key in newDataLayer) {
    window['previousDataLayer'][key] = undefined
  }

  return {
    ...previousDataLayer,
    ...newDataLayer,
  }
}

export function trackFormEvent(
  step_question: string,
  step_value: any,
  form_version: number = 1,
  step_action = 'next',
  validation_status: 'pass' | 'error' = 'pass',
) {
  const dataLayer = {
    event: 'form_click',
    form_version,
    step_question,
    step_action,
    step_value,
    validation_status,
  }

  const flushedDataLayer = flushPreviousValues(dataLayer)

  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    // flush previous values after push
    TagManager.dataLayer({
      dataLayer: flushedDataLayer,
    })
  } else {
    console.log(flushedDataLayer)
  }
}

export function trackEvent(dataLayer: Object) {
  const flushedDataLayer = flushPreviousValues(dataLayer)

  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    TagManager.dataLayer({
      dataLayer: flushedDataLayer,
    })
  } else {
    console.log(flushedDataLayer)
  }
}
