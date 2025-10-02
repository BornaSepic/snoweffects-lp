import { type Message } from '../../create-message-bus/message-shape'

export type Details = {
  form: 'contact_sales' | 'newsletter' | 'get_science' | 'get_bubbles_bucks'
}

export type ShowForm = Message<'request:show-form', Details>
