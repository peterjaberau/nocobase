import { SMPTAction, SMTPActionContenType } from "../../../public-types/action"

export const SMTPActionInitial: SMPTAction = {
  from: "",
  to: "",
  bcc: "",
  cc: "",
  setReplyTo: false,
  replyTo: "",
  subject: "",
  contentType: SMTPActionContenType.PLAIN,
  body: "",
  attachment: "",
}
