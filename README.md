# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite and some ESLint rules.

## Table of Contents

1. [Running the Project](#running-the-project)
2. [Folder Structure](#folder-structure)
3. [Storybook](#storybook)

## Running the Project

To run the project in a local development environment, use the following command:
```shell
npm run dev
```

This will start a development server at http://localhost:5173. You can access the application in your web browser.

## Folder Structure

Here's an overview of the project's folder structure:

Certainly! Here's how you can structure your folder view for the README.md file:

```
coinstore-dashboard-fe/
├── .storybook/                   # This folder houses the configuration files for Storybook.
├── src/
│   ├── app/                      # app-wide settings, styles and providers.
│   ├── assets/                   # Static assets like images, fonts, and other files.
│   ├── features/                 # user interactions, actions that bring business value to the user. (e.g. SendComment, AddToCart, UsersSearch)
│   │   ├── [slice]               # Each slice encapsulates a specific feature
│   │   │   ├── api/              # Logic of API requests (api instances, requests, etc.)
│   │   │   ├── components/       # User Interface components and UI related logic
│   │   │   ├── config/           # Local configuration (constants, enums, meta information)
│   │   │   ├── lib/              # Infrastructure logic (utils/helpers)
│   │   │   ├── model/            # Business logic (store, actions, effects, reducers, etc.)
│   ├── pages/                    # compositional layer to construct full pages from entities, features and widgets.
│   ├── shared/                   # reusable functionality, detached from the specifics of the project/business. (e.g. hooks, redux, utilities)
│   ├── widgets/                  # compositional layer to combine entities and features into meaningful blocks. (e.g. IssuesList, UserProfile) 
└── README.md                     # Project README file.
```

## Storybook
###### Storybook is a powerful tool for building complex applications, especially with Next.js. It lets you isolate and customize your UI components through addons, decorators, and even custom themes. This makes development smoother and testing easier, ultimately leading to better apps.

1. Pick a simple component from your project, like a Button, and write a .stories.ts file to go along with it. It might look something like this:

```javascript
//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
    title: "components/Button", // Title of the story category in Storybook
    component: Button, // The component you're showcasing
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'], // This component will have an automatically generated Autodocs entry
    argTypes: { // More on argTypes: https://storybook.js.org/docs/api/argtypes
        backgroundColor: {control: 'color'},
    }
};

export default meta; // Exporting the metadata for Storybook

type Story = StoryObj<typeof Button>; // Type declaration for a Story object

export const Default = { // Exporting a story named Default
    name: "Button", // Name of the story
    args: {
        //👇 The args you need here will depend on your component
    },
} satisfies Story; // Assertion that the Default story satisfies the Story type
```

2. In addition, if you want to improve stories documentation, you can add JSDoc to the component’s properties and Storybook will automatically display them.

```tsx
interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
  primary,
  size,
  backgroundColor, 
  label,
  ...props
}) => {
  // Determine the mode based on whether the button is primary or not
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')} // Concatenating class names based on size and mode
      style={{backgroundColor}} // Applying background color to the button
      {...props} // Spread other props onto the button
    >
      {label} {/* Display the label text inside the button */}
    </button>
  );
};

export default Button;
```

3. Run Storybook: Run `npm run storybook` to start the Storybook server.