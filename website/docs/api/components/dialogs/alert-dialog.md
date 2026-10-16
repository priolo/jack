# AlertDialog

A modal dialog component for displaying alerts, confirmations, and simple user prompts. Provides built-in styling for different alert types (info, warning, error, success) with customizable actions.

## Import

```tsx
import { AlertDialog } from '@priolo/jack';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls dialog visibility |
| `onClose` | `() => void` | - | Callback fired when dialog should close |
| `title` | `string` | - | Dialog title text |
| `message` | `string \| React.ReactNode` | - | Main message content |
| `type` | `'info' \| 'warning' \| 'error' \| 'success' \| 'confirm'` | `'info'` | Alert type affecting styling and icon |
| `confirmText` | `string` | `'OK'` | Text for primary action button |
| `cancelText` | `string` | `'Cancel'` | Text for cancel button |
| `onConfirm` | `() => void \| Promise<void>` | - | Callback fired when confirm button is clicked |
| `onCancel` | `() => void` | - | Callback fired when cancel button is clicked |
| `showCancel` | `boolean` | `false` | Whether to show cancel button |
| `confirmButtonType` | `'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Style variant for confirm button |
| `loading` | `boolean` | `false` | Show loading state on confirm button |
| `closable` | `boolean` | `true` | Allow closing via X button or ESC key |
| `icon` | `React.ReactNode` | - | Custom icon override |
| `actions` | `React.ReactNode` | - | Custom action buttons |
| `width` | `number \| string` | `400` | Dialog width |
| `className` | `string` | - | Additional CSS class names |
| `style` | `React.CSSProperties` | - | Inline styles |

## Basic Usage

### Simple Alert

```tsx
import { AlertDialog } from '@priolo/jack';

function MyComponent() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAlert(true)}>
        Show Alert
      </Button>
      
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="Information"
        message="This is a simple information alert."
        type="info"
        confirmText="Got it"
        onConfirm={() => setShowAlert(false)}
      />
    </>
  );
}
```

### Confirmation Dialog

```tsx
function DeleteConfirmation() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteItem();
      setShowConfirm(false);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <Button 
        onClick={() => setShowConfirm(true)}
        variant="danger"
      >
        Delete Item
      </Button>
      
      <AlertDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        type="confirm"
        confirmText="Delete"
        cancelText="Cancel"
        showCancel={true}
        confirmButtonType="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
```

### Error Dialog

```tsx
function ErrorExample() {
  const [error, setError] = useState(null);

  const handleApiCall = async () => {
    try {
      await riskyApiCall();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Button onClick={handleApiCall}>
        Make API Call
      </Button>
      
      <AlertDialog
        isOpen={!!error}
        onClose={() => setError(null)}
        title="Error"
        message={error}
        type="error"
        confirmText="Dismiss"
        onConfirm={() => setError(null)}
      />
    </>
  );
}
```

## Advanced Examples

### Custom Content

```tsx
function CustomContentAlert() {
  return (
    <AlertDialog
      isOpen={showDialog}
      onClose={() => setShowDialog(false)}
      title="Update Available"
      type="info"
      message={
        <div>
          <p>A new version of the application is available.</p>
          <ul>
            <li>Bug fixes and improvements</li>
            <li>New features</li>
            <li>Security updates</li>
          </ul>
          <p>Would you like to update now?</p>
        </div>
      }
      confirmText="Update Now"
      cancelText="Later"
      showCancel={true}
      onConfirm={handleUpdate}
      onCancel={() => setShowDialog(false)}
    />
  );
}
```

### Async Operations

```tsx
function AsyncConfirmation() {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await performAsyncOperation();
      setShowDialog(false);
      showSuccessMessage();
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      isOpen={showDialog}
      onClose={() => setShowDialog(false)}
      title="Processing"
      message="This operation may take a few moments. Continue?"
      type="confirm"
      confirmText="Process"
      cancelText="Cancel"
      showCancel={true}
      loading={loading}
      onConfirm={handleConfirm}
      onCancel={() => setShowDialog(false)}
    />
  );
}
```

### Custom Actions

```tsx
function MultiActionDialog() {
  return (
    <AlertDialog
      isOpen={showDialog}
      onClose={() => setShowDialog(false)}
      title="Save Changes"
      message="You have unsaved changes. What would you like to do?"
      type="warning"
      actions={
        <div className="dialog-actions">
          <Button 
            onClick={handleSave}
            variant="primary"
          >
            Save
          </Button>
          <Button 
            onClick={handleDiscard}
            variant="danger"
          >
            Discard
          </Button>
          <Button 
            onClick={() => setShowDialog(false)}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      }
    />
  );
}
```

### Success Dialog

```tsx
function SuccessDialog() {
  return (
    <AlertDialog
      isOpen={showSuccess}
      onClose={() => setShowSuccess(false)}
      title="Success!"
      message="Your changes have been saved successfully."
      type="success"
      confirmText="Continue"
      onConfirm={() => setShowSuccess(false)}
    />
  );
}
```

## Dialog Types

### Info
- **Purpose**: General information or status updates
- **Icon**: Information icon (ℹ️)
- **Styling**: Blue color scheme

### Warning
- **Purpose**: Cautionary messages or potential issues
- **Icon**: Warning icon (⚠️)
- **Styling**: Orange/yellow color scheme

### Error
- **Purpose**: Error messages or failed operations
- **Icon**: Error icon (❌)
- **Styling**: Red color scheme

### Success
- **Purpose**: Successful operations or confirmations
- **Icon**: Success icon (✅)
- **Styling**: Green color scheme

### Confirm
- **Purpose**: User confirmations or decisions
- **Icon**: Question icon (❓)
- **Styling**: Neutral color scheme with emphasis on actions

## Features

- **Multiple Types**: Pre-styled alert types for different scenarios
- **Async Support**: Built-in loading states for async operations
- **Keyboard Navigation**: ESC to close, Enter to confirm
- **Custom Content**: Support for rich content and custom actions
- **Accessibility**: ARIA labels and focus management
- **Animation**: Smooth open/close transitions
- **Responsive**: Adapts to different screen sizes
- **Theme Support**: Respects application theme settings

## CSS Classes

| Class | Description |
|-------|-------------|
| `.alert-dialog` | Main dialog container |
| `.alert-dialog__overlay` | Background overlay |
| `.alert-dialog__content` | Dialog content wrapper |
| `.alert-dialog__header` | Header section with title and icon |
| `.alert-dialog__title` | Title text |
| `.alert-dialog__icon` | Alert type icon |
| `.alert-dialog__message` | Message content area |
| `.alert-dialog__actions` | Action buttons container |
| `.alert-dialog--info` | Info type styling |
| `.alert-dialog--warning` | Warning type styling |
| `.alert-dialog--error` | Error type styling |
| `.alert-dialog--success` | Success type styling |
| `.alert-dialog--confirm` | Confirm type styling |

## Accessibility

- **ARIA Role**: `alertdialog` for alert types, `dialog` for confirmations
- **Focus Management**: Automatic focus on first action button
- **Keyboard Support**: ESC to close, Tab navigation
- **Screen Readers**: Proper announcements for alert messages
- **Color Contrast**: High contrast ratios for all text

## Related Components

- [`Dialog`](./dialog.md) - Base dialog component
- [`Button`](../buttons/button.md) - Action buttons
- [`Snackbar`](../cards/snackbar.md) - Toast notifications
- [`ElementDialog`](./element-dialog.md) - Positioned dialogs