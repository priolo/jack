# DateTimeInput

A comprehensive date and time input component with calendar picker, time selection, and various date formats.

## Import

```tsx
import { DateTimeInput } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| undefined` | - | Current date/time value |
| `onChange` | `(value: Date \| undefined) => void` | - | Callback when value changes |
| `mode` | `"date" \| "time" \| "datetime"` | `"date"` | Input mode (date, time, or both) |
| `format` | `string` | - | Custom date format string |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Input label text |
| `error` | `string` | - | Error message to display |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `required` | `boolean` | `false` | Whether input is required |
| `readOnly` | `boolean` | `false` | Whether input is read-only |
| `min` | `Date` | - | Minimum allowed date/time |
| `max` | `Date` | - | Maximum allowed date/time |
| `showCalendar` | `boolean` | `true` | Whether to show calendar popup |
| `showTimePicker` | `boolean` | `true` | Whether to show time picker (datetime mode) |
| `timeStep` | `number` | `15` | Time selection step in minutes |
| `locale` | `string` | `"en-US"` | Locale for date formatting |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | First day of week (0 = Sunday) |
| `showWeekNumbers` | `boolean` | `false` | Whether to show week numbers |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Input style variant |
| `onFocus` | `() => void` | - | Callback when input gains focus |
| `onBlur` | `() => void` | - | Callback when input loses focus |
| `className` | `string` | - | Additional CSS classes |

## Usage

### Basic Date Input

```tsx
const [selectedDate, setSelectedDate] = useState<Date>()

<DateTimeInput
  value={selectedDate}
  onChange={setSelectedDate}
  label="Select Date"
  placeholder="Choose a date"
/>
```

### Date with Min/Max Constraints

```tsx
const today = new Date()
const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

<DateTimeInput
  value={appointmentDate}
  onChange={setAppointmentDate}
  label="Appointment Date"
  min={today}
  max={maxDate}
  required
/>
```

### Time Input Only

```tsx
<DateTimeInput
  mode="time"
  value={meetingTime}
  onChange={setMeetingTime}
  label="Meeting Time"
  timeStep={30}
/>
```

### DateTime Input

```tsx
<DateTimeInput
  mode="datetime"
  value={eventDateTime}
  onChange={setEventDateTime}
  label="Event Date & Time"
  showTimePicker={true}
/>
```

### Custom Format

```tsx
<DateTimeInput
  value={birthDate}
  onChange={setBirthDate}
  label="Birth Date"
  format="MM/dd/yyyy"
  locale="en-US"
/>
```

### Different Sizes and Variants

```tsx
<div className="space-y-4">
  <DateTimeInput
    value={date}
    onChange={setDate}
    size="sm"
    variant="filled"
    label="Small Date Input"
  />
  
  <DateTimeInput
    value={date}
    onChange={setDate}
    size="lg"
    variant="outline"
    label="Large Date Input"
  />
</div>
```

## Features

- **Multiple Modes**: Date-only, time-only, or combined datetime
- **Calendar Popup**: Interactive calendar with month/year navigation
- **Time Picker**: Hour and minute selection with configurable steps
- **Date Validation**: Min/max date constraints
- **Localization**: Support for multiple locales and formats
- **Keyboard Navigation**: Full keyboard accessibility
- **Custom Formatting**: Flexible date/time display formats

## Format Strings

Common format patterns:
- `MM/dd/yyyy` - 12/31/2023
- `dd/MM/yyyy` - 31/12/2023
- `yyyy-MM-dd` - 2023-12-31
- `MMM dd, yyyy` - Dec 31, 2023
- `MMMM dd, yyyy` - December 31, 2023
- `HH:mm` - 14:30 (24-hour)
- `hh:mm a` - 02:30 PM (12-hour)

## Related Components

- [`TextInput`](./text-input.md) - General text input
- [`NumberInput`](./number-input.md) - Numeric input

## CSS Classes

- `.datetime-input` - Base input container
- `.datetime-input__label` - Label styling
- `.datetime-input__field` - Input field styling
- `.datetime-input__calendar` - Calendar popup
- `.datetime-input__calendar-header` - Calendar header
- `.datetime-input__calendar-grid` - Calendar grid
- `.datetime-input__calendar-day` - Individual day cell
- `.datetime-input__time-picker` - Time picker container
- `.datetime-input__error` - Error message styling
- `.datetime-input--sm`, `.datetime-input--md`, `.datetime-input--lg` - Size variants
- `.datetime-input--outline`, `.datetime-input--filled`, `.datetime-input--ghost` - Style variants

## Accessibility

- Uses `role="dialog"` for calendar popup
- Includes proper ARIA labels and descriptions
- Keyboard navigation (Arrow keys for calendar, Tab for time picker)
- Screen reader announcements for date selection
- Focus management for popup interactions

## Common Patterns

### Booking Form

```tsx
const BookingForm = () => {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guestCount, setGuestCount] = useState(1)
  
  const today = new Date()
  const minCheckOut = checkIn ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000) : today
  
  return (
    <form className="booking-form">
      <DateTimeInput
        value={checkIn}
        onChange={setCheckIn}
        label="Check-in Date"
        min={today}
        required
      />
      
      <DateTimeInput
        value={checkOut}
        onChange={setCheckOut}
        label="Check-out Date"
        min={minCheckOut}
        disabled={!checkIn}
        required
      />
    </form>
  )
}
```

### Event Scheduler

```tsx
const EventScheduler = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: undefined as Date | undefined,
    endTime: undefined as Date | undefined
  })
  
  const addEvent = () => {
    if (newEvent.title && newEvent.startTime && newEvent.endTime) {
      setEvents(prev => [...prev, { ...newEvent, id: Date.now() }])
      setNewEvent({ title: "", startTime: undefined, endTime: undefined })
    }
  }
  
  return (
    <div className="event-scheduler">
      <div className="new-event-form">
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Event title"
        />
        
        <DateTimeInput
          mode="datetime"
          value={newEvent.startTime}
          onChange={(startTime) => setNewEvent(prev => ({ ...prev, startTime }))}
          label="Start Time"
        />
        
        <DateTimeInput
          mode="datetime"
          value={newEvent.endTime}
          onChange={(endTime) => setNewEvent(prev => ({ ...prev, endTime }))}
          label="End Time"
          min={newEvent.startTime}
        />
        
        <button onClick={addEvent}>Add Event</button>
      </div>
      
      <EventList events={events} />
    </div>
  )
}
```

### Date Range Picker

```tsx
const DateRangePicker = ({ onRangeChange }: { onRangeChange: (start: Date, end: Date) => void }) => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  
  useEffect(() => {
    if (startDate && endDate) {
      onRangeChange(startDate, endDate)
    }
  }, [startDate, endDate, onRangeChange])
  
  return (
    <div className="date-range-picker">
      <DateTimeInput
        value={startDate}
        onChange={setStartDate}
        label="From"
        max={endDate}
        size="sm"
      />
      
      <DateTimeInput
        value={endDate}
        onChange={setEndDate}
        label="To"
        min={startDate}
        size="sm"
      />
    </div>
  )
}
```
