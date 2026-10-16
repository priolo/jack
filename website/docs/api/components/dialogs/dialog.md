# Dialog

A modal dialog component for displaying content that requires user attention or interaction.

## Import

```tsx
import { Dialog } from "@priolo/jack"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the dialog is open |
| `onClose` | `() => void` | - | Callback when dialog should close |
| `title` | `string \| React.ReactNode` | - | Dialog title content |
| `children` | `React.ReactNode` | - | Dialog body content |
| `actions` | `React.ReactNode` | - | Dialog action buttons |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Dialog size |
| `maxWidth` | `string \| number` | - | Custom maximum width |
| `maxHeight` | `string \| number` | - | Custom maximum height |
| `showCloseButton` | `boolean` | `true` | Whether to show close button in header |
| `closeOnOverlayClick` | `boolean` | `true` | Whether clicking overlay closes dialog |
| `closeOnEscape` | `boolean` | `true` | Whether pressing Escape closes dialog |
| `showOverlay` | `boolean` | `true` | Whether to show background overlay |
| `centered` | `boolean` | `true` | Whether to center dialog vertically |
| `scrollable` | `boolean` | `true` | Whether dialog content is scrollable |
| `className` | `string` | - | Additional CSS classes for dialog |
| `overlayClassName` | `string` | - | Additional CSS classes for overlay |
| `onOpen` | `() => void` | - | Callback when dialog opens |
| `preventBodyScroll` | `boolean` | `true` | Whether to prevent body scrolling when open |

## Usage

### Basic Dialog

```tsx
const [isOpen, setIsOpen] = useState(false)

<>
  <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
  
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    title="Basic Dialog"
  >
    <p>This is a basic dialog with some content.</p>
  </Dialog>
</>
```

### Dialog with Actions

```tsx
const [isOpen, setIsOpen] = useState(false)

const handleSave = () => {
  // Save logic here
  setIsOpen(false)
}

<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Save Changes"
  actions={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save
      </Button>
    </>
  }
>
  <p>Are you sure you want to save these changes?</p>
</Dialog>
```

### Form Dialog

```tsx
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ name: "", email: "" })

const handleSubmit = () => {
  // Submit form logic
  console.log("Submitting:", formData)
  setIsOpen(false)
}

<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add User"
  size="lg"
  actions={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} disabled={!formData.name || !formData.email}>
        Add User
      </Button>
    </>
  }
>
  <div className="space-y-4">
    <TextInput
      label="Name"
      value={formData.name}
      onChange={(name) => setFormData(prev => ({ ...prev, name }))}
      required
    />
    <TextInput
      label="Email"
      type="email"
      value={formData.email}
      onChange={(email) => setFormData(prev => ({ ...prev, email }))}
      required
    />
  </div>
</Dialog>
```

### Scrollable Content Dialog

```tsx
<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Long Content"
  size="lg"
  maxHeight="80vh"
  scrollable={true}
>
  <div className="space-y-4">
    {longContentItems.map((item, index) => (
      <div key={index} className="p-4 border rounded">
        <h3>{item.title}</h3>
        <p>{item.content}</p>
      </div>
    ))}
  </div>
</Dialog>
```

### Full Screen Dialog

```tsx
<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Full Screen Editor"
  size="full"
  closeOnOverlayClick={false}
>
  <MarkdownEditor
    value={content}
    onChange={setContent}
    height="calc(100vh - 120px)"
  />
</Dialog>
```

### Custom Styled Dialog

```tsx
<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Dialog"
  className="custom-dialog"
  overlayClassName="custom-overlay"
  showCloseButton={false}
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  <div className="custom-content">
    <p>This dialog has custom styling and behavior.</p>
  </div>
</Dialog>
```

## Features

- **Modal Behavior**: Blocks interaction with background content
- **Flexible Sizing**: Multiple size presets and custom dimensions
- **Keyboard Support**: Escape key to close, focus management
- **Click Outside**: Optional closing when clicking overlay
- **Scrollable Content**: Handle long content with scrolling
- **Custom Actions**: Flexible action button configuration
- **Accessibility**: Full ARIA support and focus trapping

## Size Options

- `xs` - 320px max width
- `sm` - 480px max width  
- `md` - 640px max width (default)
- `lg` - 768px max width
- `xl` - 1024px max width
- `full` - Full screen

## Related Components

- [`AlertDialog`](./alert-dialog.md) - Confirmation dialogs
- [`ListDialog`](./list-dialog.md) - List selection dialogs
- [`ElementDialog`](./element-dialog.md) - Element-specific dialogs

## CSS Classes

- `.dialog` - Base dialog container
- `.dialog__overlay` - Background overlay
- `.dialog__content` - Main dialog content
- `.dialog__header` - Dialog header section
- `.dialog__title` - Title text
- `.dialog__close` - Close button
- `.dialog__body` - Content body
- `.dialog__actions` - Action buttons container
- `.dialog--xs`, `.dialog--sm`, `.dialog--md`, `.dialog--lg`, `.dialog--xl`, `.dialog--full` - Size variants
- `.dialog--open` - Applied when dialog is open

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Focus trapping within dialog
- Returns focus to trigger element on close
- Escape key support for closing
- Proper ARIA labeling with title
- Screen reader announcements

## Common Patterns

### Confirmation Dialog

```tsx
const ConfirmationDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm",
  cancelText = "Cancel"
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="primary">
            {confirmText}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Dialog>
  )
}
```

### Settings Dialog

```tsx
const SettingsDialog = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [settings, setSettings] = useState(getSettings())
  
  const handleSave = () => {
    saveSettings(settings)
    onClose()
  }
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Settings"
      size="lg"
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </>
      }
    >
      <div className="settings-form">
        <SettingsForm settings={settings} onChange={setSettings} />
      </div>
    </Dialog>
  )
}
```

### Multi-Step Wizard

```tsx
const WizardDialog = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState({})
  
  const steps = [
    { title: "Basic Info", component: StepBasicInfo },
    { title: "Configuration", component: StepConfiguration },
    { title: "Review", component: StepReview }
  ]
  
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Setup Wizard - ${steps[currentStep].title}`}
      size="xl"
      closeOnOverlayClick={false}
      actions={
        <>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={isFirstStep}
          >
            Previous
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              if (isLastStep) {
                // Finish wizard
                finishWizard(wizardData)
                onClose()
              } else {
                setCurrentStep(prev => prev + 1)
              }
            }}
          >
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </>
      }
    >
      <div className="wizard-content">
        <WizardSteps steps={steps} currentStep={currentStep} />
        <div className="wizard-step-content">
          {React.createElement(steps[currentStep].component, {
            data: wizardData,
            onChange: setWizardData
          })}
        </div>
      </div>
    </Dialog>
  )
}
```
