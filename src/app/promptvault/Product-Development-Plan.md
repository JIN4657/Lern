#Prompt Vault – Product Requirements

## Overview
The Prompt Vault is a user interface for storing, managing, and quickly accessing reusable prompts. It supports two types of prompts: Quick Prompts and Variable Prompts. All prompts are displayed as cards for easy browsing and interaction.

## Features
1. Prompt Types
   a. Quick Prompt
      - Definition: A static prompt with no variables.
      - Usage: User can copy the entire prompt with a single click.
   b. Variable Prompt
      - Definition: A prompt containing variables, denoted by [variable-name] in the editor and rendered as {variable} in the UI.
      - Usage: User must fill in all variable fields before copying the prompt.
      - **Bidirectional Variable Input:** Users can input values for variables in the card, and these values are reflected in the prompt preview in real time. If the prompt preview is edited (where allowed), the variable fields update accordingly. This ensures a two-way binding between the variable input fields and the prompt content. <!-- Developer Note: Implement two-way data binding for variable fields and prompt preview. -->

2. Prompt Card Display
   - Uniform Card Size: All prompt cards have the same size for a clean grid layout.
   - Content Preview: Show the prompt title and up to 3 lines of the prompt content + no tag/ variable tag to indicate which type of prompt it is.
   - If the content exceeds 3 lines, truncate and display an ellipsis (...).
   - Interaction: Clicking a card opens a modal or drawer showing the full prompt content.

3. Card Actions
   a. Quick Prompt
      - Copy Button: One-click to copy the entire prompt to clipboard.
   b. Variable Prompt
      - Variable Fields: Render input fields for each variable in the prompt.
      - **Bidirectional Input:** Changes in input fields update the prompt preview, and (if supported) changes in the preview update the input fields. <!-- Developer Note: Use controlled components for variable fields. -->
      - Copy Button: Disabled until all variable fields are filled. When clicked, copies the prompt with variables replaced by user input.

4. Creating Prompts
   - Create Prompt Button: Allows users to add new prompts.
   - Prompt Editor:
     - By default, creates a Quick Prompt.
     - If the user includes [variable-name] in the prompt, it is recognized as a Variable Prompt.
     - Variables are detected and rendered as input fields in the Variable Prompt UI.
     - **Bidirectional Editing:** When editing a variable prompt, changes to variable values in the editor or in the preview are kept in sync. <!-- Developer Note: Ensure editor and preview are synchronized for variable values. -->

## User Flow
- Browse Prompts: User sees a grid of prompt cards (Quick and Variable).
- View Full Prompt: User clicks a card to view the full prompt in a modal/drawer.
- Copy Prompt:
  - For Quick Prompts: Click copy button to copy text.
  - For Variable Prompts: Fill in all variable fields, then click copy to copy the filled prompt.
- Create Prompt: User clicks "Create Prompt", enters title and content (with optional [variable-name]), and saves.

## UI/UX Notes
- Consistency: All cards should be visually consistent in size and style.
- Accessibility: Ensure copy buttons and input fields are accessible.
- Feedback: Show a confirmation (e.g., toast) when a prompt is copied.
- Validation: For Variable Prompts, ensure all fields are filled before enabling the copy button.
- **Bidirectional Input:** Variable prompt cards should provide a seamless, two-way interaction between variable fields and the prompt preview. <!-- Developer Note: Prioritize UX for real-time updates between input and preview. -->



## Technical Notes
- Prompt Storage: Prompts can be stored in local state, local storage, or a backend as needed.
- Variable Parsing: Detect [variable-name] in prompt content and render as {variable} in the UI.
- Copy Logic: For Variable Prompts, replace {variable} with user input before copying.
- **Bidirectional Data Flow:** Ensure that variable input fields and prompt content remain synchronized at all times. <!-- Developer Note: Use state management or hooks to maintain two-way binding. -->