import { format } from 'date-fns'

const date = (date: string) => format(new Date(date), 'MMMM d, yyyy')

export default date
